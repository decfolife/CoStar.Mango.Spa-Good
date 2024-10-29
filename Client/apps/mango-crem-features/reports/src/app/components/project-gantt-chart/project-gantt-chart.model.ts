export class Task {
  taskId: number;
  projectId: number;
  step: string;
  name: string;
  taskLabel: string;
  targetStartDate?: Date;
  targetCompleteDate?: Date;
  actualStartDate?: Date;
  actualCompleteDate?: Date;
  color: string;
  indexOrder: number;
}
