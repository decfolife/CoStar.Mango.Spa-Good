
export class DashboardCard {
  componentName : string;
  colSpan : number;
  visible : boolean;
  title : string;

  constructor(
    componentName: string,
    colSpan: number,
    visible: boolean,
    title: string,
  ) {
		this.componentName = componentName;
		this.colSpan = colSpan;
		this.visible = visible;
		this.title = title;
	}
}