import {
  Component,
  Inject,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { deepCopy, flatMap, MangoDialogService } from '@mango/core-shared';
import { TaskOrderItem } from '@project-dashboard/models';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { DxTreeViewComponent } from 'devextreme-angular';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import dxTreeView from 'devextreme/ui/tree_view';
import { from, of, Subscription } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';

export interface ReorderTaskComponentData {
  projectID: number;
  orderableTasks: Array<TaskOrderItemForUI>;
}

export interface TaskOrderItemForUI {
  taskId: number;
  parentId: number;
  ordinal: number;
  name: string;
}

export interface ProjectTaskTreeItem {
  id: number;
  parentId: number;
  name: string;
  ordinal: number;
  isDirectory: boolean;
  expanded?: boolean;
  isMoved: boolean;
  path: string;
}

@Component({
  selector: 'mango-reorder-tasks-modal',
  templateUrl: './reorder-tasks-modal.component.html',
  styleUrls: ['./reorder-tasks-modal.component.scss'],
})
export class ReorderTasksModalComponent implements OnInit {
  modalTitle = 'Reorder Tasks';
  modalId = 'reorderTasksModal';
  closeButton = true;
  subs: Subscription[] = [];
  hasChanges = false;
  gridSizing = {
    height: '500',
  };
  readonly maxTreeDepth = 4;

  constructor(
    private dashboardService: DashboardService,
    public dialogRef: MatDialogRef<ReorderTasksModalComponent>,
    public mangoDialog: MangoDialogService,
    @Inject(MAT_DIALOG_DATA) public data: ReorderTaskComponentData
  ) {
    this.newTaskSequence = this.buildTreeViewData(data.orderableTasks);
    this.currentTaskSequence = deepCopy(this.newTaskSequence);
  }

  buildTreeViewData(
    allTasks: Array<TaskOrderItemForUI>
  ): Array<ProjectTaskTreeItem> {
    return allTasks.map((task, idx) => ({
      id: task.taskId,
      parentId: task.parentId,
      isDirectory: true,
      expanded: true,
      name: task.name,
      ordinal: idx,
      path: this.buildNodePath(task, allTasks),
      isMoved: false,
    }));
  }

  buildNodePath(
    task: { ordinal: number; parentId: number },
    allTasks: Array<{ taskId: number; ordinal: number; parentId: number }>
  ) {
    let currentTask = task;
    let pathComponents = [];
    while (!!currentTask) {
      pathComponents.unshift(currentTask.ordinal);
      currentTask = allTasks.find(
        ({ taskId }) => taskId === currentTask.parentId
      );
    }
    return pathComponents.join('.');
  }

  public formatTaskName(item) {
    return `${item.path}) ${item.name}`;
  }

  ngOnInit(): void {}

  async closeModal(): Promise<boolean> {
    return this.tryPreventChangeLoss()
      .pipe(
        filter((allowClose) => allowClose),
        tap(() => {
          this.dialogRef.close();
        })
      )
      .toPromise(); // force promise otherwise we need to update rxJS so we can use firstValueFrom(...)
  }

  async resetForm(): Promise<boolean> {
    return this.tryPreventChangeLoss({
      title: 'Reset Task Sequence',
      message: 'Are you sure?',
    })
      .pipe(
        filter((allowAction) => allowAction),
        tap(() => {
          this.newTaskSequence = deepCopy(this.currentTaskSequence);
          this.newTaskSequence.forEach((task, index) => {
            task.isMoved = false;
          });
          this.hasChanges = false;
        })
      )
      .toPromise(); // force promise otherwise we need to update rxJS so we can use firstValueFrom(...)
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }

  @ViewChild('treeviewNewTaskSequence')
  treeviewNewTaskSequence: DxTreeViewComponent;

  @ViewChild('treeviewCurrentTaskSequence')
  treeviewCurrentTaskSequence: DxTreeViewComponent;

  newTaskSequence: ProjectTaskTreeItem[];
  currentTaskSequence: ProjectTaskTreeItem[];

  onDragChange(e: DxSortableTypes.DragChangeEvent) {
    const fromTreeView = this.treeviewNewTaskSequence.instance;
    const toTreeView = this.treeviewNewTaskSequence.instance;

    const fromNode = this.findNode(fromTreeView, e.fromIndex);
    const toNode = this.findNode(toTreeView, this.calculateToIndex(e));

    this.validateNodeMove(toNode, fromNode, e);

    (e.event.target as any).style.backgroundColor = e.cancel ? 'red' : '';
  }

  private validateNodeMove(
    toNode: any,
    fromNode: any,
    e: DxSortableTypes.DragChangeEvent
  ) {
    if (toNode !== null && this.isChildNode(fromNode, toNode)) {
      e.cancel = true;
      return;
    }
    if (e.dropInsideItem && toNode !== null && !toNode.itemData.isDirectory) {
      e.cancel = true;
      return;
    }
    // If the dragged node is a child of the target node - cancel the drag operation
    let currentNode = toNode;

    // determine the maximum allowed drop depth of the dragged node
    const maxRelativeDepth = this.getRelativeMaxDepth(fromNode.children);
    let depth = this.maxTreeDepth - maxRelativeDepth;

    while (!!currentNode) {
      // the node drop is too deep - cancel the drag operation
      // the node drop has children at a depth the exceeds the maximum allowed drop depth of the
      // recursively check to ensure we arent trying to put a parent node inside a child node
      if (depth === 0 || fromNode.key === currentNode.key) {
        e.cancel = true;
        return;
      }

      currentNode = currentNode.parent;
      depth--;
    }
  }

  onDragEnd(e: DxSortableTypes.DragEndEvent) {
    const fromTreeView = this.treeviewNewTaskSequence.instance;
    const toTreeView = this.treeviewNewTaskSequence.instance;

    const fromNode = this.findNode(fromTreeView, e.fromIndex);
    const toNode = this.findNode(toTreeView, this.calculateToIndex(e));

    this.validateNodeMove(toNode, fromNode, e);

    if (e.cancel) {
      return;
    }

    const toTopVisibleNode = this.getTopVisibleNode(e.toComponent);

    const fromItems = fromTreeView.option('items');
    const toItems = toTreeView.option('items');
    this.moveNode(fromNode, toNode, fromItems, toItems, e.dropInsideItem);

    fromTreeView.option('items', fromItems);
    toTreeView.option('items', toItems);
    toTreeView.scrollToItem(toTopVisibleNode);
    const treeRoot = toTreeView.getNodes();

    this.rebuildStepPathsRecursively(treeRoot);
    this.hasChanges = true;
    this.treeviewNewTaskSequence.instance._refresh();
  }

  /**
   * @param {('apply' | 'save')} update type, 'apply' - apply changes to the model, 'save' - save changes in the model and close
   * @memberof ReorderTasksModalComponent
   * @returns {Promise<boolean>}
   */
  async beginUpdate(action: 'apply' | 'save'): Promise<boolean> {
    return this.dashboardService
      .reorderProjectTasks({
        projectId: this.data.projectID,
        tasks: this.createUpdate(),
      } as any)
      .pipe(
        concatMap(({ success }) => {
          if (!success) {
            return this.mangoDialog
              .alert('Error', 'Could not update task sequence', 'OK')
              .pipe(map(() => false));
          }
          this.hasChanges = false;
          this.newTaskSequence.forEach((task) => {
            task.isMoved = false;
          });
          this.currentTaskSequence = deepCopy(this.newTaskSequence);
          if (action === 'save') {
            return from(this.closeModal());
          }
          return of(true);
        })
      )
      .toPromise(); // force promise otherwise we need to update rxJS in order to use firstValueFrom(...)
  }

  /**
   * @return {*}  {TaskOrderItem[]}
   * @memberof ReorderTasksModalComponent
   */
  createUpdate(): TaskOrderItem[] {
    const treeRoot = this.treeviewNewTaskSequence.instance.getNodes();
    return this.flattenTreeForUpdate(null, treeRoot)
      .reverse()
      .reduce((acc, item) => [item, ...acc], [])
      .map(
        ({ id, ordinal, path, parentId }): TaskOrderItem => ({
          parentId: parentId || 0,
          taskId: id,
          ordinal,
          fullStep: path,
        })
      );
  }

  rebuildStepPathsRecursively(
    nodes: DxTreeViewTypes.Node<any>[],
    pathBase: Array<number> = []
  ) {
    nodes.forEach((node, index) => {
      const nextPath = [...pathBase, index + 1];
      node.itemData.ordinal = index;
      node.itemData.path = nextPath.join('.');
      this.rebuildStepPathsRecursively(node.children, nextPath);
    });
  }

  flattenTreeForUpdate(
    currentNode: DxTreeViewTypes.Node<any>,
    nodes: DxTreeViewTypes.Node<any>[]
  ) {
    nodes.forEach((v, idx) => {
      v.itemData.ordinal = idx + 1;
    });

    return flatMap(
      [
        currentNode?.itemData,
        ...(nodes || []).map((childNode) =>
          this.flattenTreeForUpdate(childNode, childNode?.children)
        ),
      ].filter((v) => !!v)
    );
  }

  calculateToIndex(
    e: DxSortableTypes.DragChangeEvent | DxSortableTypes.DragEndEvent
  ) {
    if (e.fromComponent != e.toComponent || e.dropInsideItem) {
      return e.toIndex;
    }

    return e.fromIndex >= e.toIndex ? e.toIndex : e.toIndex + 1;
  }

  findNode(treeView: dxTreeView<any>, index: number) {
    const nodeElement = treeView
      .element()
      .querySelectorAll('.dx-treeview-node')[index];
    if (nodeElement) {
      return this.findNodeById(
        treeView.getNodes(),
        nodeElement.getAttribute('data-item-id')
      );
    }
    return null;
  }

  findNodeById(nodes: DxTreeViewTypes.Node[], id: string | number) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].itemData.id == id) {
        return nodes[i];
      }
      if (nodes[i].children) {
        const node = this.findNodeById(nodes[i].children, id);
        if (node != null) {
          return node;
        }
      }
    }
    return null;
  }

  moveNode(
    fromNode: DxTreeViewTypes.Node,
    toNode: DxTreeViewTypes.Node,
    fromItems: DxTreeViewTypes.Item[],
    toItems: DxTreeViewTypes.Item[],
    isDropInsideItem: boolean
  ) {
    this.hasChanges = true;
    const fromIndex = fromItems.findIndex(
      (item) => item.id == fromNode.itemData.id
    );
    fromItems.splice(fromIndex, 1);

    const toIndex =
      toNode === null || isDropInsideItem
        ? toItems.length
        : toItems.findIndex((item) => item.id == toNode.itemData.id);

    toItems.splice(toIndex, 0, fromNode.itemData);

    this.moveChildren(fromNode, fromItems, toItems);
    fromNode.itemData.isMoved = true;

    if (isDropInsideItem) {
      fromNode.itemData.parentId = toNode.itemData.id as number;
      fromNode.itemData.ordinal = toNode.children.length;

      const { parentId, ordinal } = fromNode.itemData;
      const newPath = this.buildNodePath(
        { parentId, ordinal: ordinal + 1 },
        this.data.orderableTasks
      );
      fromNode.itemData.path = newPath;
    } else {
      fromNode.itemData.parentId =
        toNode != null ? toNode.itemData.parentId : undefined;
    }
  }

  moveChildren(
    node: DxTreeViewTypes.Node,
    fromDataSource: DxTreeViewTypes.Item[],
    toDataSource: DxTreeViewTypes.Item[]
  ) {
    if (!node.itemData.isDirectory) {
      return;
    }

    node.children.forEach((child) => {
      child.itemData.isMoved = true;

      if (child.itemData.isDirectory) {
        this.moveChildren(child, fromDataSource, toDataSource);
      }

      const fromIndex = fromDataSource.findIndex(
        (item) => item.id == child.itemData.id
      );
      fromDataSource.splice(fromIndex, 1);
      toDataSource.splice(toDataSource.length, 0, child.itemData);
    });
  }

  isChildNode(
    parentNode: DxTreeViewTypes.Node,
    childNode: DxTreeViewTypes.Node
  ) {
    let parent = childNode.parent;
    while (parent !== null) {
      if (parent.itemData.id === parentNode.itemData.id) {
        return true;
      }
      parent = parent.parent;
    }
    return false;
  }

  getTopVisibleNode(component: DxSortableTypes.DragEndEvent['fromComponent']) {
    const treeViewElement = component.element();
    const treeViewTopPosition = treeViewElement.getBoundingClientRect().top;
    const nodes = treeViewElement.querySelectorAll('.dx-treeview-node');
    for (let i = 0; i < nodes.length; i++) {
      const nodeTopPosition = nodes[i].getBoundingClientRect().top;
      if (nodeTopPosition >= treeViewTopPosition) {
        return nodes[i];
      }
    }

    return null;
  }

  tryPreventChangeLoss(
    { title, message }: { title?; message? } = { message: null, title: null }
  ) {
    if (this.hasChanges) {
      return this.mangoDialog.confirm(
        title ?? 'You have unsaved changes',
        message ?? 'Unsaved Changes',
        'Continue',
        'Cancel'
      );
    }

    return of(true);
  }

  getRelativeMaxDepth(children: [] | undefined, currentDepth = 0): number {
    // if there are no children, return the current depth
    if (children?.length === 0) {
      return currentDepth;
    }
    // Recurse through each child's children and find the maximum depth from them
    return Math.max(
      ...children.map((child: { children?: [] }) =>
        this.getRelativeMaxDepth(child.children, currentDepth + 1)
      )
    );
  }
}

@Injectable({ providedIn: 'root' })
export class ReorderTaskModal {
  constructor(private dialog: MatDialog) {}
  open(
    config: Partial<MatDialogConfig<ReorderTaskComponentData>>
  ): MatDialogRef<ReorderTasksModalComponent, { x: string }> {
    return this.dialog.open<
      ReorderTasksModalComponent,
      ReorderTaskComponentData
    >(ReorderTasksModalComponent, {
      hasBackdrop: true,
      width: '100%',
      minWidth: '650px',
      maxWidth: '900px',
      disableClose: true,
      ...config,
    });
  }
}
