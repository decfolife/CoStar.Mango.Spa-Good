export class EquipmentLease {
	SystemLeaseID : number;
	SupplierName : string;
	EquipmentLeaseType : string;
	Address1 : string;
	Address2 : string;
	City : string;
	State : string;
	ZipCode : string;
	Country : string;
	EQLocationOther : string;
	OrganizationalHierarchy : string;
	LeaseCommencement : string;
	LeaseExpiration : string;
	Currency : string;
	AccountType : string;
	LeaseStatus : string;
	LegalEntity : string;
	Make : string;
	Model : string;
	ModelDescription : string;
	SerialNumber : string;
	CopierID : string;
	InvoicedBy : string;

	constructor(SystemLeaseID, SupplierName, EquipmentLeaseType, Address1, Address2, City, State, ZipCode, Country, EQLocationOther, OrganizationalHierarchy, LeaseCommencement, LeaseExpiration, Currency, AccountType, LeaseStatus, LegalEntity, Make, Model, ModelDescription, SerialNumber, CopierID, InvoicedBy) {
		this.SystemLeaseID = SystemLeaseID; 
		this.SupplierName = SupplierName; 
		this.EquipmentLeaseType = EquipmentLeaseType; 
		this.Address1 = Address1; 
		this.Address2 = Address2; 
		this.City = City; 
		this.State = State; 
		this.ZipCode = ZipCode; 
		this.Country = Country; 
		this.EQLocationOther = EQLocationOther; 
		this.OrganizationalHierarchy = OrganizationalHierarchy; 
		this.LeaseCommencement = LeaseCommencement; 
		this.LeaseExpiration = LeaseExpiration; 
		this.Currency = Currency; 
		this.AccountType = AccountType; 
		this.LeaseStatus = LeaseStatus; 
		this.LegalEntity = LegalEntity; 
		this.Make = Make; 
		this.Model = Model; 
		this.ModelDescription = ModelDescription; 
		this.SerialNumber = SerialNumber; 
		this.CopierID = CopierID; 
		this.InvoicedBy = InvoicedBy; 
	}
}

