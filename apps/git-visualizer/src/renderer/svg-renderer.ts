import { GraphLayoutResult, VisualNode, VisualEdge } from '../graph/graph-model';

export class SvgRenderer {
  public renderToSvgString(layout: GraphLayoutResult): string {
    const { nodes, edges, width, height } = layout;

    if (nodes.length === 0) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
          <text x="${width / 2}" y="${height / 2}" text-anchor="middle" fill="#64748b" font-family="Inter, sans-serif" font-size="14">
            Repository trống - Chưa có commit nào
          </text>
        </svg>
      `;
    }

    const edgePaths = edges.map((e) => this.renderEdge(e)).join('\n');
    const nodeElements = nodes.map((n) => this.renderNode(n)).join('\n');

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%" style="overflow: visible;">
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <g class="edges">
          ${edgePaths}
        </g>
        <g class="nodes">
          ${nodeElements}
        </g>
      </svg>
    `;
  }

  private renderEdge(edge: VisualEdge): string {
    const dx = edge.toX - edge.fromX;
    const dy = edge.toY - edge.fromY;

    let pathD = '';
    if (dy === 0) {
      pathD = `M ${edge.fromX} ${edge.fromY} L ${edge.toX} ${edge.toY}`;
    } else {
      // Smooth cubic bezier
      const controlX1 = edge.fromX + dx * 0.5;
      const controlY1 = edge.fromY;
      const controlX2 = edge.fromX + dx * 0.5;
      const controlY2 = edge.toY;
      pathD = `M ${edge.fromX} ${edge.fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${edge.toX} ${edge.toY}`;
    }

    const strokeDash = edge.isMerge ? 'stroke-dasharray="4,4"' : '';
    return `<path d="${pathD}" stroke="${edge.color}" stroke-width="3" fill="none" ${strokeDash} opacity="0.85" />`;
  }

  private renderNode(node: VisualNode): string {
    const badges = node.branches
      .map(
        (b, i) => `
        <g transform="translate(${node.x}, ${node.y - 28 - i * 22})">
          <rect x="-35" y="-10" width="70" height="20" rx="4" fill="#0f172a" stroke="${node.color}" stroke-width="1.5" />
          <text x="0" y="4" text-anchor="middle" fill="${node.color}" font-family="monospace" font-size="11" font-weight="600">
            ${b}
          </text>
        </g>
      `
      )
      .join('\n');

    const headIndicator = node.isHead
      ? `
        <g transform="translate(${node.x}, ${node.y + 36})">
          <rect x="-28" y="-9" width="56" height="18" rx="4" fill="#3b82f6" />
          <text x="0" y="4" text-anchor="middle" fill="#ffffff" font-family="monospace" font-size="10" font-weight="bold">
            HEAD
          </text>
        </g>
      `
      : '';

    return `
      <g class="commit-node" data-hash="${node.hash}">
        <!-- Pulse glow for head -->
        ${node.isHead ? `<circle cx="${node.x}" cy="${node.y}" r="22" fill="${node.color}" opacity="0.25" filter="url(#glow)" />` : ''}
        <!-- Node circle -->
        <circle cx="${node.x}" cy="${node.y}" r="14" fill="#0f172a" stroke="${node.color}" stroke-width="3.5" />
        <circle cx="${node.x}" cy="${node.y}" r="5" fill="${node.color}" />

        <!-- Hash label -->
        <text x="${node.x}" y="${node.y + (node.isHead ? 58 : 36)}" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="11">
          ${node.shortHash}
        </text>

        <!-- Message preview -->
        <text x="${node.x}" y="${node.y + (node.isHead ? 72 : 50)}" text-anchor="middle" fill="#e2e8f0" font-family="sans-serif" font-size="11" font-weight="500">
          ${this.escapeXml(node.message.length > 20 ? node.message.slice(0, 18) + '...' : node.message)}
        </text>

        <!-- Branch Badges -->
        ${badges}

        <!-- HEAD Pointer -->
        ${headIndicator}
      </g>
    `;
  }

  private escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}
