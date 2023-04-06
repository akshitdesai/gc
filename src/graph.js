class Graph {
  constructor() {
    this.num_vertex = 0;
    this.num_edge = 0;
    this.chromatic_number = 2;
    this.adj = new Map();
    this.coloring = new Map();
  }

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
