import React, { useState, useMemo } from 'react';
import {
  GitObjectStore,
  GitRefStore,
  GitIndex,
  GitObject,
  GitObjectSerializer,
  GitGarbageCollector,
} from '@git-academy/git-internals';

interface GitInternalsInspectorProps {
  objectStore?: GitObjectStore;
  refStore?: GitRefStore;
  index?: GitIndex;
}

export const GitInternalsInspector: React.FC<GitInternalsInspectorProps> = ({
  objectStore: propObjectStore,
  refStore: propRefStore,
  index: propIndex,
}) => {
  // Builtin default state if not injected by parent runner
  const [objectStore] = useState(() => {
    if (propObjectStore) return propObjectStore;
    const store = new GitObjectStore();
    // Default demo objects
    const b1 = GitObjectSerializer.createBlob('console.log("Welcome to Git Internals!");\n');
    const b2 = GitObjectSerializer.createBlob('# Git Academy Internals Lab\nExploring objects and refs.\n');
    store.put(b1);
    store.put(b2);

    const tree = GitObjectSerializer.createTree([
      { mode: '100644', type: 'blob', hash: b1.hash, path: 'src/main.ts' },
      { mode: '100644', type: 'blob', hash: b2.hash, path: 'README.md' },
    ]);
    store.put(tree);

    const commit = GitObjectSerializer.createCommit({
      treeHash: tree.hash,
      parentHashes: [],
      author: { name: 'Git Master', email: 'master@gitacademy.vn', timestamp: Math.floor(Date.now() / 1000) },
      message: 'feat: initial manual internals snapshot',
    });
    store.put(commit);
    return store;
  });

  const [refStore] = useState(() => {
    if (propRefStore) return propRefStore;
    const refs = new GitRefStore();
    const commits = objectStore.list().filter((o) => o.type === 'commit');
    if (commits.length > 0) {
      refs.setRef('refs/heads/main', commits[0].hash);
      refs.setSymbolicRef('HEAD', 'refs/heads/main');
    }
    return refs;
  });

  const [index] = useState(() => {
    if (propIndex) return propIndex;
    const idx = new GitIndex();
    const blobs = objectStore.list().filter((o) => o.type === 'blob');
    if (blobs.length > 0) {
      idx.add({ path: 'src/main.ts', mode: '100644', hash: blobs[0].hash, stage: 0, size: blobs[0].size });
    }
    if (blobs.length > 1) {
      idx.add({ path: 'README.md', mode: '100644', hash: blobs[1].hash, stage: 0, size: blobs[1].size });
    }
    return idx;
  });

  const [activeTab, setActiveTab] = useState<'.git' | 'objects' | 'refs' | 'head' | 'index' | 'pack' | 'map'>('objects');
  const [selectedHash, setSelectedHash] = useState<string>(() => {
    const list = objectStore.list();
    return list.length > 0 ? list[0].hash : '';
  });

  const selectedObject: GitObject | null = useMemo(() => {
    return selectedHash ? objectStore.get(selectedHash) : null;
  }, [selectedHash, objectStore]);

  const objectsList = useMemo(() => objectStore.list(), [objectStore]);
  const stats = useMemo(() => objectStore.getStats(), [objectStore]);
  const refsList = useMemo(() => refStore.listRefs(), [refStore]);
  const headTarget = useMemo(() => refStore.getSymbolicRef('HEAD') || refStore.getRef('HEAD'), [refStore]);
  const isHeadDetached = useMemo(() => !refStore.getSymbolicRef('HEAD'), [refStore]);
  const indexEntries = useMemo(() => index.entries(), [index]);

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
      {/* Header & Tabs */}
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
          <span style={{ fontSize: '1.1rem' }}>🔬</span>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#a78bfa' }}>
            GIT INTERNALS INSPECTOR
          </span>
          <span style={{ fontSize: '0.72rem', background: '#2e1065', color: '#c4b5fd', padding: '2px 8px', borderRadius: '4px' }}>
            Object Database & Refs
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          {[
            { id: '.git', label: '📁 .git' },
            { id: 'objects', label: '📦 Objects' },
            { id: 'refs', label: '🏷️ Refs' },
            { id: 'head', label: '🎯 HEAD' },
            { id: 'index', label: '📑 Index' },
            { id: 'pack', label: '🗜️ Pack/GC' },
            { id: 'map', label: '🗺️ Concept Map' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              style={{
                background: activeTab === t.id ? '#3b0764' : 'transparent',
                color: activeTab === t.id ? '#c4b5fd' : '#94a3b8',
                border: `1px solid ${activeTab === t.id ? '#7c3aed' : 'transparent'}`,
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.76rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Pane */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Tab 1: .git Directory Tree */}
        {activeTab === '.git' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, color: '#c4b5fd', marginBottom: '12px' }}>
              Cấu trúc thư mục .git trong kho chứa:
            </div>
            <pre
              style={{
                background: '#040711',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #1e293b',
                fontFamily: 'Consolas, monospace',
                fontSize: '0.85rem',
                lineHeight: '22px',
                color: '#38bdf8',
              }}
            >
              {`.git/
├── HEAD                        -> ${refStore.getSymbolicRef('HEAD') || 'Detached commit hash'}
├── config                      -> Cấu hình repository (remote, branches, user)
├── description                 -> Mô tả GitWeb
├── index                       -> Nhị phân Staging Area (${indexEntries.length} tệp staged)
├── objects/                    -> Object Database (${stats.totalCount} đối tượng)
│   ├── info/                   -> Pack metadata
│   ├── pack/                   -> Packfiles (.pack & .idx)
${objectsList.map((o) => `│   ├── ${o.hash.slice(0, 2)}/${o.hash.slice(2, 10)}...      (${o.type}, ${o.size} bytes)`).join('\n')}
└── refs/                       -> Con trỏ tham chiếu
    ├── heads/                  -> Nhánh cục bộ (Local branches)
${refsList.filter((r) => r.name.startsWith('refs/heads/')).map((r) => `    │   └── ${r.name.replace('refs/heads/', '')}               -> ${r.hash.slice(0, 7)}`).join('\n')}
    ├── tags/                   -> Thẻ phiên bản (Tags)
    └── remotes/                -> Nhánh máy chủ từ xa (Remote tracking)`}
            </pre>
          </div>
        )}

        {/* Tab 2: Objects Database View */}
        {activeTab === 'objects' && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Objects List */}
            <div
              style={{
                width: '320px',
                borderRight: '1px solid #1e293b',
                background: '#070b16',
                padding: '12px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b' }}>
                <span>OBJECTS ({objectsList.length})</span>
                <span>{stats.commitCount}C / {stats.treeCount}T / {stats.blobCount}B</span>
              </div>

              {objectsList.map((obj) => {
                const isSelected = obj.hash === selectedHash;
                const typeColor =
                  obj.type === 'commit'
                    ? '#f59e0b'
                    : obj.type === 'tree'
                    ? '#10b981'
                    : obj.type === 'tag'
                    ? '#ec4899'
                    : '#38bdf8';
                return (
                  <div
                    key={obj.hash}
                    onClick={() => setSelectedHash(obj.hash)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      background: isSelected ? '#1e1b4b' : '#0c1222',
                      border: `1px solid ${isSelected ? '#7c3aed' : '#1e293b'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: typeColor,
                        }}
                      >
                        {obj.type}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748b' }}>{obj.size} bytes</span>
                    </div>

                    <div style={{ fontFamily: 'Consolas, monospace', fontSize: '0.75rem', color: '#cbd5e1' }}>
                      {obj.hash.substring(0, 16)}...
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Object Inspector Detail */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#040711' }}>
              {selectedObject ? (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                        SHA-1 Hash:
                      </span>
                      <div style={{ fontFamily: 'Consolas, monospace', fontSize: '0.9rem', color: '#38bdf8', fontWeight: 600 }}>
                        {selectedObject.hash}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '4px',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        background: '#1e293b',
                        color: '#c4b5fd',
                      }}
                    >
                      {selectedObject.type.toUpperCase()} ({selectedObject.size} bytes)
                    </span>
                  </div>

                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
                    Loose File Path: {objectStore.getLoosePath(selectedObject.hash)}
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '14px', marginBottom: '6px' }}>
                    Decoded Object Content (git cat-file -p):
                  </div>
                  <pre
                    style={{
                      background: '#090d18',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #1e293b',
                      fontFamily: 'Consolas, monospace',
                      fontSize: '0.8rem',
                      lineHeight: '20px',
                      color: '#e2e8f0',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {selectedObject.content}
                  </pre>
                </div>
              ) : (
                <div style={{ color: '#64748b' }}>Chọn một Git object bên trái để kiểm tra chi tiết.</div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Refs */}
        {activeTab === 'refs' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, color: '#c4b5fd', marginBottom: '12px' }}>
              Bảng tra cứu tham chiếu (References - git show-ref):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {refsList.map((ref) => (
                <div
                  key={ref.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: '#0c1322',
                    border: '1px solid #1e293b',
                    borderRadius: '6px',
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#38bdf8', fontSize: '0.86rem' }}>
                    {ref.name}
                  </span>
                  <span style={{ fontFamily: 'Consolas, monospace', color: '#94a3b8', fontSize: '0.8rem' }}>
                    {ref.hash}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: HEAD */}
        {activeTab === 'head' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, color: '#c4b5fd', marginBottom: '12px' }}>
              Trạng thái con trỏ HEAD (.git/HEAD):
            </div>
            <div
              style={{
                padding: '16px',
                background: '#0c1322',
                border: '1px solid #1e293b',
                borderRadius: '8px',
              }}
            >
              <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Chế độ: </span>
                <span style={{ fontWeight: 600, color: isHeadDetached ? '#f87171' : '#34d399' }}>
                  {isHeadDetached ? 'Detached HEAD (Chỉ trực tiếp commit SHA)' : 'Symbolic Reference (Trỏ vào nhánh)'}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Giá trị tệp .git/HEAD: </span>
                <code style={{ background: '#040711', padding: '2px 6px', borderRadius: '4px', color: '#38bdf8' }}>
                  {isHeadDetached ? headTarget : `ref: ${headTarget}`}
                </code>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Index */}
        {activeTab === 'index' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, color: '#c4b5fd', marginBottom: '12px' }}>
              Cấu trúc Staging Area (.git/index):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {indexEntries.map((e) => (
                <div
                  key={e.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: '#0c1322',
                    border: '1px solid #1e293b',
                    borderRadius: '6px',
                    fontFamily: 'Consolas, monospace',
                    fontSize: '0.8rem',
                  }}
                >
                  <span style={{ color: '#a78bfa' }}>{e.mode}</span>
                  <span style={{ color: '#38bdf8' }}>{e.hash.slice(0, 12)}...</span>
                  <span style={{ color: '#fbbf24' }}>stage {e.stage}</span>
                  <span style={{ color: '#e2e8f0', fontWeight: 600 }}>{e.path}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Pack / GC */}
        {activeTab === 'pack' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, color: '#c4b5fd', marginBottom: '12px' }}>
              Đóng gói Packfile & Dọn rác (git gc):
            </div>
            <div style={{ padding: '16px', background: '#0c1322', borderRadius: '8px', border: '1px solid #1e293b' }}>
              <div style={{ marginBottom: '8px' }}>
                Tổng số đối tượng trong kho: <strong style={{ color: '#38bdf8' }}>{stats.totalCount}</strong>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '14px' }}>
                Khi chạy <code>git gc</code>, các loose objects sẽ được nén delta và gom vào tệp <code>.git/objects/pack/pack-*.pack</code>.
              </div>
              <button
                onClick={() => {
                  GitGarbageCollector.runGc(refStore, objectStore);
                  alert('Đã thực hiện mô phỏng git gc thành công! Packfile đã được tạo.');
                }}
                style={{
                  background: '#7c3aed',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                }}
              >
                ⚡ Chạy mô phỏng git gc
              </button>
            </div>
          </div>
        )}

        {/* Tab 7: Concept Map */}
        {activeTab === 'map' && (
          <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
            <div style={{ fontWeight: 600, color: '#c4b5fd', marginBottom: '14px' }}>
              Sơ đồ kết nối kiến thức: Từ Working Directory đến Git Objects & HEAD
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                padding: '20px',
                background: '#040711',
                borderRadius: '8px',
                border: '1px solid #1e293b',
              }}
            >
              <div style={{ padding: '8px 16px', background: '#1e293b', borderRadius: '6px', color: '#93c5fd', fontWeight: 600 }}>
                1. Working Directory (Tệp tin vật lý)
              </div>
              <div style={{ color: '#38bdf8', fontSize: '0.8rem' }}>↓ git add / git update-index</div>
              <div style={{ padding: '8px 16px', background: '#1e3a5f', borderRadius: '6px', color: '#67e8f9', fontWeight: 600 }}>
                2. Staging Area (.git/index: đường dẫn + blob SHA-1)
              </div>
              <div style={{ color: '#38bdf8', fontSize: '0.8rem' }}>↓ git write-tree</div>
              <div style={{ padding: '8px 16px', background: '#064e3b', borderRadius: '6px', color: '#6ee7b7', fontWeight: 600 }}>
                3. Tree Object (.git/objects: cấu trúc thư mục phân cấp)
              </div>
              <div style={{ color: '#38bdf8', fontSize: '0.8rem' }}>↓ git commit-tree</div>
              <div style={{ padding: '8px 16px', background: '#78350f', borderRadius: '6px', color: '#fde68a', fontWeight: 600 }}>
                4. Commit Object (tree SHA-1 + parents + author + message)
              </div>
              <div style={{ color: '#38bdf8', fontSize: '0.8rem' }}>↓ git update-ref</div>
              <div style={{ padding: '8px 16px', background: '#4c1d95', borderRadius: '6px', color: '#ddd6fe', fontWeight: 600 }}>
                5. Branch Reference (.git/refs/heads/main trỏ vào commit SHA)
              </div>
              <div style={{ color: '#38bdf8', fontSize: '0.8rem' }}>↓ git symbolic-ref</div>
              <div style={{ padding: '8px 16px', background: '#831843', borderRadius: '6px', color: '#fbcfe8', fontWeight: 600 }}>
                6. HEAD (.git/HEAD: ref: refs/heads/main)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
