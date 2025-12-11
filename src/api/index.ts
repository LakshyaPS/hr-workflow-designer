export async function getAutomations() {
  const res = await fetch("/automations");
  if (!res.ok) throw new Error("Failed to fetch automations");
  return res.json();
}

export async function simulateWorkflow(payload: any) {
  const res = await fetch("/simulate", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Simulation error");
  return json;
}
