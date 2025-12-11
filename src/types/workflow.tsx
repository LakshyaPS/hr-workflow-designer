export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface BaseNodeData {
  title?: string;
  [key: string]: any;
}

export interface StartNodeData extends BaseNodeData {
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  actionId?: string;
  params?: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  endMessage?: string;
  summary?: boolean;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;
