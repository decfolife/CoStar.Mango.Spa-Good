/** */
export class PdsProperty {
  propertyId : Number;
  buildingName : string;
  displayText : string;
  streetAddress : string;
  city : string;
  stateCode : string;
  postalCode : string;
  image : string;

  constructor(
    propertyId,
    buildingName,
    displayText,
    streetAddress,
    city,
    stateCode,
    postalCode,
    image,
  ) {
    this.propertyId = propertyId;
    this.buildingName = buildingName;
    this.displayText = displayText;
    this.streetAddress = streetAddress;
    this.city = city;
    this.stateCode = stateCode;
    this.postalCode = postalCode;
    this.image = image;
  }

}

export let PdsProperties : PdsProperty[] = [
  new PdsProperty( 10001, 'Phipps Tower', 'Office - Upper Buckhead Submarket', '3438 Peachtree Rd NE', 'Atlanta', 'GA', '30326', 'https://media.truva.com/image/upload/t_large_image/t_invisible_watermark/sstig1u7lhlorfz8ji6h'),
  new PdsProperty( 20001, 'Phipps Plaza', null, '3500 Peachtree Rd NE', 'Atlanta', 'GA', '30326', 'https://assets.simpleviewinc.com/simpleview/image/upload/crm/atlairportdistrict/phipps-plaza-entrance_DA4E8F19-5056-BF65-D65C7A31CC85A37E-da4e8cab5056bf6_da4e9b15-5056-bf65-d6b7c73e25572064.jpg'),
];



