export class GLAccount {
    id : Number;
    accountName : String;
    accountCode : String;
	accountCategory : String;	
	recognitionCategoryGaap : String;
	recognitionCategoryIfrs : String;
	accountType : String;
	accountNumber : String;
	isRent : Boolean;
	isStraightLined : Boolean;
	isPercentRent : Boolean;

	constructor(id,accountName,accountCode,accountCategory,recognitionCategoryGaap,recognitionCategoryIfrs,accountType,accountNumber,isRent,isStraightLined,isPercentRent) {
		this.id = id;
		this.accountName = accountName;
		this.accountCode = accountCode;
		this.accountCategory = accountCategory;
		this.recognitionCategoryGaap = recognitionCategoryGaap;
		this.recognitionCategoryIfrs = recognitionCategoryIfrs;
		this.accountType = accountType;
		this.accountNumber = accountNumber;
		this.isRent = isRent;
		this.isStraightLined = isStraightLined;
		this.isPercentRent = isPercentRent;
	}
}

export let glAccounts : GLAccount[] = [
	new GLAccount(9,"Direct Costs","4000","Expenses","","","Expense","4000","No","No","No"),
	new GLAccount(14,"Taxes/Property Taxes","6121","Expenses","","","Expense","6121","No","No","No"),
	new GLAccount(16,"Repair and Maintenance","6171","Expenses","","","Expense","6171","No","No","No"),
	new GLAccount(25,"Colocation Rent and Expenses","6412","Expenses","","","Expense","6412","Yes","No","No"),
	new GLAccount(29,"Outside Support","6666","Expenses","","","Expense","6666","No","No","No"),
	new GLAccount(56,"Deposits - Office - Equipment","1910","Asset","","","Expense","1910","No","No","No"),
	new GLAccount(94,"Tenant Allowance Straight Lined","","Expenses","Lease Expense","Lease Expense","Expense","6410","No","Yes","No"),
	new GLAccount(95,"Tenant Allowance","","DO NOT PAY","Lease Expense","Lease Expense","Expense","","No","Yes","No"),
	new GLAccount(97,"Parking","5120","Expenses","","","Expense","5120","No","No","No"),
	new GLAccount(98,"Office Expense","6490","Expenses","","","Expense","6490","No","No","No"),
	new GLAccount(99,"Office Rent","6410","Expenses","Lease Expense","Lease Expense","Expense","6410","Yes","No","No"),
	new GLAccount(100,"Office Supplies","6182","Expenses","","","Expense","6182","No","No","No"),
	new GLAccount(103,"Operating Expense","522300","Expenses","Variable Cost","","Expense","522300","No","No","No"),
	new GLAccount(104,"Base Rent","522100","Expenses","Lease Expense","","Expense","522100","Yes","No","No"),
	new GLAccount(105,"Parking","511100","Expenses","Lease Expense","","Expense","511100","No","No","No"),
	new GLAccount(109,"Equipment Lease","523200","Expenses","Lease Expense","","Expense","523200","No","No","No"),
	new GLAccount(110,"Auto Lease","527300","Expenses","Lease Expense","","Expense","527300","No","No","No"),
	new GLAccount(111,"Co-Location Expense","522600","Expenses","Lease Expense","","Expense","522600","No","No","No"),
	new GLAccount(102,"AR Revenue","","Revenue","","","Income","","No","No","No"),
	new GLAccount(106,"Subtenant","522100","Income","Lease Revenue","","Income","522100","Yes","No","No"),
	new GLAccount(112,"Tenant Improvement Receivable","145000","Income","Lease Revenue","","Income","145000","No","No","No"),
	new GLAccount(113,"Security Deposits","192000","Income","","","Income","192000","No","No","No"),
];



