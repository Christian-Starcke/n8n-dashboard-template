// Helper functions for formatting and processing n8n data
import type { Execution, Workflow } from './types';
import { formatDistanceToNow, format } from 'date-fns';

export function formatExecutionTime(ms?: number): string {
  if (!ms) return 'N/A';
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}m ${seconds}s`;
}

export function formatExecutionStatus(execution: Execution): 'success' | 'error' | 'running' | 'waiting' | 'canceled' {
  if (!execution.finished) {
    if (execution.waitTill) return 'waiting';
    return 'running';
  }

  // Check if execution has errors
  const hasError = execution.data?.resultData?.runData
    ? Object.values(execution.data.resultData.runData).some((nodeData) =>
        nodeData.some((data) => data.error)
      )
    : false;

  if (hasError) return 'error';
  return 'success';
}

export function formatRelativeTime(time: string): string {
  try {
    return formatDistanceToNow(new Date(time), { addSuffix: true });
  } catch {
    return time;
  }
}

export function formatAbsoluteTime(time: string): string {
  try {
    return format(new Date(time), 'PPpp');
  } catch {
    return time;
  }
}

export function getWorkflowExecutionCount(workflow: Workflow, executions: Execution[]): number {
  return executions.filter((exec) => exec.workflowId === workflow.id).length;
}

export function getLastExecution(workflow: Workflow, executions: Execution[]): Execution | undefined {
  const workflowExecutions = executions
    .filter((exec) => exec.workflowId === workflow.id)
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

  return workflowExecutions[0];
}

export function calculateSuccessRate(executions: Execution[]): number {
  if (executions.length === 0) return 0;

  const successful = executions.filter((exec) => {
    const status = formatExecutionStatus(exec);
    return status === 'success';
  }).length;

  return Math.round((successful / executions.length) * 100 * 10) / 10;
}

export function getAverageExecutionTime(executions: Execution[]): number {
  const finishedExecutions = executions.filter((exec) => exec.executionTime);
  if (finishedExecutions.length === 0) return 0;

  const totalTime = finishedExecutions.reduce((sum, exec) => sum + (exec.executionTime || 0), 0);
  return Math.round(totalTime / finishedExecutions.length);
}

