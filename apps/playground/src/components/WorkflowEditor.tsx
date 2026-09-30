import React, { useState, useMemo } from 'react';
import { YamlWorkflowValidator, WorkflowParser, WorkflowDefinition } from '@git-academy/actions-simulator';

interface WorkflowEditorProps {
  initialYaml?: string;
  onRunWorkflow?: (workflow: WorkflowDefinition, yaml: string) => void;
}

export const WorkflowEditor: React.FC<WorkflowEditorProps> = ({
  initialYaml = `name: CI Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Run Unit Tests
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install

      - name: Run Test Suite
        run: npm test

  build:
    name: Build Production App
    runs-on: ubuntu-latest
    needs: [test]
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Build Web Bundle
        run: npm run build

      - name: Upload Artifact
        uses: actions/upload-artifact@v4
        with:
          name: web-dist
          path: dist/
`,
  onRunWorkflow,
}) => {
  const [yamlContent, setYamlContent] = useState<string>(initialYaml);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    errors: { field?: string; message: string; severity: 'error' | 'warning' }[];
  } | null>(null);

  const lines = useMemo(() => yamlContent.split('\n'), [yamlContent]);

  const handleValidate = () => {
    const res = YamlWorkflowValidator.validate(yamlContent);
    setValidationResult(res);
  };

  const handleRun = () => {
    const res = YamlWorkflowValidator.validate(yamlContent);
    setValidationResult(res);
    if (res.valid && onRunWorkflow) {
      const parsed = WorkflowParser.parse(yamlContent);
      onRunWorkflow(parsed, yamlContent);
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
      {/* Top Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#0f172a',
          borderBottom: '1px solid #1e293b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.1rem' }}>⚙️</span>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#38bdf8' }}>
            .github/workflows/ci.yml
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              background: '#1e293b',
              color: '#94a3b8',
              padding: '2px 8px',
              borderRadius: '4px',
            }}
          >
            YAML Editor
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleValidate}
            style={{
              background: '#1e293b',
              color: '#38bdf8',
              border: '1px solid #38bdf8',
              padding: '5px 12px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            ✓ Validate Syntax
          </button>
          <button
            onClick={handleRun}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              padding: '5px 14px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600,
              boxShadow: '0 2px 4px rgba(37, 99, 235, 0.3)',
            }}
          >
            ▶ Run Workflow
          </button>
        </div>
      </div>

      {/* Diagnostics Banner */}
      {validationResult && (
        <div
          style={{
            padding: '8px 16px',
            fontSize: '0.8rem',
            background: validationResult.valid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
            borderBottom: `1px solid ${validationResult.valid ? '#10b981' : '#ef4444'}`,
            color: validationResult.valid ? '#34d399' : '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>{validationResult.valid ? '✅' : '❌'}</span>
          <span>
            {validationResult.valid
              ? 'Workflow YAML is valid and ready to execute!'
              : `${validationResult.errors.length} validation issue(s) detected:`}
          </span>
          {!validationResult.valid && (
            <ul style={{ margin: 0, paddingLeft: '16px' }}>
              {validationResult.errors.map((err, i) => (
                <li key={i}>{err.message}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Editor Body with Line Numbers */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Line Numbers Column */}
        <div
          style={{
            width: '45px',
            background: '#090d16',
            color: '#475569',
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '0.82rem',
            paddingTop: '12px',
            textAlign: 'right',
            paddingRight: '10px',
            userSelect: 'none',
            borderRight: '1px solid #1e293b',
          }}
        >
          {lines.map((_, i) => (
            <div key={i} style={{ height: '21px', lineHeight: '21px' }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          value={yamlContent}
          onChange={(e) => setYamlContent(e.target.value)}
          spellCheck={false}
          style={{
            flex: 1,
            background: '#0a0f1d',
            color: '#e2e8f0',
            fontFamily: 'Consolas, Monaco, monospace',
            fontSize: '0.82rem',
            lineHeight: '21px',
            padding: '12px 14px',
            border: 'none',
            outline: 'none',
            resize: 'none',
            whiteSpace: 'pre',
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};
