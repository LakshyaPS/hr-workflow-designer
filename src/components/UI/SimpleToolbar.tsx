import React from "react";

export default function SimpleToolbar({onExport}:{onExport?:()=>void}) {
  return (
    <div className="toolbar">
      <button onClick={()=>onExport && onExport()}>Export JSON</button>
      <div style={{flex:1}}/>
    </div>
  );
}
