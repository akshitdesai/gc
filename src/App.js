import "./App.css";
import Graph from "react-graph-vis";
import test_case from "./solver.js";
import { useEffect, useState } from "react";
import { Button, Form, Select, InputNumber } from "antd";
const tc = test_case();
const { Option } = Select;
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
      dragView: false
    },
    physics: {
      enabled: true,
      barnesHut: {
        gravitationalConstant: -2000,
        centralGravity: 0.1,
        springLength: 150
      }
    },
    height: "700px"
  };
  const onFinish = () => {
    // Implementation for genrating new graph
  }

  const onPreviousClick = () => {
    setGraph(JSON.parse(JSON.stringify(tc.pop())));
  }

  const onNextClick = () => {
    setGraph(JSON.parse(JSON.stringify(tc.pushBack())));
  }
  console.log(tc.visGraphHistory.nodes.length)
  return (
    <div className="App">
      <div className="Graph-Wrapper">
        <Graph
          key={graph.noOfEdges}
          graph={graph}
          options={options}
          // events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
          />
      </div>
      <div className="controller-bar">
          <Button style={{backgroundColor:"#159895", color:"#fff", margin:"20px"}} disabled={!(tc.visGraph.nodes.length)} onClick={onPreviousClick}>Previous</Button>
          <Button style={{backgroundColor:"#159895", color:"#fff", marginLeft:"20px"}} disabled={!(tc.visGraphHistory.nodes.length)} onClick={onNextClick}>Next</Button>
      </div>
      <div className="button-bar">
        <Form
          onFinish={onFinish}
          layout="inline"
        >
          <Form.Item 
          label="n"
          name="n"
          rules={[{ required: true, message: 'Please enter n.' }]}
          >
            <InputNumber min={1} max={20} />
          </Form.Item>
          <Form.Item 
          label="k"
          name="k"
          rules={[{ required: true, message: 'Please enter k.' }]}
          >
            <InputNumber min={1} max={20} />
          </Form.Item>
          <Form.Item name="graphType" label="Graph Type" rules={[{ required: true , message: 'Please select graph type.' }]}>
            <Select
              placeholder="Select Graph type"
              allowClear
            >
              <Option value="CBIP">CBIP</Option>
              <Option value="First Solver">First Solver</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Solve Graph</Button>
          </Form.Item>
        </Form>   
      </div>
    </div>
  );
}

export default App;
