import './App.css';
import Graph from "react-graph-vis";
import {useEffect, useState} from "react";
import {itocol} from "./utils";

function App() {

  const [graphState, setGraphState] = useState({});
  const [csState, setCSState] = useState({});
  const [dataCBIP, setDataCBIP] = useState({
    num_vertex : 0,
    num_edge : 0,
    chromatic_number : 2,
    adj : new Map(),
    coloring : new Map(),

    visGraph : {nodes:[], edges:[]},
    noOfEdges : [],

    visGraphHistory : {nodes:[], edges:[]},
    noOfEdgesHistory : [],
  });

  const get_partition = (start_bfs) => {
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
        for (const v of dataCBIP.adj.get(u)) {
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
  const solve = (vertex, neighbours)=>{

    const _dataCBIP = dataCBIP;


    _dataCBIP.num_vertex++;
    _dataCBIP.adj.set(vertex, []);
    for (const v of neighbours) {
      _dataCBIP.adj.get(v).push(vertex);
      _dataCBIP.adj.get(vertex).push(v);
      _dataCBIP.num_edge++;
    }

    const partition = get_partition(vertex);
    let color = 1;
    for (const p of partition) {
      if (p.has(vertex)) {
        continue;
      }
      const neighbour_colors = new Set();
      for (const v of p) {
        neighbour_colors.add(_dataCBIP.coloring.get(v));
      }
      while (neighbour_colors.has(color)) {
        color++;
      }
    }

    _dataCBIP.coloring.set(vertex, color);

    _dataCBIP.visGraph.nodes.push(
        {
          id: vertex,
          label: `${vertex}`,
          color: {
            background: itocol[color], border: "black",
            hover: { background: itocol[color], border: "black" },
            highlight: { background: itocol[color], border: "black" },
          },
        })

    for (const v of neighbours) {
      _dataCBIP.visGraph.edges.push({from:vertex, to:v})
    }

    _dataCBIP.noOfEdges.push(neighbours.length)

    setDataCBIP(_dataCBIP);
  }

  const pop = () => {
    console.log("chal chal have")
    let _dataCBIP = dataCBIP;
    _dataCBIP.visGraphHistory.nodes.push(_dataCBIP.visGraph.nodes.pop());
    let x = _dataCBIP.noOfEdges.pop();
    _dataCBIP.noOfEdgesHistory.push(x);

    for(let i=0;i<x;i++){
      _dataCBIP.visGraphHistory.edges.push(_dataCBIP.visGraph.edges.pop());
    }
  console.log("state",dataCBIP.visGraph)
    setDataCBIP(_dataCBIP);
    console.log("local",_dataCBIP.visGraph);

  }

  useEffect(()=>{
    setDataCBIP({
      num_vertex : 0,
      num_edge : 0,
      chromatic_number : 2,
      adj : new Map(),
      coloring : new Map(),

      visGraph : {nodes:[], edges:[]},
      noOfEdges : [],

      visGraphHistory : {nodes:[], edges:[]},
      noOfEdgesHistory : [],
    })
    solve(1, []);
    solve(6, []);
    solve(2, [6]);
    solve(7, [1]);
    solve(3, [6, 7]);
    solve(8, [1, 2]);
    solve(4, [6, 7, 8]);
    solve(9, [1, 2, 3]);
    solve(5, [6, 7, 8, 9]);
    solve(10, [1, 2, 3, 4]);
    pop()
    console.log(dataCBIP)
    return ()=>{
      setDataCBIP({
        num_vertex : 0,
        num_edge : 0,
        chromatic_number : 2,
        adj : new Map(),
        coloring : new Map(),

        visGraph : {nodes:[], edges:[]},
        noOfEdges : [],

        visGraphHistory : {nodes:[], edges:[]},
        noOfEdgesHistory : [],
      })
    }
  },[])

  const options = {
    edges: {
      color: "#333333",
      width: 1,
      arrows: {
        to: {enabled: false}, // disable arrow at end of edge
        middle: {enabled: false}, // disable arrow in the middle of edge
        from: {enabled: false} // disable arrow at start of edge
      }
    },

    nodes: {
      label: "Node label",
      borderWidth: 2,
      borderWidthSelected: 4,
      font: {
        size: 16,
        color: "#000000"
      },
      color: {
        border:"#000000"
      }
    },
    interaction: {
      hover: true,
      navigationButtons: true,
      zoomView: true,
      dragView: true
    },
    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -2000,
        centralGravity: 0.1,
        springLength: 150
      }
    },
    height: "500px"
  };
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };
  console.log(dataCBIP)
  return (
    <div className="App">
      {Object.keys(dataCBIP.visGraph).length && <Graph
          graph={dataCBIP.visGraph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
      />}
      {Object.keys(dataCBIP.visGraph).length && <p>{dataCBIP.visGraph.nodes.length} deep</p>}
      <button onClick={() => pop()}>Back</button>
      <button>Next</button>
    </div>
  );
}

export default App;
