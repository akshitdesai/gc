import { itocol } from "./utils";
import Graph from "./graph";

class FirstFitSolver {
  constructor() {
    this.g = new Graph();
    this.visGraph = { nodes: [], edges: [] };
    this.noOfEdges = [];

    this.visGraphHistory = { nodes: [], edges: [] };
    this.noOfEdgesHistory = [];
    this.maxColor = 0;
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

export default FirstFitSolver;
