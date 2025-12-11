import React from "react";
import { Node } from "react-flow-renderer";

export const Sidebar: React.FC<{onDragStart: (type:string)=>void}> = ({onDragStart}) => {
  const items = [
    {type:"start", label:"Start"},
    {type:"task", label:"Task"},
    {type:"approval", label:"Approval"},
    {type:"automated", label:"Automated"},
    {type:"end", label:"End"}
  ];
  return (
    <div className="sidebar">
      <h3>Nodes</h3>
      {items.map(it => (
        <div key={it.type} draggable onDragStart={(ev)=>{ev.dataTransfer.setData('node-type', it.type); onDragStart(it.type) }} style={{padding:'8px', border:'1px solid #ddd', margin:'6px 0', borderRadius:6}}>
          {it.label}
        </div>
      ))}
      <p style={{fontSize:12, color:'#666'}}>Drag a node to the canvas to add it.</p>
    </div>
  );
};
