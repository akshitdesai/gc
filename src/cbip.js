import { itocol } from "./utils";
import Graph from "./graph";

class CBIPSolver {
  constructor() {
    this.g = new Graph();
    this.visGraph = { nodes: [], edges: [] };
    this.noOfEdges = [];

    this.visGraphHistory = { nodes: [], edges: [] };
    this.noOfEdgesHistory = [];
    this.maxColor = 0;
  }

  get_partition(start_bfs) {
    // assert(this.g.chromatic_number == 2);
    const visited = new Map();
    const partition = [new Set(), new Set()];
    const q = [start_bfs];
    let lvl = 0;
    visited.set(start_bfs, true);
    while (q.length > 0) {
      const size = q.length;
      for (let i = 0; i < size; i++) {
        const u = q.shift();
        partition[lvl].add(u);
        for (const v of this.g.adj.get(u)) {
          if (!visited.get(v)) {
            visited.set(v, true);
            q.push(v);
          }
        }
      }
      lvl ^= 1;
    }
    return partition;
  }

  solve(vertex, neighbours) {
    this.g.num_vertex++;
    this.g.adj.set(vertex, []);
    for (const v of neighbours) {
      this.g.adj.get(v).push(vertex);
      this.g.adj.get(vertex).push(v);
      this.g.num_edge++;
    }
    const partition = this.get_partition(vertex);
    let color = 1;
    for (const p of partition) {
      console.error(`Partition ${[...p]}`);
      if (p.has(vertex)) {
        continue;
      }
      const neighbour_colors = new Set();
      for (const v of p) {
        neighbour_colors.add(this.g.coloring.get(v));
      }
      while (neighbour_colors.has(color)) {
        color++;
      }
    }
    this.g.coloring.set(vertex, color);
    this.maxColor = Math.max(color, this.maxColor);

    this.visGraph.nodes.push({
      id: vertex,
      label: `${vertex}`,
      color: {
        background: itocol[color],
        border: "black",
        hover: { background: itocol[color], border: "black" },
        highlight: { background: itocol[color], border: "black" },
      },
    });

    for (const v of neighbours) {
      this.visGraph.edges.push({ from: vertex, to: v });
    }

    this.noOfEdges.push(neighbours.length);

    console.debug(vertex, color);
    return this.g;
  }

  pop() {
    this.visGraphHistory.nodes.push(this.visGraph.nodes.pop());
    let x = this.noOfEdges.pop();
    this.noOfEdgesHistory.push(x);

    for (let i = 0; i < x; i++) {
      this.visGraphHistory.edges.push(this.visGraph.edges.pop());
    }
    return this.visGraph;
  }

  pushBack() {
    this.visGraph.nodes.push(this.visGraphHistory.nodes.pop());
    let x = this.noOfEdgesHistory.pop();
    this.noOfEdges.push(x);

    for (let i = 0; i < x; i++) {
      this.visGraph.edges.push(this.visGraphHistory.edges.pop());
    }
    return this.visGraph;
  }
  getVisGraph() {
    return this.visGraph;
  }
}
export default CBIPSolver;
