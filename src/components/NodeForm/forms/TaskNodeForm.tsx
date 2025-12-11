import React, { useState } from "react";
import { Node } from "react-flow-renderer";

export default function TaskNodeForm({node, updateNode}:{node:Node, updateNode:(id:string,data:any)=>void}) {
  const data = node.data || {};
  const [title, setTitle] = useState(data.title || "");
  const [description, setDescription] = useState(data.description || "");
  const [assignee, setAssignee] = useState(data.assignee || "");
  const [dueDate, setDueDate] = useState(data.dueDate || "");
  const [keyField, setKeyField] = useState("");
  const [valField, setValField] = useState("");
  const [customFields, setCustomFields] = useState<Record<string,string>>(data.customFields || {});

  function addCustom() {
    setCustomFields(c=> ({...c, [keyField]: valField}));
    setKeyField(""); setValField("");
  }
  function save() {
    updateNode(node.id, { title, description, assignee, dueDate, customFields });
  }

  return (
    <div>
      <h3>Task Node</h3>
      <label>Title *</label>
      <input value={title} onChange={e=>setTitle(e.target.value)} />
      <label>Description</label>
      <textarea value={description} onChange={e=>setDescription(e.target.value)} />
      <label>Assignee</label>
      <input value={assignee} onChange={e=>setAssignee(e.target.value)} />
      <label>Due Date</label>
      <input value={dueDate} onChange={e=>setDueDate(e.target.value)} />
      <div>
        <h4>Custom Fields</h4>
        <input placeholder="key" value={keyField} onChange={e=>setKeyField(e.target.value)} />
        <input placeholder="value" value={valField} onChange={e=>setValField(e.target.value)} />
        <button onClick={addCustom}>Add</button>
        <pre style={{fontSize:12}}>{JSON.stringify(customFields, null, 2)}</pre>
      </div>
      <button onClick={save}>Save</button>
    </div>
  );
}
