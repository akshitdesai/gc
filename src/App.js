import "./App.css";
import Graph from "react-graph-vis";
import { useState } from "react";
import { Button, Form, Select, InputNumber, Switch } from "antd";
import generator from "./generator";
let tc = generator(5, 2);
const { Option } = Select;

function App() {
  const [graph, setGraph] = useState(JSON.parse(JSON.stringify(tc.visGraph)));
  const [n, setN] = useState(5);
  const [k, setK] = useState(2);
  const [algo, setAlgo] = useState("cbip");
  const [cr, setCr] = useState((tc.maxColor * 1.0) / k);
  const [physics, setPhysics] = useState(true);

  const onFinish = () => {
    // Implementation for generating new graph
  };

  const onPreviousClick = () => {
    setGraph(JSON.parse(JSON.stringify(tc.pop())));
  };

  const onNextClick = () => {
    setGraph(JSON.parse(JSON.stringify(tc.pushBack())));
  };

  return (
    <div className="App">
      <div>
        <h5>Competitive Ratio = {cr}</h5>
      </div>
      <div className="Graph-Wrapper">
        <Graph
          key={graph.noOfEdges}
          graph={graph}
          options={{
            edges: {
              color: "#333333",
              width: 1,
              arrows: {
                to: { enabled: false }, // disable arrow at end of edge
                middle: { enabled: false }, // disable arrow in the middle of edge
                from: { enabled: false }, // disable arrow at start of edge
              },
            },

            nodes: {
              label: "Node label",
              borderWidth: 2,
              borderWidthSelected: 4,
              font: {
                size: 16,
                color: "#000000",
              },
              color: {
                border: "#000000",
              },
            },
            interaction: {
              hover: true,
              navigationButtons: true,
              zoomView: false,
              dragView: false,
            },
            physics: {
              enabled: physics,
              barnesHut: {
                gravitationalConstant: -2000,
                centralGravity: 0.5,
                springLength: 100,
              },
            },

            height: "500px",
          }}
          // events={events}
          getNetwork={(network) => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
      </div>
      <div className="controller-bar">
        <Button
          style={{ backgroundColor: "#159895", color: "#fff", margin: "20px" }}
          disabled={tc.visGraph.nodes.length == 1}
          onClick={onPreviousClick}
        >
          Previous
        </Button>
        <Button
          style={{
            backgroundColor: "#159895",
            color: "#fff",
            margin: "20px",
          }}
          disabled={!tc.visGraphHistory.nodes.length}
          onClick={onNextClick}
        >
          Next
        </Button>
        Physics
        <Switch
          style={{ margin:"10px" }}
          checkedChildren="On"
          unCheckedChildren="Off"
          defaultChecked
          onChange={(e) => {
            setPhysics(e);
          }}
        />
      </div>
      <div className="button-bar">
        <Form onFinish={onFinish} layout="inline">
          <Form.Item
            label="Number of Vertices (N)"
            name="n"
            rules={[{ required: true, message: "Please enter n." }]}
          >
            <InputNumber
              min={1}
              max={100}
              defaultValue={5}
              onChange={(e) => {
                setN(e);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Chromatic Number (K)"
            name="k"
            rules={[{ required: true, message: "Please enter k." }]}
          >
            <InputNumber
              min={2}
              max={50}
              defaultValue={2}
              onChange={(e) => {
                setK(e);
              }}
            />
          </Form.Item>
          <Form.Item
            name="algorithm"
            label="Algorithm"
            rules={[{ required: true, message: "Please select graph type." }]}
          >
            <Select
              placeholder="Select Algorithm"
              defaultValue="CBIP"
              onChange={(e) => {
                setAlgo(e);
              }}
            >
              <Option value="firstfit">First Fit</Option>
              <Option value="cbip">CBIP</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                if (algo === "cbip" && k > 2) {
                  alert("CBIP is only supported for k = 2.");
                  return;
                }
                if (n === null || k === null) {
                  alert("Please enter N and K.");
                  return;
                }
                if (k > n) {
                  alert("K can not be greater than N.");
                  return;
                }
                tc = generator(n, k, algo);
                setGraph(JSON.parse(JSON.stringify(tc.visGraph)));
                setCr((tc.maxColor * 1.0) / k);
              }}
            >
              Solve for a Random Graph
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default App;
