import React, { useState } from "react";
import WorkflowCanvas from "./components/Canvas/WorkflowCanvas";
import { Sidebar } from "./components/Sidebar";
import NodeFormPanel from "./components/NodeForm/NodeFormPanel";
import SandboxPanel from "./components/SandboxPanel";
import SimpleToolbar from "./components/Ui/SimpleToolbar";
import { Node, Edge } from "react-flow-renderer";

/**
 * Top-level app: arranges sidebar, canvas, right panel.
 * For simplicity, we keep nodes & edges in App state and pass down.
 * In production, extract into context/hook (already partially done in useWorkflow).
 */
export default function App() {
  const [selectedNode, setSelectedNode] = useState<Node|null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  function onSelectNode(node: Node) {
    setSelectedNode(node);
  }

  function updateNode(id:string, data:any) {
    setNodes(n=> n.map(nd => nd.id === id ? {...nd, data: {...nd.data, ...data}} : nd));
    // also update selectedNode
    const updated = nodes.find(n => n.id === id);
    if (updated) setSelectedNode({...updated, data: {...updated.data, ...data}});
  }

  function handleDragStart(type:string) {
    // no-op used by sidebar to set effect
  }

  function exportJson() {
    const payload = { nodes, edges };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "workflow.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="app">
      <Sidebar onDragStart={handleDragStart}/>
      <div style={{flex:1, display:'flex', flexDirection:'column'}}>
        <SimpleToolbar onExport={exportJson}/>
        <div style={{display:'flex', flex:1}}>
          <div style={{flex:1}}>
            <WorkflowCanvas onSelectNode={onSelectNode}/>
          </div>
          <div className="rightPanel" style={{width:360}}>
            <NodeFormPanel node={selectedNode} updateNode={updateNode} />
            <hr/>
            <SandboxPanel nodes={nodes} edges={edges} />
          </div>
        </div>
      </div>
    </div>
  );
}
