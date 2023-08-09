/**
 * Defines Form Fields
 *
 * @export
 * @class FormField
 */

export class FormField {
  id: number;
  label: string;
  value: string;
  controlType: string;
  objectType: String;
  dataType: String;
  helpText: String;
  colSpan: String;
  maxLength: String;
  hasDefaultValue: boolean;
  defaultValue: String;
  minValue: String;
  maxValue: String;
  isExisting: String;
  existingTable: String;
  existingColumn: String;
  dropdownId: Number;
  dxTemplate: String;
  dropdownValues: Array<{value: string; display: string;}>;
  readOnly: Boolean;
  parentDropdownId: Number;
  dropdownSortOrder: String;

  /**
   * Creates an instance of FormField.
   * @param {Number} id: Unique form field ID
   * @param {String} label: Visible HTML label element
   * @param {String} value
   * @param {String} controlType: Type of DevExtreme field, Eg. https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxTextBox/
   * @param {String} objectType
   * @param {String} dataType
   * @param {String} helpText
   * @param {String} colSpan
   * @param {String} maxLength
   * @param {Boolean} hasDefaultValue
   * @param {String} defaultValue: Combine with controlTypes like 'dxTextBox' (dxTextBox) to determine default option of a dropdown
   * @param {String} minValue
   * @param {String} maxValue
   * @param {String} isExisting
   * @param {String} existingTable
   * @param {String} existingColumn
   * @param {Number} dropdownId
   * @param {String} dxTemplate
   * @param {Array<{value: string; display: string;}>} dropdownValues: Used for list of items. More info at https://js.devexpress.com/Documentation/Guide/UI_Components/SelectBox/Getting_Started_with_SelectBox/#Create_the_SelectBox
   * @param {Boolean} readOnly
   * @param {Number} parentDropdownId
   * @param {String} dropdownSortOrder
   * @memberof FormField
   */
  constructor(
    id: number,
    label: string,
    value: string,
    controlType: string,
    objectType: string,
    dataType: string,
    helpText: string,
    colSpan: string,
    maxLength: string,
    hasDefaultValue: boolean,
    defaultValue: string,
    minValue: string,
    maxValue: string,
    isExisting: string,
    existingTable: string,
    existingColumn: string,
    dropdownId: number,
    dxTemplate: string,
    dropdownValues: Array<{value: string; display: string;}>,
    readOnly : Boolean,
    parentDropdownId : Number,
    dropdownSortOrder : String,
  ) {
    this.id = id;
    this.label = label;
    this.value = value;
    this.controlType = controlType;
    this.objectType = objectType;
    this.dataType = dataType;
    this.helpText = helpText;
    this.colSpan = colSpan;
    this.maxLength = maxLength;
    this.hasDefaultValue = hasDefaultValue;
    this.defaultValue = defaultValue;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.isExisting = isExisting;
    this.existingTable = existingTable;
    this.existingColumn = existingColumn;
    this.dropdownId = dropdownId;
    this.dxTemplate = dxTemplate;
    this.dropdownValues = dropdownValues;
    this.readOnly = readOnly;
    this.parentDropdownId = parentDropdownId;
    this.dropdownSortOrder = dropdownSortOrder;
  }
}

