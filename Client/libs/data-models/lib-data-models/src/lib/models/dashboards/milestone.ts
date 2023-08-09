


export interface Milestone{

  id: string;
  // eslint-disable-next-line max-len
  chipStatus: 'costar' | 'daysStatus' | 'overdueStatus' | 'activeStatus' | 'completeStatus' | 'upcomingStatus';
  chipContent: string;
  due: string;
  matTooltipContent: string;
}
