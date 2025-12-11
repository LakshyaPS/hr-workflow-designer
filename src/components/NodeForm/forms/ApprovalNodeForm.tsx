import React, { useState } from "react";
import { Node } from "react-flow-renderer";

export default function ApprovalNodeForm({node, updateNode}:{node:Node, updateNode:(id:string,data:any)=>void}) {
  const data = node.data || {};
  const [title, setTitle] = useState(data.title || "");
  const [approverRole, setApproverRole] = useState(data.approverRole || "Manager");
  const [threshold, setThreshold] = useState(data.autoApproveThreshold ?? 0);

  function save() {
    updateNode(node.id, { title, approverRole, autoApproveThreshold: Number(threshold) });
  }

  return (
    <div>
      <h3>Approval Node</h3>
      <label>Title</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <label>Approver Role</label>
      <input value={approverRole} onChange={e=>setApproverRole(e.target.value)} />
      <label>Auto-approve threshold (%)</label>
      <input type="number" value={threshold} onChange={e=>setThreshold(Number(e.target.value))} />
      <button onClick={save}>Save</button>
    </div>
  );
}
