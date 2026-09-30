import { GitState, Commit } from '@git-academy/shared';

export interface VisualNode {
  hash: string;
  shortHash: string;
  message: string;
  authorName: string;
  timestamp: number;
  parents: string[];
  x: number;
  y: number;
  lane: number;
  color: string;
  branches: string[];
  isHead: boolean;
  headBranch?: string;
}

export type GraphNode = VisualNode;

export interface VisualEdge {
  id: string;
  fromHash: string;
  toHash: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
  isMerge: boolean;
}

export interface GraphLayoutResult {
  nodes: VisualNode[];
  edges: VisualEdge[];
  width: number;
  height: number;
}

const LANE_COLORS = [
  '#38bdf8', // Sky Blue (main / default)
  '#a855f7', // Purple
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#ec4899', // Pink
  '#06b6d4', // Cyan
];

export class GitGraphLayout {
  private nodeRadius = 18;
  private xSpacing = 110;
  private laneHeight = 65;
  private paddingX = 60;
  private paddingY = 60;

  public buildLayout(state: GitState): GraphLayoutResult {
    if (!state.commits || state.commits.length === 0) {
      return {
        nodes: [],
        edges: [],
        width: 400,
        height: 180,
      };
    }

    // Topological sorting: oldest commits first (root commit at index 0)
    const commitsByHash = new Map<string, Commit>();
    for (const c of state.commits) {
      commitsByHash.set(c.hash, c);
    }

    // Find root commits
    const inDegree = new Map<string, number>();
    for (const c of state.commits) {
      if (!inDegree.has(c.hash)) inDegree.set(c.hash, 0);
      for (const p of c.parents) {
        inDegree.set(c.hash, (inDegree.get(c.hash) || 0) + 1);
      }
    }

    // Simple chronological sort by timestamp
    const sortedCommits = [...state.commits].sort((a, b) => a.timestamp - b.timestamp);

    // Assign lanes
    const commitLaneMap = new Map<string, number>();
    let nextAvailableLane = 0;

    for (let i = 0; i < sortedCommits.length; i++) {
      const commit = sortedCommits[i];
      if (commit.parents.length === 0) {
        // Root commit on lane 0
        commitLaneMap.set(commit.hash, 0);
      } else {
        const firstParentHash = commit.parents[0];
        const parentLane = commitLaneMap.get(firstParentHash) ?? 0;

        // If another child already took this parent's lane, spawn a new lane
        const otherChildrenWithSameParent = sortedCommits
          .slice(0, i)
          .filter((c) => c.parents.includes(firstParentHash));

        if (otherChildrenWithSameParent.length > 0) {
          nextAvailableLane++;
          commitLaneMap.set(commit.hash, nextAvailableLane);
        } else {
          commitLaneMap.set(commit.hash, parentLane);
        }
      }
    }

    // Map branches and HEAD
    const branchesOnCommit = new Map<string, string[]>();
    for (const b of state.branches) {
      if (b.commitHash) {
        const list = branchesOnCommit.get(b.commitHash) || [];
        list.push(b.name);
        branchesOnCommit.set(b.commitHash, list);
      }
    }

    let headCommitHash: string | null = null;
    let headBranchName: string | undefined = undefined;

    if (state.head.type === 'branch') {
      headBranchName = state.head.ref;
      const b = state.branches.find((item) => item.name === state.head.ref);
      headCommitHash = b?.commitHash || null;
    } else {
      headCommitHash = state.head.ref;
    }

    const nodes: VisualNode[] = [];
    const nodeCoords = new Map<string, { x: number; y: number; color: string }>();

    for (let index = 0; index < sortedCommits.length; index++) {
      const commit = sortedCommits[index];
      const lane = commitLaneMap.get(commit.hash) || 0;
      const x = this.paddingX + index * this.xSpacing;
      const y = this.paddingY + lane * this.laneHeight;
      const color = LANE_COLORS[lane % LANE_COLORS.length];

      nodeCoords.set(commit.hash, { x, y, color });

      const isHead = commit.hash === headCommitHash;
      const branches = branchesOnCommit.get(commit.hash) || [];

      nodes.push({
        hash: commit.hash,
        shortHash: commit.shortHash,
        message: commit.message,
        authorName: commit.author.name,
        timestamp: commit.timestamp,
        parents: commit.parents,
        x,
        y,
        lane,
        color,
        branches,
        isHead,
        headBranch: isHead ? headBranchName : undefined,
      });
    }

    // Build edges (connecting parent to child)
    const edges: VisualEdge[] = [];

    for (const node of nodes) {
      for (let pIdx = 0; pIdx < node.parents.length; pIdx++) {
        const parentHash = node.parents[pIdx];
        const parentCoord = nodeCoords.get(parentHash);
        if (parentCoord) {
          edges.push({
            id: `edge-${parentHash}-${node.hash}`,
            fromHash: parentHash,
            toHash: node.hash,
            fromX: parentCoord.x,
            fromY: parentCoord.y,
            toX: node.x,
            toY: node.y,
            color: pIdx === 0 ? node.color : '#94a3b8',
            isMerge: pIdx > 0,
          });
        }
      }
    }

    const maxLane = Math.max(0, ...Array.from(commitLaneMap.values()));
    const width = Math.max(500, this.paddingX * 2 + (sortedCommits.length - 1) * this.xSpacing + 120);
    const height = Math.max(220, this.paddingY * 2 + maxLane * this.laneHeight + 80);

    return {
      nodes,
      edges,
      width,
      height,
    };
  }
}
