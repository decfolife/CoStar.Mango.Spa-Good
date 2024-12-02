export const getExportHistoryColumns = (
  dateFormat: string,
  dateOnlyFormat: string
) => {
  const columns = [
    {
      caption: 'ObjectType',
      name: 'ObjectType',
      dataField: 'objectType',
      allowFiltering: true,
      visible: false,
    },
    {
      caption: 'ObjectID',
      name: 'ObjectID',
      dataField: 'objectID',
      allowFiltering: true,
      visible: false,
    },
    {
      caption: 'ObjectTypeTypeName',
      name: 'ObjectTypeTypeName',
      dataField: 'objectTypeTypeName',
      allowFiltering: true,
      visible: false,
    },
    {
      caption: 'Child Object',
      name: 'ChildObject',
      dataField: 'childObject',
      allowFiltering: true,
    },
    {
      caption: 'Field Name',
      name: 'FieldName',
      dataField: 'fieldName',
      allowFiltering: true,
    },
    {
      caption: 'Change Date/Time',
      name: 'ChangeDateTime',
      dataField: 'changeDateTime',
      dataType: 'date',
      format: dateFormat,
      allowFiltering: true,
    },
    {
      caption: 'Last Modified',
      name: 'LastModified',
      dataType: 'date',
      format: dateFormat,
      dataField: 'lastModified',
      allowFiltering: true,
    },
    {
      caption: 'User',
      name: 'User',
      dataField: 'user',
      allowFiltering: true,
    },
    {
      caption: 'Description',
      name: 'Description',
      dataField: 'description',
      allowFiltering: true,
    },
    {
      caption: 'Old Value',
      name: 'OldValue',
      dataField: 'oldValue',
      allowFiltering: true,
    },
    {
      caption: 'New Value',
      name: 'NewValue',
      dataField: 'newValue',
      allowFiltering: true,
    },
    {
      caption: 'Date',
      name: 'GroupDate',
      dataField: 'groupDate',
      dataType: 'date',
      format: dateOnlyFormat,
      allowFiltering: true,
      groupIndex: '0',
      sortIndex: '0',
      sortOrder: 'asc',
      allowExporting: false,
    },
  ];
  return columns;
};
