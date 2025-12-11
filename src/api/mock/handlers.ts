import { rest } from "msw";

const automations = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] }
];

export const handlers = [
  rest.get("/automations", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(automations));
  }),

  rest.post("/simulate", async (req, res, ctx) => {
    const body = await req.json();
    // body is expected to be a workflow graph with nodes and edges
    // simple simulation: walk nodes from start(s) following edges and return steps
    const nodes = body.nodes || [];
    const edges = body.edges || [];

    const nodesById = new Map(nodes.map((n: any) => [n.id, n]));
    const inbound = new Map<string, string[]>();
    const outbound = new Map<string, string[]>();
    for (const e of edges) {
      outbound.set(e.source, (outbound.get(e.source) || []).concat(e.target));
      inbound.set(e.target, (inbound.get(e.target) || []).concat(e.source));
    }

    // find starts
    const startNodes = nodes.filter((n: any) => n.type === "start");
    // naive traversal BFS
    const result: any[] = [];
    const visited = new Set();
    const queue = startNodes.map((s: any) => s.id);
    while (queue.length > 0) {
      const id = queue.shift();
      if (!id || visited.has(id)) continue;
      visited.add(id);
      const node = nodesById.get(id);
      result.push({
        id,
        type: node?.type,
        title: node?.data?.title || node?.data?.endMessage || node?.data?.title || "untitled",
        status: "executed"
      });
      const outs = outbound.get(id) || [];
      for (const t of outs) {
        if (!visited.has(t)) queue.push(t);
      }
    }

    // if nothing executed, return error-ish
    if (result.length === 0) {
      return res(ctx.status(400), ctx.json({ error: "No start node connected" }));
    }

    return res(ctx.status(200), ctx.json({ steps: result }));
  })
];
