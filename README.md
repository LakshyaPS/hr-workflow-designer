# HR Workflow Designer (Prototype)

This repo is a fully functional prototype implementing the HR Workflow Designer assignment described in the project specification PDF.  
It includes a complete workflow canvas, node configuration panels, mock backend APIs, and a sandbox for simulation.

---

##Features

- **React + TypeScript + Vite**
- **React Flow canvas** with custom node components
- **Drag & Drop builder**  
  - Drag nodes from sidebar → drop on canvas
- **Node configuration forms** (each implemented separately):
  - Start Node
  - Task Node
  - Approval Node
  - Automated Node
  - End Node
- **Mock API using MSW:**
  - `GET /automations` — returns available automated actions & parameter definitions
  - `POST /simulate` — accepts serialized workflow (nodes + edges) and returns a mock execution log
- **Sandbox panel** to run workflow simulation and display execution steps
- **Basic validation**
  - Start node must exist
  - Start node cannot have incoming edges
- **Export workflow as JSON**

---

##Project Structure

src/
├─ components/
│ ├─ Canvas/ # Workflow canvas + custom React Flow node components
│ ├─ NodeForm/ # Separate editable forms for each node type
│ ├─ SandboxPanel.tsx # Workflow simulation tester
│ ├─ Sidebar.tsx # Sidebar listing draggable nodes
│ └─ Ui/ # Toolbar and small UI utilities
│
├─ api/
│ ├─ mock/ # MSW mock backend handlers (simulate + automations)
│ └─ index.ts # API helper functions
│
├─ hooks/
│ └─ useWorkflow.ts # Node and edge state management logic
│
├─ utils/
│ └─ graphValidation.ts # Structural workflow validation
│
├─ types/
│ └─ workflow.ts # Type definitions for all node data
│
├─ App.tsx # Main layout combining all modules
└─ main.tsx # Application entry point



