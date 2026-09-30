import React, { useState } from 'react';
import {
  WorkflowExecutionResult,
  JobExecutionResult,
  StepExecutionResult,
  WorkflowRunner,
} from '@git-academy/actions-simulator';

interface WorkflowRunViewProps {
  run: WorkflowExecutionResult;
  onRunUpdated?: (updatedRun: WorkflowExecutionResult) => void;
}

export const WorkflowRunView: React.FC<WorkflowRunViewProps> = ({ run, onRunUpdated }) => {
  const [selectedJobId, setSelectedJobId] = useState<string>(() => {
    return Object.keys(run.jobs)[0] || '';
  });
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);

  const selectedJob: JobExecutionResult | undefined = run.jobs[selectedJobId];
  const selectedStep: StepExecutionResult | undefined = selectedJob?.steps.find(
    (s) => s.stepId === selectedStepId
  );

  const handleApprove = async (jobId: string) => {
    const updated = await WorkflowRunner.approveAndResume(run.runId, jobId, 'student-lead');
    if (updated && onRunUpdated) {
      onRunUpdated({ ...updated });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <span style={{ color: '#34d399', fontWeight: 600 }}>✓ Success</span>;
      case 'failure':
        return <span style={{ color: '#f87171', fontWeight: 600 }}>✕ Failed</span>;
      case 'running':
        return <span style={{ color: '#38bdf8', fontWeight: 600 }}>● Running</span>;
      case 'waiting_approval':
        return <span style={{ color: '#fbbf24', fontWeight: 600 }}>⏳ Waiting Approval</span>;
      case 'skipped':
        return <span style={{ color: '#94a3b8' }}>○ Skipped</span>;
      default:
        return <span style={{ color: '#94a3b8' }}>{status}</span>;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#0a0f1d',
        color: '#f8fafc',
        fontFamily: 'Inter, system-ui, sans-serif',
        borderRadius: '8px',
        border: '1px solid #1e293b',
        overflow: 'hidden',
      }}
    >
      {/* Run Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          background: '#0f172a',
          borderBottom: '1px solid #1e293b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.2rem' }}>🚀</span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#f8fafc' }}>
              {run.workflowName}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Event: <span style={{ color: '#38bdf8' }}>{run.event}</span> | Ref:{' '}
              <span style={{ color: '#94a3b8' }}>{run.ref}</span> | SHA:{' '}
              <span style={{ color: '#94a3b8' }}>{run.sha.substring(0, 7)}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>{getStatusBadge(run.status)}</div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            {run.durationMs}ms
          </div>
        </div>
      </div>

      {/* Main Split: Left DAG Nodes, Right Job/Step Inspector */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left DAG Job Nodes */}
        <div
          style={{
            width: '280px',
            borderRight: '1px solid #1e293b',
            background: '#0c1322',
            padding: '14px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
            Workflow Jobs DAG
          </div>

          {Object.entries(run.jobs).map(([id, job]) => {
            const isSelected = id === selectedJobId;
            return (
              <div
                key={id}
                onClick={() => {
                  setSelectedJobId(id);
                  setSelectedStepId(null);
                }}
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: isSelected ? '#1e293b' : '#0f172a',
                  border: `1px solid ${isSelected ? '#38bdf8' : '#1e293b'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.86rem', color: isSelected ? '#38bdf8' : '#e2e8f0' }}>
                    {job.displayName}
                  </span>
                  <span style={{ fontSize: '0.78rem' }}>{getStatusBadge(job.status)}</span>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Runner: {job.runsOn}</span>
                  <span>{job.durationMs}ms</span>
                </div>

                {job.status === 'waiting_approval' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprove(id);
                    }}
                    style={{
                      marginTop: '6px',
                      background: '#d97706',
                      color: '#ffffff',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Approve Deployment
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Inspector & Logs */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#070a12', overflow: 'hidden' }}>
          {selectedJob ? (
            <>
              {/* Job Header & Step Navigation */}
              <div
                style={{
                  padding: '12px 16px',
                  background: '#0d1527',
                  borderBottom: '1px solid #1e293b',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#f8fafc' }}>
                    {selectedJob.displayName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Runs-on: {selectedJob.runsOn} {selectedJob.environment ? `| Environment: ${selectedJob.environment}` : ''}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setSelectedStepId(null)}
                    style={{
                      background: selectedStepId === null ? '#1e293b' : 'transparent',
                      color: selectedStepId === null ? '#38bdf8' : '#94a3b8',
                      border: '1px solid #1e293b',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    All Logs
                  </button>
                </div>
              </div>

              {/* Steps List Strip */}
              <div
                style={{
                  display: 'flex',
                  gap: '6px',
                  padding: '8px 16px',
                  background: '#090e1a',
                  borderBottom: '1px solid #1e293b',
                  overflowX: 'auto',
                }}
              >
                {selectedJob.steps.map((st) => (
                  <button
                    key={st.stepId}
                    onClick={() => setSelectedStepId(st.stepId)}
                    style={{
                      background: selectedStepId === st.stepId ? '#1e293b' : '#0f172a',
                      color: selectedStepId === st.stepId ? '#38bdf8' : '#cbd5e1',
                      border: `1px solid ${selectedStepId === st.stepId ? '#38bdf8' : '#1e293b'}`,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>{st.status === 'success' ? '✓' : st.status === 'failure' ? '✕' : '○'}</span>
                    <span>{st.name}</span>
                  </button>
                ))}
              </div>

              {/* Logs Console */}
              <div
                style={{
                  flex: 1,
                  padding: '14px 16px',
                  overflowY: 'auto',
                  fontFamily: 'Consolas, Monaco, monospace',
                  fontSize: '0.8rem',
                  lineHeight: '20px',
                  background: '#040711',
                  color: '#e2e8f0',
                }}
              >
                {selectedStep ? (
                  <div>
                    <div style={{ color: '#38bdf8', marginBottom: '8px', fontWeight: 600 }}>
                      === Step: {selectedStep.name} ({selectedStep.durationMs}ms) ===
                    </div>
                    {selectedStep.logs.map((log, idx) => (
                      <div key={idx} style={{ color: log.startsWith('Error:') ? '#f87171' : '#e2e8f0' }}>
                        {log}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {selectedJob.steps.flatMap((s) => s.logs).map((log, idx) => (
                      <div key={idx} style={{ color: log.startsWith('Error:') ? '#f87171' : '#cbd5e1' }}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>
              Select a job to view execution logs
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
