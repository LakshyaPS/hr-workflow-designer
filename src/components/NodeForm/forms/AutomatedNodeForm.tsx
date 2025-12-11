import React, { useEffect, useState } from "react";
import { Node } from "react-flow-renderer";
import { getAutomations } from "../../../api";

export default function AutomatedNodeForm({node, updateNode}:{node:Node, updateNode:(id:string,data:any)=>void}) {
  const data = node.data || {};
  const [title, setTitle] = useState(data.title || "");
  const [actionId, setActionId] = useState(data.actionId || "");
  const [params, setParams] = useState<Record<string,string>>(data.params || {});
  const [actions, setActions] = useState<any[]>([]);

  useEffect(()=> {
    getAutomations().then(a => setActions(a)).catch(()=>setActions([]));
  },[]);

  useEffect(()=> {
    // ensure params keys are present when action changes
    const def = actions.find(a => a.id === actionId);
    if (def) {
      const newParams:any = {};
      def.params.forEach((p:string)=> newParams[p] = params[p] || "");
      setParams(newParams);
    }
  }, [actionId, actions]);

  function save() {
    updateNode(node.id, { title, actionId, params });
  }

  return (
    <div>
      <h3>Automated Step</h3>
      <label>Title</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <label>Action</label>
      <select value={actionId} onChange={e=>setActionId(e.target.value)}>
        <option value="">-- choose --</option>
        {actions.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
      </select>
      <div>
        <h4>Action Parameters</h4>
        {Object.keys(params || {}).map(k => (
          <div key={k}>
            <label>{k}</label>
            <input value={params[k]} onChange={e=>setParams(p=>({...p, [k]:e.target.value}))} />
          </div>
        ))}
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}
