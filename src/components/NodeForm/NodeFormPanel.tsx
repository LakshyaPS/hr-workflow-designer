import React from "react";
import StartNodeForm from "./forms/StartNodeForm";
import TaskNodeForm from "./forms/TaskNodeForm";
import ApprovalNodeForm from "./forms/ApprovalNodeForm";
import AutomatedNodeForm from "./forms/AutomatedNodeForm";
import EndNodeForm from "./forms/EndNodeForm";
import { Node } from "react-flow-renderer";

export default function NodeFormPanel({ node, updateNode }:{node:Node|null, updateNode:(id:string,data:any)=>void}) {
  if (!node) return <div style={{padding:12}}>Select a node to edit</div>;
  const type = node.type as string;
  const props = { node, updateNode };
  switch(type) {
    case "start": return <StartNodeForm {...props} />;
    case "task": return <TaskNodeForm {...props} />;
    case "approval": return <ApprovalNodeForm {...props} />;
    case "automated": return <AutomatedNodeForm {...props} />;
    case "end": return <EndNodeForm {...props} />;
    default: return <div>Unknown node type</div>;
  }
}
