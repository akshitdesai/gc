import logo from "./logo.svg";
import "./App.css";
import Graph from "react-graph-vis";
import test_case from "./solver.js";
import { useEffect, useState } from "react";

const tc = test_case();

function App() {
  const [graph, setGraph] = useState(JSON.parse(JSON.stringify(tc.visGraph)));

  // function fuck() {
  //   setGraph({
  //     nodes: [
  //       { id: 1, label: "Node 1", title: "node 1 tootip text1" },
  //       { id: 2, label: "Node 2", title: "node 2 tootip text" },
  //       { id: 3, label: "Node 3", title: "node 3 tootip text" },
  //       { id: 4, label: "Node 4", title: "node 4 tootip text" },
  //       { id: 5, label: "Node 5", title: "node 5 tootip text" },
  //       { id: 6, label: "Node 69", title: "node 5 tootip text" },
  //     ],
  //     edges: [
  //       { from: 1, to: 2 },
  //       { from: 1, to: 3 },
  //       { from: 2, to: 4 },
  //       { from: 2, to: 5 },
  //       { from: 1, to: 6 },
  //     ],
  //   });
  // }
  return (
    <div className="App">
      <Graph
        key={graph.noOfEdges}
        graph={graph}
        // options={options}
        // events={events}
        getNetwork={(network) => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
      {tc.visGraph.nodes.length && (
        <button
          onClick={() => {
            setGraph(JSON.parse(JSON.stringify(tc.pop())));
          }}
        >
          back
        </button>
      )}
      {tc.visGraphHistory.nodes.length && (
        <button
          onClick={() => {
            setGraph(JSON.parse(JSON.stringify(tc.pushBack())));
          }}
        >
          next
        </button>
      )}
    </div>
  );
}

export default App;
