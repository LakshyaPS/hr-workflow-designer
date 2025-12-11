import React, { useState } from "react";
import { Node } from "react-flow-renderer";

export default function EndNodeForm({node, updateNode}:{node:Node, updateNode:(id:string,data:any)=>void}) {
  const data = node.data || {};
  const [endMessage, setEndMessage] = useState(data.endMessage || "");
  const [summary, setSummary] = useState<boolean>(!!data.summary);

  function save() {
    updateNode(node.id, { endMessage, summary });
  }

  return (
    <div>
      <h3>End Node</h3>
      <label>End message</label>
      <input value={endMessage} onChange={e=>setEndMessage(e.target.value)} />
      <div>
        <label>Summary</label>
        <input type="checkbox" checked={summary} onChange={e=>setSummary(e.target.checked)} />
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}
