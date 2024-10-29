import { exportTreeList, TreeListExcelProps } from '@mango/core-shared';
import { DxTreeListComponent } from 'devextreme-angular';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

export class ProjectTaskTreeExportUtility {
  constructor(private readonly component: DxTreeListComponent<any, any>) {}

  async download(fileName: string = 'download'): Promise<void> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Tasks');
    const exportDate = new Date().toISOString();
    return this.export({
      component: this.component.instance,
      worksheet,
    })
      .then(() => workbook.xlsx.writeBuffer())
      .then((buffer) => {
        saveAs(
          new Blob([buffer], { type: 'application/octet-stream' }),
          `${fileName}_Tasks_${exportDate}.xlsx`
        );
      });
  }

  private async export({
    component,
    worksheet,
  }: TreeListExcelProps): Promise<void> {
    return exportTreeList({
      component,
      worksheet,
      // customizations run in sequence of definition
      transformations: {
        'transform-task-status': (row) => {
          row.taskStatus = row.TaskStatus[0].Title;
        },
        'trim-whitespace': (row) => {
          Object.keys(row).forEach((key) => {
            if (typeof row[key] === 'string') {
              const trimmedValue = row[key].trim();
              row[key] = trimmedValue;
            }
          });
        },
        'concat-predecessors': (row) => {
          row.Predecessors = row.Predecessors?.join(', ') ?? '';
        },
        'concat-approvers': (row) => {
          row.Approvers =
            row.Approvers?.map(
              ({ FullName, ApprovalStatus }) =>
                `${FullName} - ${ApprovalStatus}`
            ).join(', ') ?? '';
        },
        'task-depth-indentation': (row) => {
          row.IndexOrder = `${` `.repeat(row.depth * 3)}${
            row.ProjectMilestoneStepFull
          }`;
        },
      },
      headerOverrides: {
        taskStatus: 'Status',
      },
      buildDependencyFilter: (result: any[]) =>
        /* if v.ProjectMilestoneStepFull is X.Y.Z then*/ /* we should add to stepDependencies X.Y and X or else X.Y.Z will not be returned*/
        result
          .map(({ ProjectMilestoneStepFull }: any) =>
            ProjectMilestoneStepFull.split('.')
              .map((_, idx, stepFragments) =>
                stepFragments.slice(0, idx + 1).join('.')
              )
              .slice(0, -1)
          )
          .reduce(
            (prev: any[], curr: any[]) => [...new Set([...prev, ...curr])],
            []
          )
          .map((step) => ['or', ['ProjectMilestoneStepFull', '=', step]])
          .reduce((prev, curr) => [...prev, ...curr], []),
    });
  }
}
