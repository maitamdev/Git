import { JobDefinition, MatrixStrategy } from '../models/job';

export interface ScheduledJobNode {
  id: string; // unique execution node id, e.g. "build" or "test_matrix_0"
  originalJobId: string;
  displayName: string;
  definition: JobDefinition;
  matrixValues?: Record<string, any>;
  needs: string[]; // references to other scheduled node IDs
}

export class DagScheduler {
  /**
   * Expands matrix strategy combinations for a job.
   * e.g. { node: [18, 20], os: ['ubuntu-latest', 'windows-latest'] } -> 4 combinations
   */
  public static expandMatrix(
    jobId: string,
    definition: JobDefinition
  ): { matrixValues: Record<string, any>; displayName: string; nodeId: string }[] {
    const strategy = definition.strategy;
    if (!strategy || !strategy.matrix || Object.keys(strategy.matrix).length === 0) {
      return [
        {
          matrixValues: {},
          displayName: definition.name || jobId,
          nodeId: jobId,
        },
      ];
    }

    const keys = Object.keys(strategy.matrix);
    let combinations: Record<string, any>[] = [{}];

    for (const key of keys) {
      const values = strategy.matrix[key];
      const nextCombos: Record<string, any>[] = [];
      for (const combo of combinations) {
        for (const val of values) {
          nextCombos.push({ ...combo, [key]: val });
        }
      }
      combinations = nextCombos;
    }

    // Apply include rules if any
    if (strategy.include) {
      for (const inc of strategy.include) {
        combinations.push({ ...inc });
      }
    }

    // Apply exclude rules if any
    if (strategy.exclude) {
      combinations = combinations.filter((combo) => {
        return !strategy.exclude!.some((ex) => {
          return Object.entries(ex).every(([k, v]) => combo[k] === v);
        });
      });
    }

    return combinations.map((combo, idx) => {
      const parts = Object.entries(combo).map(([k, v]) => `${k}=${v}`).join(', ');
      const baseName = definition.name || jobId;
      return {
        matrixValues: combo,
        displayName: `${baseName} (${parts})`,
        nodeId: `${jobId}_matrix_${idx}`,
      };
    });
  }

  /**
   * Builds DAG nodes and detects dependency cycles.
   * Returns topologically ordered stages (arrays of nodes that can run concurrently).
   */
  public static schedule(jobs: Record<string, JobDefinition>): ScheduledJobNode[][] {
    const jobIds = Object.keys(jobs);

    // 1. Cycle detection in base jobs graph
    const graph = new Map<string, string[]>();
    for (const id of jobIds) {
      const needs = jobs[id].needs || [];
      const needsList = Array.isArray(needs) ? needs : [needs];
      graph.set(id, needsList);
    }

    const visited = new Set<string>();
    const recStack = new Set<string>();

    function checkCycle(node: string, pathAcc: string[]) {
      visited.add(node);
      recStack.add(node);
      pathAcc.push(node);

      const neighbors = graph.get(node) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          checkCycle(neighbor, [...pathAcc]);
        } else if (recStack.has(neighbor)) {
          throw new Error(
            `Circular dependency detected in jobs: ${pathAcc.join(' -> ')} -> ${neighbor}`
          );
        }
      }
      recStack.delete(node);
    }

    for (const id of jobIds) {
      if (!visited.has(id)) {
        checkCycle(id, []);
      }
    }

    // 2. Expand all jobs (including matrix combinations) into scheduled nodes
    const allNodes: ScheduledJobNode[] = [];
    const jobToNodeIds = new Map<string, string[]>();

    for (const [jobId, jobDef] of Object.entries(jobs)) {
      const expansions = this.expandMatrix(jobId, jobDef);
      const nodeIds: string[] = [];

      for (const exp of expansions) {
        nodeIds.push(exp.nodeId);
        allNodes.push({
          id: exp.nodeId,
          originalJobId: jobId,
          displayName: exp.displayName,
          definition: jobDef,
          matrixValues: exp.matrixValues,
          needs: [], // will map after all nodes exist
        });
      }
      jobToNodeIds.set(jobId, nodeIds);
    }

    // Connect node dependencies
    for (const node of allNodes) {
      const baseNeeds = node.definition.needs || [];
      const baseNeedsList = Array.isArray(baseNeeds) ? baseNeeds : [baseNeeds];
      const expandedNeeds: string[] = [];

      for (const neededJobId of baseNeedsList) {
        const mappedNodes = jobToNodeIds.get(neededJobId) || [];
        expandedNeeds.push(...mappedNodes);
      }
      node.needs = expandedNeeds;
    }

    // 3. Topological sorting into parallel execution stages
    const stages: ScheduledJobNode[][] = [];
    const completedNodeIds = new Set<string>();
    const remainingNodes = new Set(allNodes);

    while (remainingNodes.size > 0) {
      const currentStage: ScheduledJobNode[] = [];
      for (const node of remainingNodes) {
        const ready = node.needs.every((dep) => completedNodeIds.has(dep));
        if (ready) {
          currentStage.push(node);
        }
      }

      if (currentStage.length === 0) {
        throw new Error('Unresolvable dependency deadlock detected in job scheduler.');
      }

      for (const node of currentStage) {
        completedNodeIds.add(node.id);
        remainingNodes.delete(node);
      }
      stages.push(currentStage);
    }

    return stages;
  }
}
