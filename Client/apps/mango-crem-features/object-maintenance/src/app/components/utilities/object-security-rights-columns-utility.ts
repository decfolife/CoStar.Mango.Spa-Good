export type Condition = Condition[] | string | number;

export const getObjectSecurityRightsColumns = () => {
  const columns = [
    {
      caption: 'ID',
      name: 'SecRightAssignID',
      dataField: 'id',
      allowFiltering: true,
    },
    {
      caption: 'Entity Type',
      name: 'EntityType',
      dataField: 'entityType',
      allowFiltering: true,
    },
    {
      caption: 'Assigned To',
      name: 'AssignedTo',
      dataField: 'assignedTo',
      allowFiltering: true,
    },
    {
      caption: 'Right Assigned',
      name: 'RightAssigned',
      dataField: 'rightAssigned',
      headerFilter: { allowSearch: true },
      allowFiltering: true,
    },
    {
      caption: 'Assigned By',
      name: 'AssignedBy',
      dataField: 'assignedBy',
      headerFilter: { allowSearch: true },
      allowFiltering: true,
    },
    {
      caption: 'Assigned Date',
      name: 'AssignedDate',
      dataField: 'assignedDate',
      dataType: 'string',
      allowFiltering: true,
      headerFilter: { allowSearch: true },
      sortIndex: '0',
      sortOrder: 'desc',
    },
  ];
  return columns;
};

export const getFilter = (): Condition => {
  return [];
};
