import { useCallback, useState } from "react";
import { Node, Edge, addEdge } from "react-flow-renderer";

export function useWorkflow() {
  const [nodes, setNodes] = useState<Node[]>([
    // default empty canvas
  ]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback((changes:any) => {
    setNodes((nds) => nds.map(n => n));
  }, []);

  const onEdgesChange = useCallback((changes:any) => {
    setEdges((eds) => eds.map(e=>e));
  }, []);

  const addNode = useCallback((node: Node) => {
    setNodes((nds) => nds.concat(node));
  }, []);

  const updateNodeData = useCallback((id: string, data: any) => {
    setNodes((nds) => nds.map(n => n.id === id ? {...n, data: {...n.data, ...data}} : n));
  }, []);

  const removeNode = useCallback((id:string) => {
    setNodes((nds) => nds.filter(n => n.id !== id));
    setEdges((eds) => eds.filter(e => e.source !== id && e.target !== id));
  }, []);

  const onConnect = useCallback((connection:any) => {
    setEdges((eds) => addEdge(connection, eds));
  }, []);

  const removeEdge = useCallback((id:string) => {
    setEdges(eds => eds.filter(e => e.id !== id));
  }, []);

  return {
    nodes, edges, setNodes, setEdges,
    addNode, updateNodeData, removeNode, onConnect, removeEdge,
    onNodesChange, onEdgesChange
  };
}
