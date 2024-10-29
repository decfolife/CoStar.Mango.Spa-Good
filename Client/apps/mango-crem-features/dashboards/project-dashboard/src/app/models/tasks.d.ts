export interface ReorderProjectTasksCommand {
  projectId: number;
  tasks: TaskOrderItem[];
}
export interface TaskOrderItem {
  taskId: number;
  parentId: number;
  ordinal: number;
  fullStep: string;
}
