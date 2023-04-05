import { getColor } from "./utils";

class Graph {
  constructor() {
    this.num_vertex = 0;
    this.num_edge = 0;
    this.chromatic_number = 2;
    this.adj = new Map();
    this.coloring = new Map();
  }

  // constructor(N, k, edges, colored) {
  //   this.num_vertex = N;
  //   this.chromatic_number = k;
  //   this.num_edge = edges.length;
  //   this.coloring = colored;
  //   this.adj = new Map();
  //   for (const [u, v] of edges) {
  //     if (!this.adj.has(u)) {
  //       this.adj.set(u, []);
  //     }
  //     if (!this.adj.has(v)) {
  //       this.adj.set(v, []);
  //     }
  //     this.adj.get(u).push(v);
  //     this.adj.get(v).push(u);
  //   }
  // }

  print() {
    console.log("============= Graph ==============");
    for (const [u, neighbors] of this.adj.entries()) {
      console.log(
        `${u} (${this.coloring.get(u)}): -> ${neighbors.join(", ")} `
      );
    }
    console.log("==================================");
  }

  getVisGraph() {}
}

class FirstFitSolver {
  constructor(g) {
    this.g = g;
  }

  solve(vertex, neighbours) {
    const neighbour_colors = new Set();
    this.g.num_vertex++;
    this.g.adj.set(vertex, []);
    for (const v of neighbours) {
      neighbour_colors.add(this.g.coloring.get(v));
      this.g.adj.get(v).push(vertex);
      this.g.adj.get(vertex).push(v);
      this.g.num_edge++;
    }
    let color = 1;
    while (neighbour_colors.has(color)) {
      color++;
    }
    this.g.coloring.set(vertex, color);
    return this.g;
  }
}

class CBIPSolver {
  // constructor() {
  //     this.g = new Graph();
  // }

  constructor(g) {
    this.g = g;
    this.visGraph = { nodes: [], edges: [] };
    this.noOfEdges = [];

    this.visGraphHistory = { nodes: [], edges: [] };
    this.noOfEdgesHistory = [];
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

    this.visGraph.nodes.push({
      id: vertex,
      label: `${vertex}`,
      color: {
        background: getColor(color),
        border: "black",
        hover: { background: getColor(color), border: "black" },
        highlight: { background: getColor(color), border: "black" },
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

function test_case() {
  console.log("CBIP: ");
  const cs = new CBIPSolver(new Graph());

  cs.solve(1, []).print();
  cs.solve(6, []).print();
  cs.solve(2, [6]).print();
  cs.solve(7, [1]).print();
  cs.solve(3, [6, 7]).print();
  cs.solve(8, [1, 2]).print();
  cs.solve(4, [6, 7, 8]).print();
  cs.solve(9, [1, 2, 3]).print();
  cs.solve(5, [6, 7, 8, 9]).print();
  cs.solve(10, [1, 2, 3, 4]).print();

  return cs;
}

// export default CBIPSolver;
export default test_case;