export let formFields : FormField[] = [
	new FormField(1, 'System Building ID', 'systemBuildingID', 'Read Only', 'Building', 'Integer', "this is my help text", null, null, false, null, null, null, null, null, null, null, "readOnlyTemplate", [], true, null, null),
	new FormField(2, 'Building Portfolio', 'portfolio', 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "selectBoxTemplate", [], false, null, null),
	new FormField(3, 'Building Name', 'buildingName', 'Input', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "textBoxTemplate", [], false, null, null),
	new FormField(4, 'Building Hierarchy', 'buildingHierarchy', 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "hierarchyTemplate", [], false, null, null),
	new FormField(5, 'Address 1', 'address1', 'Input', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "textBoxTemplate", [], false, null, null),
	new FormField(6, 'OwnershipType', 'ownershipType', 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "selectBoxTemplate", [], false, null, null),
	new FormField(7, 'Address 2', 'address2', 'Input', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "textBoxTemplate", [], false, null, null),
	new FormField(8, 'Building Type', 'buildingType', 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, 1, "selectBoxTemplate", [], false, null, null),
	new FormField(9, 'City', 'city', 'Input', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "textBoxTemplate", [], false, null, null),
	new FormField(10, 'HQ Type', null, 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "selectBoxTemplate", [], false, null, null),
	new FormField(11, 'State', 'state', 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "selectBoxTemplate", [], false, null, null),
	new FormField(12, 'Workday ID', null, 'Input', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "textBoxTemplate", [], false, null, null),
	new FormField(13, 'Zip Code', 'zipCode', 'Input', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "textBoxTemplate", [], false, null, null),
	new FormField(14, 'Email Address', null, 'Input', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "textBoxTemplate", [], false, null, null),
	new FormField(15, 'Country', 'country', 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "selectBoxTemplate", [], false, null, null),
	new FormField(16, 'Submarket', null, 'Dropdown', 'Building', 'Text < 50', "this is my help text", null, null, false, null, null, null, null, null, null, null, "selectBoxTemplate", [], false, null, null),

	new FormField(25, 'Rentable Area', 'buildingRentableArea', 'Input', 'Building', 'Integer', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(32, 'Purchase Price', 'purchasePrice', 'Input', 'Building', 'Currency', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(26, 'Usable Area', 'buildingUsableArea', 'Input', 'Building', 'Integer', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(33, 'Construction Type', 'constructionType', 'Dropdown', 'Building', 'Text < 50', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(27, 'Land Size', 'landSize_Acres', 'Input', 'Building', 'Text < 50', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(34, 'Market Rent', 'marketRent_PSF_YR', 'Input', 'Building', 'Integer', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(28, 'Annual Op Ex', 'annualOpEx', 'Input', 'Building', 'Integer', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(35, 'Parking Rate', 'parkingRate', 'Input', 'Building', 'Integer', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(29, 'Annual Taxes', 'annualTaxes', 'Input', 'Building', 'Integer', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(36, 'Parking Ratio', 'parkingRatio_PerK', 'Input', 'Building', 'Text < 50', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(30, 'Year Built', 'yearBuilt', 'Input', 'Building', 'Text < 50', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(37, 'Latitude', 'latitude', 'Input', 'Building', 'Text < 50', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),
	new FormField(31, 'Measure Units', 'buildingMeasureUnits', 'Dropdown', 'Building', 'Text < 50', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'selectBoxTemplate', [], false, null, null),
	new FormField(38, 'Longitude', 'longitude', 'Input', 'Building', 'Text < 50', 'this is my help text', null, null, false, null, null, null, null, null, null, null, 'textBoxTemplate', [], false, null, null),

	new FormField(400, 'System Lease ID', '', 'Read Only', 'Lease', 'Integer', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(401, 'Tenant Legal Name', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(402, 'Landlord Legal Name', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(403, 'Client Lease ID', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(404, 'Building Name', '', 'Read Only', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(405, 'Address 1', '', 'Read Only', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(406, 'Address 2', '', 'Read Only', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(407, 'City', '', 'Read Only', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(408, 'State', '', 'Read Only', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(409, 'Zip Code', '', 'Read Only', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(410, 'Country', '', 'Read Only', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(411, 'Floor', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(412, 'Suite', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(413, 'Building Type', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(414, 'Abstract Prepared By', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(415, 'Abstract Reviewed By', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(416, 'Lease Email Address', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(417, 'Lease Hierarchy', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(418, 'Lease Portfolio', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),

	new FormField(419, 'Lease Agreement Date', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(420, 'Possession Date', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(421, 'Rent Commencement Date', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(422, 'Original Lease Commencement', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(423, 'Original Lease Expiration Date', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(424, 'Original Term', '', 'Calculated', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(425, 'Current Lease Commencement', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(426, 'Current Lease Expiration Date', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(427, 'Current Term', '', 'Calculated', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(428, 'Term Comment', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(429, 'Lease Status', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(430, 'Lease Type', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(431, 'Lease Recovery Type', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(432, 'Last Possible Expiration', '', 'Date Picker', 'Lease', 'Date', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(433, 'Lease Life Remaining', '', 'Calculated', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),

	new FormField(434, 'Rentable Area', '', 'Input', 'Lease', 'Integer', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(435, 'Measure Units', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(436, 'Pro Rata Share', '', 'Input', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(437, 'Primary Use', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(438, 'Additional Use', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(439, 'Account Type', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
	new FormField(440, 'Currency', '', 'Dropdown', 'Lease', 'Text < 50', null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null),
];