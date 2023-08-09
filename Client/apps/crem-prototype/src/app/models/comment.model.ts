export class Comment {
    id : number;
	createdBy : string;
	createdDate : string;	
	type : string;
	comment : string;

	constructor( id, createdBy, createdDate, type, comment ) {
		this.id = id;
		this.createdBy = createdBy;
		this.createdDate = createdDate;	
		this.type = type;
		this.comment = comment;
	}
}

export let comments : Comment[] = [
	new Comment(1, 'Jason Trkovsky', '2019-10-18', 'General', 'Bacon ipsum dolor amet tail ham hock frankfurter meatball. Sausage jowl rump, cow pork belly ground round tri-tip ham pancetta pork capicola kevin filet mignon bacon. Corned beef landjaeger swine, kielbasa pork boudin bacon doner pancetta venison leberkas short loin tongue. Ball tip drumstick t-bone jerky bresaola capicola pork chop porchetta strip steak tri-tip cow leberkas tongue.'),
	new Comment(2, 'Jason Trkovsky', '2019-10-17', 'General', 'Pork loin doner turkey venison shankle tenderloin drumstick boudin sirloin tail ground round pastrami strip steak. Fatback short loin brisket, tail shoulder turkey strip steak ball tip beef kevin cow landjaeger. Brisket prosciutto spare ribs, pastrami frankfurter strip steak tail sirloin salami.'),
	new Comment(3, 'Patrick Griffith', '2019-10-01', 'General', 'Boudin pastrami sausage chuck, alcatra ham spare ribs fatback t-bone. Kevin filet mignon sausage ham rump, salami t-bone ball tip beef. '),
	new Comment(4, 'Jason Trkovsky', '2019-09-14', 'General', 'Chicken capicola andouille spare ribs. Corned beef tail leberkas pork chop chicken, sausage tongue. Tenderloin salami short loin, jerky boudin beef ribs beef landjaeger. Tail prosciutto brisket capicola ribeye biltong pancetta swine chicken filet mignon.'),
	new Comment(5, 'Jason Trkovsky', '2019-10-18', 'General', 'Bacon ipsum dolor amet tail ham hock frankfurter meatball. Sausage jowl rump, cow pork belly ground round tri-tip ham pancetta pork capicola kevin filet mignon bacon. Corned beef landjaeger swine, kielbasa pork boudin bacon doner pancetta venison leberkas short loin tongue. Ball tip drumstick t-bone jerky bresaola capicola pork chop porchetta strip steak tri-tip cow leberkas tongue.'),
	new Comment(6, 'Jason Trkovsky', '2019-10-17', 'General', 'Pork loin doner turkey venison shankle tenderloin drumstick boudin sirloin tail ground round pastrami strip steak. Fatback short loin brisket, tail shoulder turkey strip steak ball tip beef kevin cow landjaeger. Brisket prosciutto spare ribs, pastrami frankfurter strip steak tail sirloin salami.'),
	new Comment(7, 'Patrick Griffith', '2019-10-01', 'General', 'Boudin pastrami sausage chuck, alcatra ham spare ribs fatback t-bone. Kevin filet mignon sausage ham rump, salami t-bone ball tip beef. '),
	new Comment(8, 'Jason Trkovsky', '2019-09-14', 'General', 'Chicken capicola andouille spare ribs. Corned beef tail leberkas pork chop chicken, sausage tongue. Tenderloin salami short loin, jerky boudin beef ribs beef landjaeger. Tail prosciutto brisket capicola ribeye biltong pancetta swine chicken filet mignon.'),
	new Comment(9, 'Jason Trkovsky', '2019-10-18', 'General', 'Bacon ipsum dolor amet tail ham hock frankfurter meatball. Sausage jowl rump, cow pork belly ground round tri-tip ham pancetta pork capicola kevin filet mignon bacon. Corned beef landjaeger swine, kielbasa pork boudin bacon doner pancetta venison leberkas short loin tongue. Ball tip drumstick t-bone jerky bresaola capicola pork chop porchetta strip steak tri-tip cow leberkas tongue.'),
	new Comment(10, 'Jason Trkovsky', '2019-10-17', 'General', 'Pork loin doner turkey venison shankle tenderloin drumstick boudin sirloin tail ground round pastrami strip steak. Fatback short loin brisket, tail shoulder turkey strip steak ball tip beef kevin cow landjaeger. Brisket prosciutto spare ribs, pastrami frankfurter strip steak tail sirloin salami.'),
	new Comment(11, 'Patrick Griffith', '2019-10-01', 'General', 'Boudin pastrami sausage chuck, alcatra ham spare ribs fatback t-bone. Kevin filet mignon sausage ham rump, salami t-bone ball tip beef. '),
	new Comment(12, 'Jason Trkovsky', '2019-09-14', 'General', 'Chicken capicola andouille spare ribs. Corned beef tail leberkas pork chop chicken, sausage tongue. Tenderloin salami short loin, jerky boudin beef ribs beef landjaeger. Tail prosciutto brisket capicola ribeye biltong pancetta swine chicken filet mignon.')
];