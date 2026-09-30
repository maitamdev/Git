export interface SimulatedRunnerContext {
  os: 'Linux' | 'Windows' | 'macOS';
  arch: 'X64' | 'ARM64';
  name: string;
  temp: string;
  toolCache: string;
  workspace: string;
}

export function createSimulatedRunner(runsOn: string = 'ubuntu-latest'): SimulatedRunnerContext {
  const isWindows = runsOn.toLowerCase().includes('windows');
  const isMac = runsOn.toLowerCase().includes('macos');
  return {
    os: isWindows ? 'Windows' : isMac ? 'macOS' : 'Linux',
    arch: 'X64',
    name: `GitHub-Actions-Runner-${runsOn}`,
    temp: isWindows ? 'C:\\runner\\temp' : '/tmp/runner',
    toolCache: isWindows ? 'C:\\hostedtoolcache' : '/opt/hostedtoolcache',
    workspace: isWindows ? 'D:\\a\\project\\project' : '/home/runner/work/project/project',
  };
}
