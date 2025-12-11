import React, { useState } from "react";
import { Node } from "react-flow-renderer";

export default function StartNodeForm({node, updateNode}:{node:Node, updateNode:(id:string,data:any)=>void}) {
  const data = node.data || {};
  const [title, setTitle] = useState(data.title || "");
  const [metaKey, setMetaKey] = useState("");
  const [metaVal, setMetaVal] = useState("");
  const [metadata, setMetadata] = useState<Record<string,string>>(data.metadata || {});

  function save() {
    updateNode(node.id, { title, metadata });
  }
  function addMeta() {
    setMetadata(m=>({...m, [metaKey]:metaVal}));
    setMetaKey(""); setMetaVal("");
  }
  return (
    <div>
      <h3>Start Node</h3>
      <label>Title</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <div style={{marginTop:8}}>
        <h4>Metadata</h4>
        <div>
          <input placeholder="key" value={metaKey} onChange={e=>setMetaKey(e.target.value)} />
          <input placeholder="value" value={metaVal} onChange={e=>setMetaVal(e.target.value)} />
          <button onClick={addMeta}>Add</button>
        </div>
        <pre style={{fontSize:12}}>{JSON.stringify(metadata, null, 2)}</pre>
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}