export let equipmentLeases : EquipmentLease[] = [
	new EquipmentLease(407, "Advanced Office Equipment", null, "100 Congress Avenue", "1500", "Austin", null, "78701", null, null, null, "10/1/2015", "10/1/2020", "USD", "AP", null, "55089371", "SHARP", "MX-3140N", null, null, null, null),
	new EquipmentLease(408, "Advanced Office Equipment", null, "8910 University Center Lane", "300", "San Diego", null, "92122", null, null, null, "12/1/2015", "12/1/2020", "USD", "AP", null, "55112064", "SHARP", "MX-3140N", null, null, null, null),
	new EquipmentLease(409, "Advanced Office Equipment", null, "1331 L Street NW", null, "Washington", null, "20005", null, null, null, "1/1/2016", "1/1/2021", "USD", "AP", null, "55014774", "SHARP", "MX-3140N", null, null, null, null),
	new EquipmentLease(410, "Advanced Office Equipment", null, "621 Capital Mall", "2550", "Sacramento", null, "95814", null, null, null, "5/1/2016", "5/1/2021", "USD", "AP", null, "5507714Y", "SHARP", "MX-3050N", null, null, null, null),
	new EquipmentLease(411, "Advanced Office Equipment", null, "101 California Street", "4300", "San Francisco", null, "94111", null, null, null, "7/1/2016", "7/1/2021", "USD", "AP", null, "55106417", "SHARP", "MX-5140N", null, null, null, null),
	new EquipmentLease(412, "Advanced Office Equipment", null, "1300 Post Oak Boulevard", "1545", "Houston", null, "77056", null, null, null, "7/1/2017", "7/1/2021", "USD", "AP", null, "75022253", "SHARP", "MX-3050N", null, null, null, null),
	new EquipmentLease(413, "Advanced Office Equipment", null, "33 Arch Street", "3300", "Boston", null, "02110", null, null, null, "7/1/2017", "7/1/2021", "USD", "AP", null, "35114428", "SHARP", "MX-7500N", null, null, null, null),
	new EquipmentLease(414, "Advanced Office Equipment", null, "1177 Avenue of the Americas", "43rd", "New York", null, "10036", null, null, null, "7/1/2017", "7/1/2021", "USD", "AP", null, "75042624", "SHARP", "MX-3050N", null, null, null, null),
	new EquipmentLease(415, "Advanced Office Equipment", null, "3333 Piedmont Rd, NE", "200", "Atlanta", null, "30305", null, null, null, "5/1/2018", "1/1/2022", "USD", "AP", null, "85064751", "SHARP", "MX-3050N", null, null, null, null),
	new EquipmentLease(416, "Advanced Office Equipment", null, "1331 L Street NW", "3rd", "Washington", null, "20005", null, null, null, "7/1/2017", "7/1/2022", "USD", "AP", null, "65134004", "SHARP", "MX-5070N", null, null, null, null),
	new EquipmentLease(417, "Advanced Office Equipment", null, "1331 L Street NW", "3rd", "Washington", null, "20005", null, null, null, "7/1/2017", "7/1/2022", "USD", "AP", null, "65135314", "SHARP", "MX-5070N", null, null, null, null),
	new EquipmentLease(418, "Advanced Office Equipment", null, "501 S. 5th Street", "9th", "Richmond", null, "23219", null, null, null, "10/1/2017", "9/1/2022", "USD", "AP", null, "75092041", "SHARP", "MX-4070N", null, null, null, null),
	new EquipmentLease(419, "Advanced Office Equipment", null, "501 S. 5th Street", "9th", "Richmond", null, "23219", null, null, null, "2/1/2018", "2/1/2023", "USD", "AP", null, "75097289", "SHARP", "MX-4070N", null, null, null, null),
	new EquipmentLease(420, "Advanced Office Equipment", null, "1331 L Street NW", "MARKETING", "Washington", null, "23219", null, null, null, "4/1/2018", "4/1/2023", "USD", "AP", null, "75141231", "SHARP", "MX-4070N", null, null, null, null),
	new EquipmentLease(421, "Advanced Office Equipment", null, "1735 Market Street", "4050", "Philadelphia", null, "19103", null, null, null, "4/1/2018", "4/1/2023", "USD", "AP", null, "7505185y", "SHARP", "MX-3050N", null, null, null, null),
	new EquipmentLease(422, "Advanced Office Equipment", null, "3333 Piedmont Rd, NE", "200", "Atlanta", null, "30305", null, null, null, "5/1/2018", "5/1/2023", "USD", "AP", null, "85061351", "SHARP", "MX-3050N", null, null, null, null),
	new EquipmentLease(423, "Advanced Office Equipment", null, "1331 L Street NW", "4th", "Washington", null, "20005", null, null, null, "6/1/2018", "6/1/2023", "USD", "AP", null, "75099749", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(424, "Advanced Office Equipment", null, "8910 University Center Lane", "300", "San Diego", null, "92122", null, null, null, "7/1/2018", "7/1/2023", "USD", "AP", null, "85109954", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(425, "Advanced Office Equipment", null, "8910 University Center Lane", "300", "San Diego", null, "92122", null, null, null, "7/1/2018", "7/1/2023", "USD", "AP", null, "45119292", "SHARP", "MX-6240N", null, null, null, null),
	new EquipmentLease(426, "Advanced Office Equipment", null, "181 Bay Street, Bay Wellington Tower", "3420", "Toronto", null, "M5J 2T3", null, null, null, "12/1/2018", "11/30/2023", "CAD", "AP", null, "MX3050V Sharp", "SHARP", "MX-3050V", null, null, null, null),
	new EquipmentLease(427, "Advanced Office Equipment", null, "1331 L Street NW", "2nd", "Washington", null, "20005", null, null, null, "11/1/2018", "10/31/2023", "USD", "AP", null, "85117376", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(428, "Advanced Office Equipment", null, "1331 L Street NW", "4th", "Washington", null, "20005", null, null, null, "11/1/2018", "10/31/2023", "USD", "AP", null, "85133497", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(429, "Advanced Office Equipment", null, "1331 L Street NW", "8th", "Washington", null, "20005", null, null, null, "11/1/2018", "10/31/2023", "USD", "AP", null, "85133627", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(430, "Advanced Office Equipment", null, "1331 L Street NW", "10th", "Washington", null, "20005", null, null, null, "11/1/2018", "10/31/2023", "USD", "AP", null, "85135547", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(431, "Advanced Office Equipment", null, "1331 L Street NW", "5th", "Washington", null, "20005", null, null, null, "11/1/2018", "10/31/2023", "USD", "AP", null, "85133707", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(432, "Advanced Office Equipment", null, "1331 L Street NW", "7th", "Washington", null, "20005", null, null, null, "11/1/2018", "10/31/2023", "USD", "AP", null, "85133717", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(433, "Advanced Office Equipment", null, "1450 Brickell Avenue", "500", "Miami", null, "33131", null, null, null, "11/1/2018", "10/31/2023", "USD", "AP", null, "85076067", "SHARP", "MX-3050N", null, null, null, null),
	new EquipmentLease(434, "Advanced Office Equipment", null, "3161 Michelson Drive", "1675", "Irvine", null, "92612", null, null, null, "2/1/2019", "1/31/2024", "USD", "AP", null, "8506504Y", "SHARP", "MX-3051", null, null, null, null),
	new EquipmentLease(435, "Advanced Office Equipment", null, "777 S Figueroa Street", "50th", "Los Angeles", null, "90017", null, null, null, "2/1/2019", "1/31/2024", "USD", "AP", null, "8509579Y", "SHARP", "MX-5070", null, null, null, null),
	new EquipmentLease(441, "Tesla", null, "750 N St Paul St", "2000", "Dallas", null, "75201", null, null, null, "3/3/2017", "3/3/2020", "USD", "AP", null, "Tesla - VIN ending 7335", "Tesla", "Model S", null, null, null, null),
	new EquipmentLease(442, "Tesla", null, "10 W Broad Street", "750", "Columbus", null, "43215", null, null, null, "3/23/2017", "3/23/2020", "USD", "AP", null, "Tesla - VIN ending 7415", "Tesla", "Model S", null, null, null, null),
	new EquipmentLease(443, "Tesla", null, "1331 L St, NW", null, "Washington", null, "20005", null, null, null, "3/11/2017", "3/11/2020", "USD", "AP", null, "Tesla - VIN ending 7414", "Tesla", "Model S", null, null, null, null),
	new EquipmentLease(444, "Tesla", null, "3438 Peachtree Road, NE", "15th floor", "Atlanta", null, "30326", null, null, null, "6/23/2017", "6/23/2020", "USD", "AP", null, "Tesla - VIN ending 8913", "Tesla", "Model S", null, null, null, null),
	new EquipmentLease(445, "Tesla", null, "750 N St Paul St", "2000", "Dallas", null, "75201", null, null, null, "12/8/2017", "12/8/2020", "USD", "AP", null, "Tesla - VIN ending 4588", "Tesla", "Model S 100D", null, null, null, null),
	new EquipmentLease(446, "Tesla", null, "8910 Universitey Center Lane", "300", "San Diego", null, "92122", null, null, null, "12/1/2017", "12/1/2020", "USD", "AP", null, "Tesla - VIN ending 9436", "Tesla", "Model S 100D", null, null, null, null),
	new EquipmentLease(448, "Tesla", null, "10 W Broad Street", "750", "Columbus", null, "43215", null, null, null, "5/23/2018", "5/23/2021", "USD", "AP", null, "Tesla - VIN ending 3494", "Tesla", "Model S 100D", null, null, null, null),
	new EquipmentLease(449, "Coresite", null, "12100 Sunrise Valley Drive", null, "Reston", null, "20191", null, null, "North America", "7/18/2017", "6/30/2022", "USD", "AP", null, "Coresite Data Center", null, null, null, null, null, null),
	new EquipmentLease(450, "Coresite", null, "12369 Sunrise Valley Drive", null, "Reston", null, "20191", null, null, "North America", "11/10/2017", "6/30/2022", "USD", "AP", null, "Coresite Storage Space", null, null, null, null, null, null),
	new EquipmentLease(452, "Sungard", null, "1055 Spring St. NW", null, "Atlanta", null, "30309", null, null, null, "11/1/2018", "10/31/2020", "USD", "AP", null, "Sungard Availability Services", null, null, null, null, null, null),
	new EquipmentLease(453, "Internap Network Services", null, "2260 E El Segundo BlVD", null, "EL Segundo", null, "90245", null, null, null, "5/1/2017", "4/30/2020", "USD", "AP", null, "Data Storage Corporation (TSP NY Location)", null, null, null, null, null, null),
];


	