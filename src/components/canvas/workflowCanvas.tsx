import React, { useCallback, useRef, useState } from "react";
import ReactFlow, { addEdge, Background, Controls, ReactFlowProvider, MiniMap } from "react-flow-renderer";
import { StartNode, TaskNode, ApprovalNode, AutomatedNode, EndNode } from "./customNodes";
import { useWorkflow } from "../../hooks/useWorkflow";

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode
};

export default function WorkflowCanvas({ onSelectNode }:{onSelectNode:(node:any)=>void}) {
  const reactFlowWrapper = useRef<HTMLDivElement|null>(null);
  const { nodes, edges, setNodes, setEdges, addNode, onConnect, removeNode, updateNodeData } = useWorkflow();
  const [rfInstance, setRfInstance] = useState<any>(null);

  const onDragOver = useCallback((event:any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event:any) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('node-type');
    const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
    const position = rfInstance?.project
      ? rfInstance.project({ x: event.clientX - (reactFlowBounds?.left||0), y: event.clientY - (reactFlowBounds?.top||0) })
      : { x: 0, y: 0 };

    const id = `${type}_${+new Date()}`;
    const newNode = {
      id,
      type,
      position,
      data: { title: `${type} node` }
    };

    setNodes((nds:any) => nds.concat(newNode));
  }, [rfInstance, setNodes]);

  return (
    <div style={{display:'flex', flex:1}}>
      <div ref={reactFlowWrapper} style={{flex:1, minHeight:600}}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onInit={setRfInstance}
            nodeTypes={nodeTypes}
            onConnect={(c)=>setEdges(eds => addEdge(c, eds))}
            onNodesChange={(changes)=>{}}
            onEdgesChange={(changes)=>{}}
            onNodeClick={(e,node)=> onSelectNode(node)}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            style={{width:'100%', height:'100%'}}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
