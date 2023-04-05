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

export default Graph;
