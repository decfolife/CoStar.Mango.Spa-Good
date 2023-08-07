export class SectionField {
    id : number;
	sectionId : Number;
	formFieldId : Number;

	constructor( id, sectionId, formFieldId ) {
		this.id = id;
		this.sectionId = sectionId;
		this.formFieldId = formFieldId;			
	}
}

export let sectionFields : SectionField[] = [
	new SectionField(1, 1, 1),
	new SectionField(2, 1, 2),
	new SectionField(3, 1, 3),
	new SectionField(4, 1, 4),
	new SectionField(5, 1, 5),
	new SectionField(5, 1, 6),
	new SectionField(7, 1, 7),
	new SectionField(8, 1, 8),
	new SectionField(9, 1, 9),
	new SectionField(10, 1, 10),
	new SectionField(11, 1, 11),
	new SectionField(19, 1, 12),
	new SectionField(17, 1, 13),
	new SectionField(18, 1, 14),
	new SectionField(20, 1, 16),
	
	new SectionField(25, 2, 25),
	new SectionField(26, 2, 26),
	new SectionField(27, 2, 27),
	new SectionField(28, 2, 28),
	new SectionField(29, 2, 29),
	new SectionField(30, 2, 30),
	new SectionField(31, 2, 31),
	new SectionField(32, 2, 32),
	new SectionField(33, 2, 33),
	new SectionField(34, 2, 34),
	new SectionField(35, 2, 35),
	new SectionField(36, 2, 36),
	new SectionField(37, 2, 37),
	new SectionField(38, 2, 38),

	new SectionField(400, 6, 400),
	new SectionField(401, 6, 401),
	new SectionField(402, 6, 402),
	new SectionField(403, 6, 403),
	new SectionField(404, 6, 404),
	new SectionField(405, 6, 405),
	new SectionField(406, 6, 406),
	new SectionField(407, 6, 407),
	new SectionField(408, 6, 408),
	new SectionField(409, 6, 409),
	new SectionField(410, 6, 410),
	new SectionField(411, 6, 411),
	new SectionField(412, 6, 412),
	new SectionField(413, 6, 413),
	new SectionField(414, 6, 414),
	new SectionField(415, 6, 415),
	new SectionField(416, 6, 416),
	new SectionField(417, 6, 417),
	new SectionField(418, 6, 418),

	new SectionField(419, 7, 419),
	new SectionField(420, 7, 420),
	new SectionField(421, 7, 421),
	new SectionField(422, 7, 422),
	new SectionField(423, 7, 423),
	new SectionField(424, 7, 424),
	new SectionField(425, 7, 425),
	new SectionField(426, 7, 426),
	new SectionField(427, 7, 427),
	new SectionField(428, 7, 428),
	new SectionField(429, 7, 429),
	new SectionField(430, 7, 430),
	new SectionField(431, 7, 431),
	new SectionField(432, 7, 432),
	new SectionField(433, 7, 433),

	new SectionField(434, 8, 434),
	new SectionField(435, 8, 435),
	new SectionField(436, 8, 436),
	new SectionField(437, 8, 437),
	new SectionField(438, 8, 438),
	new SectionField(439, 8, 439),
	new SectionField(440, 8, 440),	
];
