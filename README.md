# HR Workflow Designer (Prototype)

This repository contains a fully functional prototype of the **HR Workflow Designer**, a visual workflow-building application implemented using **React, TypeScript, React Flow**, and **Mock Service Worker (MSW)**.  
The project fulfills all required features from the assignment specification PDF, including workflow editing, node configuration, mock APIs, and simulation.

---

## 🏗️ Architecture

The application is structured into clear, modular layers to separate workflow visualization, business logic, and mock backend services.

src/
├─ components/
│ ├─ Canvas/ # Workflow canvas + custom React Flow node components
│ ├─ NodeForm/ # Config forms for Start, Task, Approval, Automated, End nodes
│ ├─ SandboxPanel.tsx # Simulation tester + execution log viewer
│ ├─ Sidebar.tsx # Node library for drag & drop
│ └─ Ui/ # Toolbar and smaller UI elements
│
├─ api/
│ ├─ mock/ # MSW handlers (GET /automations, POST /simulate)
│ └─ index.ts # Wrapper functions for API calls
│
├─ hooks/
│ └─ useWorkflow.ts # Centralized workflow state (nodes, edges, updates)
│
├─ types/
│ └─ workflow.ts # Node data structure and workflow type definitions
│
├─ utils/
│ └─ graphValidation.ts # Basic structural validation logic
│
├─ App.tsx # Main application layout
└─ main.tsx # Vite entry point


### **Key Architecture Principles**
- **Separation of concerns**  
  Canvas logic, form logic, API logic, and validation logic are isolated into their own folders.
- **Modular component design**  
  Each node type (Start, Task, Approval, Automated, End) has its own form component for easy extension.
- **Unidirectional data flow**  
  Node updates flow from forms → App state → Canvas.
- **Mock API layer**  
  MSW simulates backend endpoints, allowing realistic async calls without needing a server.
- **React Flow for Graph Operations**  
  Handles drag/drop, connecting edges, positioning, and rendering custom nodes.

---

##How to Run:

### 1. Install dependencies
```bash
npm install

### 2. Start the development server
npm run dev

3. Open the app in your browser
http://localhost:5173

4. Build for production (optional)
npm run build
