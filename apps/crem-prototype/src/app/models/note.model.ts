export class Note {
    id : number;
	noteType : string;
	noteAuthor : string;	
	noteDate : string;
	noteWhen : string;
	note : string;

	constructor( id, noteType, noteAuthor, noteDate, noteWhen, note ) {
		this.id = id;
		this.noteType = noteType;
		this.noteAuthor = noteAuthor;	
		this.noteDate = noteDate;
		this.noteWhen = noteWhen;
		this.note = note;
	}
}

export let notes : Note[] = [
	new Note(1, "Status", "Jason Trkovsky", "8/25/2020", "4 days ago", "Bacon ipsum dolor amet short ribs chuck beef ribs porchetta shankle, biltong jowl pig. Drumstick meatball fatback sausage spare ribs, bacon ham cupim. Drumstick pig corned beef, kevin salami shoulder fatback pork chop shankle chicken tenderloin ball tip bacon tongue sausage."),
	new Note(2, "Status", "Jason Trkovsky", "8/24/2020", "5 days ago", "Bacon ipsum dolor amet short ribs chuck beef ribs porchetta shankle, biltong jowl pig. "),
	new Note(3, "Status", "Jason Trkovsky", "8/23/2020", "6 days ago", "Bacon ipsum dolor amet short ribs chuck beef ribs porchetta shankle, biltong jowl pig. Drumstick meatball fatback sausage spare ribs, bacon ham cupim. Drumstick pig corned beef, kevin salami shoulder fatback pork chop shankle chicken tenderloin ball tip bacon tongue sausage. Ham filet mignon sausage strip steak, chislic sirloin spare ribs pork loin chicken picanha shoulder shankle rump fatback."),
	new Note(4, "Status", "Jason Trkovsky", "8/22/2020", "7 days ago", "Bacon ipsum dolor amet short ribs chuck beef ribs porchetta shankle, biltong jowl pig. Drumstick meatball fatback sausage spare ribs, bacon ham cupim. Drumstick pig corned beef, kevin salami shoulder fatback pork chop shankle chicken tenderloin ball tip bacon tongue sausage."),
	new Note(5, "Status", "Jason Trkovsky", "8/21/2020", "8 days ago", "Bacon ipsum dolor amet short ribs chuck beef ribs porchetta shankle, biltong jowl pig. Drumstick meatball fatback sausage spare ribs, bacon ham cupim. Drumstick pig corned beef, kevin salami shoulder fatback pork chop shankle chicken tenderloin ball tip bacon tongue sausage."),
	new Note(6, "Status", "Jason Trkovsky", "8/20/2020", "9 days ago", "Bacon ipsum dolor amet short ribs chuck beef ribs porchetta shankle, biltong jowl pig. Drumstick meatball fatback sausage spare ribs, bacon ham cupim. Drumstick pig corned beef, kevin salami shoulder fatback pork chop shankle chicken tenderloin ball tip bacon tongue sausage. Ham filet mignon sausage strip steak, chislic sirloin spare ribs pork loin chicken picanha shoulder shankle rump fatback."),
];