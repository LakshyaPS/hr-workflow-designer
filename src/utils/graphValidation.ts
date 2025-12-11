export function validateGraph(nodes:any[], edges:any[]) {
  const errors: string[] = [];
  const hasStart = nodes.some(n => n.type === "start");
  if (!hasStart) errors.push("Missing Start node");
  // Start node should have no inbound edges
  const inbound = new Map();
  for (const e of edges) {
    inbound.set(e.target, (inbound.get(e.target)||0)+1);
  }
  for (const n of nodes) {
    if (n.type === "start" && inbound.get(n.id)) {
      errors.push("Start node should not have incoming edges");
    }
  }
  // cycle detection simple: if edges create same number as nodes maybe cycle; (basic)
  // For brevity return errors found
  return errors;
}
