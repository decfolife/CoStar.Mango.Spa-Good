import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Service, Hierarchy, FlatNode } from '../../../../../../app.service';


@Component({
	selector: 'app-portfolio-hierarchy',
	templateUrl: './portfolio-hierarchy.component.html',
	styleUrls: ['./portfolio-hierarchy.component.scss'],
	providers : [Service]
})
export class PortfolioHierarchyComponent implements OnInit {

	hierarchyLevels : Number;

	// flatNodeMap = new Map<FlatNode, Hierarchy>();

	// private _transformer = (node: Hierarchy, level: number) => {
	// 	return {
	// 		expandable: !!node.items && node.items.length > 0,
	// 		name: node.name,
	// 		level: level,
	// 	};
	// }

	// treeControl = new FlatTreeControl<FlatNode>( node => node.level, node => node.expandable );

	// treeFlattener = new MatTreeFlattener( this._transformer, node => node.level, node => node.expandable, node => node.items );

	// dataSource = new MatTreeFlatDataSource( this.treeControl, this.treeFlattener );

	constructor( private service : Service ) {
		// this.dataSource.data = HIERARCHY_DATA;
		// this.dataSource.data = service.getPortfolioHierarchy(1);
	}

	ngOnInit() {
		this.hierarchyLevels = 2;
	}

	// hasChild = (_: number, node: FlatNode) => node.expandable;

	// addNewItem(node: FlatNode) {
	// 	const parentNode = this.flatNodeMap.get(node);
	// 	// this._database.insertItem(parentNode!, '');
	// 	this.treeControl.expand(node);
	// }

	// /** Save the node to database */
	// saveNode(node: FlatNode, itemValue: string) {
	// 	const nestedNode = this.flatNodeMap.get(node);
	// 	// this._database.updateItem(nestedNode!, itemValue);
	// }
}
