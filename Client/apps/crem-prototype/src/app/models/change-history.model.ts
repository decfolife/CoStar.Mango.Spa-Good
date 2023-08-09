export class ChangeHistory {
    id : number;
    objectType : string;
	object : string;
	field : string;	
	user : string;
	lastModified : string;
	oldValue : string;
	newValue : string;
	eventType: string;

	constructor( id, objectType, object, field, user, lastModified, oldValue, newValue, eventType ) {
		this.id = id;
		this.objectType = objectType;
		this.object = object;
		this.field = field;	
		this.user = user;
		this.lastModified = lastModified;
		this.oldValue = oldValue;
		this.newValue = newValue;
		this.eventType = eventType;
	}
}

export let changeHistory : ChangeHistory[] = [
	new ChangeHistory(1, 'Property', 'Property (2)', 'County', 'Jason Trkovsky', '2016-10-01', '', 'Cobb', 'Property Updated'),
	new ChangeHistory(2, 'Property', 'Property (2)', 'County', 'Patrick Griffith', '2017-10-01', 'Cobb', 'Fulton', 'Propery Updated'),
	new ChangeHistory(3, 'Property', 'Property (2)', 'County', 'Patrick Griffith', '2018-10-01', 'Fulton', 'Gwinnett', 'Propery Updated'),
	new ChangeHistory(4, 'Property', 'Property (2)', 'County', 'Jason Trkovsky', '2019-10-01', 'Gwinnett', 'Fulton', 'Propery Updated'),
	new ChangeHistory(5, 'Property', 'Property (2)', 'Zip Code', 'Jason Trkovsky', '2016-10-01', '', '30318', 'Propery Updated'),
	new ChangeHistory(6, 'Property', 'Property (2)', 'Zip Code', 'Patrick Griffith', '2017-10-01', '30318', '30022', 'Propery Updated'),
	new ChangeHistory(7, 'Property', 'Property (2)', 'Zip Code', 'Patrick Griffith', '2018-10-01', '30022', '30024', 'Propery Updated'),
	new ChangeHistory(8, 'Property', 'Property (2)', 'Zip Code', 'Jason Trkovsky', '2019-10-01', '30024', '30313', 'Propery Updated'),
	new ChangeHistory(9, 'Tax History', 'Tax History (1)', 'Assessed Value', 'Jason Trkovsky', '2018-10-01', '', '17560000', 'Tax History Added'),
	new ChangeHistory(10, 'Tax History', 'Tax History (1)', 'Tax Amount', 'Jason Trkovsky', '2018-10-01', '', '385060', 'Tax History Added'),
	new ChangeHistory(11, 'Tax History', 'Tax History (1)', 'Tax Year', 'Jason Trkovsky', '2018-10-01', '', '2011', 'Tax History Added'),
	new ChangeHistory(9, 'Tax History', 'Tax History (2)', 'Assessed Value', 'Patrick Griffith', '2018-10-02', '', '1880000', 'Tax History Added'),
	new ChangeHistory(10, 'Tax History', 'Tax History (2)', 'Tax Amount', 'Patrick Griffith', '2018-10-02', '', '458300', 'Tax History Added'),
	new ChangeHistory(11, 'Tax History', 'Tax History (2)', 'Tax Year', 'Patrick Griffith', '2018-10-02', '', '2010', 'Tax History Added'),
	new ChangeHistory(12, 'Tax History', 'Tax History (2)', 'Assessed Value', 'Patrick Griffith', '2018-10-04', '1880000', '19200000', 'Tax History Updated'),
	new ChangeHistory(13, 'Tax History', 'Tax History (2)', 'Tax Amount', 'Patrick Griffith', '2018-10-04', '458300', '512351', 'Tax History Updated'),
	
	new ChangeHistory(14, 'Appraisal History', 'Appraisal History (1)', 'Appraisal Date', 'Jason Trkovsky', '2019-10-01', '', '2017-01-01', 'Appraisal History Added'),
	new ChangeHistory(15, 'Appraisal History', 'Appraisal History (1)', 'Appraisal Value', 'Jason Trkovsky', '2019-10-01', '', '100', 'Appraisal History Added'),
	new ChangeHistory(16, 'Appraisal History', 'Appraisal History (1)', 'Appraisal Fee', 'Jason Trkovsky', '2019-10-01', '', '500', 'Appraisal History Added'),
	new ChangeHistory(17, 'Appraisal History', 'Appraisal History (1)', 'Appraisal Company', 'Jason Trkovsky', '2019-10-01', '', 'sdf', 'Appraisal History Added'),
	new ChangeHistory(18, 'Appraisal History', 'Appraisal History (1)', 'Appraisal Currency', 'Jason Trkovsky', '2019-10-01', '', 'Afghan Afghani', 'Appraisal History Added'),
	new ChangeHistory(19, 'Appraisal History', 'Appraisal History (1)', 'Notes', 'Jason Trkovsky', '2019-10-01', '', 'dabes', 'Appraisal History Added'),

	new ChangeHistory(20, 'Appraisal History', 'Appraisal History (2)', 'Appraisal Date', 'Jason Trkovsky', '2019-10-01', '', '2011-09-02', 'Appraisal History Added'),
	new ChangeHistory(21, 'Appraisal History', 'Appraisal History (2)', 'Appraisal Value', 'Jason Trkovsky', '2019-10-01', '', '15605000', 'Appraisal History Added'),
	new ChangeHistory(22, 'Appraisal History', 'Appraisal History (2)', 'Appraisal Fee', 'Jason Trkovsky', '2019-10-01', '', '2400', 'Appraisal History Added'),
	new ChangeHistory(23, 'Appraisal History', 'Appraisal History (2)', 'Appraisal Company', 'Jason Trkovsky', '2019-10-01', '', 'Oglethorpe and Cannon', 'Appraisal History Added'),
	new ChangeHistory(24, 'Appraisal History', 'Appraisal History (2)', 'Appraisal Currency', 'Jason Trkovsky', '2019-10-01', '', 'United States Dollar', 'Appraisal History Added'),
	new ChangeHistory(25, 'Appraisal History', 'Appraisal History (2)', 'Notes', 'Jason Trkovsky', '2019-10-01', '', 'Reappaised per taxing authority requirements', 'Appraisal History Added'),

	new ChangeHistory(26, 'Appraisal History', 'Appraisal History (3)', 'Appraisal Date', 'Jason Trkovsky', '2019-10-01', '', '2010-05-15', 'Appraisal History Added'),
	new ChangeHistory(27, 'Appraisal History', 'Appraisal History (3)', 'Appraisal Value', 'Jason Trkovsky', '2019-10-01', '', '20110500', 'Appraisal History Added'),
	new ChangeHistory(28, 'Appraisal History', 'Appraisal History (3)', 'Appraisal Fee', 'Jason Trkovsky', '2019-10-01', '', '1600', 'Appraisal History Added'),
	new ChangeHistory(29, 'Appraisal History', 'Appraisal History (3)', 'Appraisal Company', 'Jason Trkovsky', '2019-10-01', '', 'Jackson and Cooksey Appraisals', 'Appraisal History Added'),
	new ChangeHistory(30, 'Appraisal History', 'Appraisal History (3)', 'Appraisal Currency', 'Jason Trkovsky', '2019-10-01', '', 'United States Dollar', 'Appraisal History Added'),
	new ChangeHistory(31, 'Appraisal History', 'Appraisal History (3)', 'Notes', 'Jason Trkovsky', '2019-10-01', '', 'Special appraisal to dispute tax assessment', 'Appraisal History Added'),
	// new ChangeHistory(14, 'Insurance', 'Insurance (453)', 'Zip Code', 'Patrick Griffith', '2017-10-01', '30318', '30022'),
	// new ChangeHistory(15, 'Insurance', 'Insurance (453)', 'Zip Code', 'Patrick Griffith', '2018-10-01', '30022', '30024'),
	// new ChangeHistory(16, 'Insurance', 'Insurance (453)', 'Zip Code', 'Jason Trkovsky', '2019-10-01', '30024', '30313'),
];