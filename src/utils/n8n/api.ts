// n8n API client
import type {
  Workflow,
  Execution,
  ExecutionListResponse,
  WorkflowListResponse,
} from './types';

export interface N8nConfig {
  baseUrl: string;
  apiKey?: string;
}

export class N8nApiClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(config: N8nConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.apiKey = config.apiKey;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.apiKey) {
      headers['X-N8N-API-KEY'] = this.apiKey;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`N8N API Error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  async getWorkflows(): Promise<Workflow[]> {
    const response = await this.request<WorkflowListResponse>('/api/v1/workflows');
    return response.data || [];
  }

  async getWorkflow(id: string): Promise<Workflow> {
    return this.request<Workflow>(`/api/v1/workflows/${id}`);
  }

  async createWorkflow(workflow: Partial<Workflow>): Promise<Workflow> {
    return this.request<Workflow>('/api/v1/workflows', {
      method: 'POST',
      body: JSON.stringify(workflow),
    });
  }

  async updateWorkflow(id: string, workflow: Partial<Workflow>): Promise<Workflow> {
    return this.request<Workflow>(`/api/v1/workflows/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workflow),
    });
  }

  async deleteWorkflow(id: string): Promise<void> {
    await this.request(`/api/v1/workflows/${id}`, {
      method: 'DELETE',
    });
  }

  async activateWorkflow(id: string): Promise<Workflow> {
    return this.request<Workflow>(`/api/v1/workflows/${id}/activate`, {
      method: 'POST',
    });
  }

  async deactivateWorkflow(id: string): Promise<Workflow> {
    return this.request<Workflow>(`/api/v1/workflows/${id}/deactivate`, {
      method: 'POST',
    });
  }

  async getExecutions(params?: {
    workflowId?: string;
    limit?: number;
    status?: string;
    finished?: boolean;
  }): Promise<Execution[]> {
    const searchParams = new URLSearchParams();
    if (params?.workflowId) searchParams.append('workflowId', params.workflowId);
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.finished !== undefined) searchParams.append('finished', params.finished.toString());

    const response = await this.request<ExecutionListResponse>(
      `/api/v1/executions?${searchParams.toString()}`
    );
    return response.data || [];
  }

  async getExecution(id: string): Promise<Execution> {
    return this.request<Execution>(`/api/v1/executions/${id}`);
  }

  async deleteExecution(id: string): Promise<void> {
    await this.request(`/api/v1/executions/${id}`, {
      method: 'DELETE',
    });
  }

  async executeWorkflow(id: string, data?: Record<string, any>): Promise<Execution> {
    return this.request<Execution>(`/api/v1/workflows/${id}/execute`, {
      method: 'POST',
      body: JSON.stringify(data || {}),
    });
  }
}

// Create singleton instance
export function createN8nClient(): N8nApiClient {
  const baseUrl = import.meta.env.PUBLIC_N8N_BASE_URL || 'http://localhost:5678';
  const apiKey = import.meta.env.PUBLIC_N8N_API_KEY;

  return new N8nApiClient({ baseUrl, apiKey });
}

