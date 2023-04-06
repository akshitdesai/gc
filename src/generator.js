import Graph from "./graph";
import CBIPSolver from "./cbip";
import FirstFitSolver from "./first_fit";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function add_edge(edges, u, v) {
  if (u == v) return;
  for (let i = 0; i < edges.length; i++) {
    if (
      (edges[i][0] === u && edges[i][1] === v) ||
      (edges[i][0] === v && edges[i][1] === u)
    )
      return;
  }
  if (v < u) edges.push([v, u]);
  else edges.push([u, v]);
}

function generator(n, k, type = "cbip") {
  let groups = [];
  let edges = [];
  for (let i = 0; i < k; i++) {
    groups.push([]);
  }
  for (let vertex = 1; vertex <= k; vertex++) {
    groups[vertex - 1].push(vertex);
  }
  for (let vertex = k + 1; vertex <= n; vertex++) {
    groups[getRandomInt(k)].push(vertex);
  }
  for (let i = 0; i < groups.length; i++) {
    for (let u of groups[i]) {
      for (let k = 0; k < groups.length; k++) {
        if (groups[k].includes(u)) continue;
        let v = groups[k][getRandomInt(groups[k].length)];
        add_edge(edges, u, v);
      }
      for (let k = 0; k < groups.length; k++) {
        if (groups[k].includes(u) || getRandomInt(2) === 1) continue;
        for (let v of groups[k]) {
          if (getRandomInt(2) === 1) continue;
          add_edge(edges, u, v);
        }
      }
    }
  }
  console.log(groups);
  console.log(edges);
  console.log(type);

  let g = new Graph();
  let solver = type === "cbip" ? new CBIPSolver(g) : new FirstFitSolver(g);

  let alreadyAdded = new Set();
  for (let u = 1; u <= n; u++) {
    let edgesToAdd = [];
    for (let i = 0; i < edges.length; i++) {
      if (edges[i][0] === u || edges[i][1] === u) {
        let v = edges[i][edges[i][0] === u ? 1 : 0];
        if (alreadyAdded.has(v)) edgesToAdd.push(v);
      }
    }
    alreadyAdded.add(u);
    console.log(u, edgesToAdd);
    solver.solve(u, edgesToAdd).print();
  }
  return solver;
}

export default generator;
