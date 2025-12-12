// TypeScript types for n8n API responses

export interface Workflow {
  id: string;
  name: string;
  active: boolean;
  nodes: WorkflowNode[];
  connections: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  settings?: WorkflowSettings;
}

export interface WorkflowNode {
  id: string;
  name: string;
  type: string;
  typeVersion: number;
  position: [number, number];
  parameters: Record<string, any>;
  webhookId?: string;
  credentials?: Record<string, any>;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowSettings {
  executionOrder?: 'v1' | 'v2';
  saveDataErrorExecution?: 'all' | 'none';
  saveDataSuccessExecution?: 'all' | 'none';
  saveManualExecutions?: boolean;
  callerPolicy?: string;
  timezone?: string;
}

export interface Execution {
  id: string;
  workflowId: string;
  workflowData: Workflow;
  finished: boolean;
  mode: 'manual' | 'trigger' | 'retry' | 'webhook';
  retryOf?: string;
  retrySuccessId?: string;
  startedAt: string;
  stoppedAt?: string;
  executionTime?: number;
  waitTill?: string;
  data: ExecutionData;
  status: 'success' | 'error' | 'running' | 'waiting' | 'canceled';
}

export interface ExecutionData {
  resultData: {
    runData: Record<string, ExecutionNodeData[]>;
    lastNodeExecuted?: string;
    executionData?: {
      contextData?: Record<string, any>;
      nodeExecutionStack?: any[];
    };
  };
  executionData?: {
    contextData?: Record<string, any>;
  };
}

export interface ExecutionNodeData {
  startTime: number;
  executionTime: number;
  data?: {
    main?: any[][];
  };
  error?: {
    message: string;
    name: string;
    stack?: string;
  };
}

export interface ExecutionListResponse {
  count: number;
  data: Execution[];
}

export interface WorkflowListResponse {
  data: Workflow[];
}

