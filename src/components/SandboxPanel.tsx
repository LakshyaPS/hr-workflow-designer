import React, { useState } from "react";
import { simulateWorkflow } from "../api";
import { validateGraph } from "../utils/graphValidation";

export default function SandboxPanel({ nodes, edges }:{nodes:any[], edges:any[]}) {
  const [log, setLog] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function runSimulation() {
    setErrors([]);
    const errs = validateGraph(nodes, edges);
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      const res = await simulateWorkflow({ nodes, edges });
      setLog(res.steps.map((s:any)=> `${s.type.toUpperCase()}: ${s.title}`));
    } catch (err:any) {
      setErrors([err.message || 'Simulation failed']);
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h3>Sandbox</h3>
      <button onClick={runSimulation} disabled={loading}>Run</button>
      {errors.length > 0 && <div style={{color:'red'}}><strong>Errors</strong><ul>{errors.map(e=> <li key={e}>{e}</li>)}</ul></div>}
      <div>
        <h4>Execution Log</h4>
        <ul>
          {log.map((l,i)=> <li key={i}>{l}</li>)}
        </ul>
      </div>
    </div>
  );
}
