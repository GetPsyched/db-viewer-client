import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import TableNode from "./TableNode";

const edges = [{ id: "1-2", source: "1", target: "2", type: "step" }];

const nodes = [
  {
    id: "1",
    type: "tableNode",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "tableNode",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

const nodeTypes = { textUpdater: TableNode };

const VisualMagic = () => {
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default VisualMagic;
