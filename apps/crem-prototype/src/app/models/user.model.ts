export class User {
    id : Number;
    username : String;
    firstName : String;
	lastName : String;
	preferredName : String;
	email : String;
	company : String;
	title : String;
	type : String;
	allowLogOn : Boolean;
	lastLoginDate : String;
	active : Boolean;
	authdata? : string;
	password : string;
	primaryGroup : string;
	role : string;
	fullName : string;

	constructor(id,username,firstName,lastName,preferredName,email,company,title,type,allowLogOn,lastLoginDate,active,authdata,password,primaryGroup,role) {
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.preferredName = preferredName;
		this.email = email;				
		this.company = company;
		this.title = title;
		this.type = type;
		this.allowLogOn = allowLogOn;
		this.lastLoginDate = lastLoginDate;
		this.active = active;
		this.authdata = authdata;
		this.password = password;
		this.primaryGroup = primaryGroup;
		this.role = role;
		this.fullName = firstName + ' ' + lastName;
	}
}

export let users : User[] = [
	new User(1, null, 'Jason', 'Trkovsky', null, 'jtrkovsky@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(11, null, 'Patrick', 'Griffith', null, 'pgriffith@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(3, null, 'Michael', 'Curtis', null, 'mcurtis@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(4, null, 'David', 'Green', null, 'dgreen@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(5, null, 'Dan', 'Galenkamp', null, 'dgalenkamp@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(6, null, 'Scott', 'Secor', null, 'ssecor@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(7, null, 'Melanie', 'Coggen', null, 'mcoggen@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(8, null, 'Rahim', 'Salaam', null, 'asalaam@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),
	new User(9, null, 'Matt Yu', 'Meng', null, 'mmeng@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,null, null, null),	
	new User(2,'vp_superuser','CoStar','Webinar','','lhagans@costargroup.com','RE Portfolio','','',true,'43907',true,null,null, null, null),
	new User(17,'cremanager','John','Hancock','Jack','mmcdonald@costargroup.com','ACME CORPORATION, INC.','Transaction Manager','Transaction Manager',true,'43907',true,null,null, null, null),
	new User(19,'bfranklin','Ben','Franklin','','none@costarremanager.com','RE Portfolio','','',false,'42894',true,null,null, null, null),
	new User(20,'','James','Roberts','Jim','jim.roberts2@bostonprop.comx','RE Portfolio','Senior Vice President','Broker','','',true,null,null, null, null),
	new User(21,'','Elyse','Giles','','','Regus','','','','',true,null,null, null, null),
	new User(23,'','Elyse','Test3','','','401 Brookfield LLC','','','','',true,null,null, null, null),
	new User(24,'tjefferson','Thomas','Jefferson','','tjefferson@vpmail.com','RE Portfolio','','',false,'41410',true,null,null, null, null),
	new User(28,'bross','Betsy','Ross','','','RE Portfolio','','',false,'41744',true,null,null, null, null),
	new User(31,'tmorton','Thad','Morton','','mmhobbs@costargroup.com','FASCO, Inc','','',true,'43446',true,null,null, null, null),
	new User(45,'ajackson','Andrew','Jackson','Andy','none@costarremanager.com','RE Portfolio','Director, Corporate Real Estate','VP, CRE',false,'41391',true,null,null, null, null),
	new User(51,'','Pasi','Riikonen','','pasi.riikonen@@sponda.fi','Sponda Oyj','Asiakkuuspäällikkö','Leasing Agent','','',true,null,null, null, null),
	new User(55,'vpclient','Admin','Client','','none@costarremanager.com','RE Portfolio','','',false,'41282',true,null,null, null, null),
	new User(59,'','Jennifer','Jones','','','WPC Corporate II, LLC','','','','',true,null,null, null, null),
	new User(61,'','Jennifer','Jones','','','RE Portfolio','','','','',true,null,null, null, null),
	new User(66,'gwashington','George','Washington','Mike','tjhaskett@costargroup.com','ACME CORPORATION, INC.','Vice President','VP, Relationship Manager',true,'43901',true,null,null, null, null),
	new User(70,'sadams','Samuel','Adams','','none@costargroup.com','RE Portfolio','','',true,'43356',true,null,null, null, null),
	new User(71,'gbutton','Button','Gwinnett','','gbuttton@vp.com','Wenck Associates, Inc. ','','',false,'41526',true,null,null, null, null),
	new User(78,'KFletcher','Fletcher','Kimbrough','','mkfletch54@hotmail.com','ACME Consumer Products','','',false,'42383',true,null,null, null, null),
	new User(80,'testuser','Paul','Revere','','ccooney@costargroup.com','ACME CORPORATION, INC.','','',false,'42216',true,null,null, null, null),
	new User(81,'','Ned','Walter','','nwalter@costargroup.com','ACME CORPORATION, INC.','','','','',true,null,null, null, null),
	new User(95,'ffurter','Frank','Smith','','pal@philiplee.com','Franklin Investment Group LLP','','',false,'41915',true,null,null, null, null),
	new User(111,'Kristin','Susan B','Anthony','','kristin.boyer@dtz.com','ACME CORPORATION, INC.','','',false,'43439',true,null,null, null, null),
	new User(113,'','Test','Rights','','aheredia@cosatrgroup.com','ACME Consumer Products','','','','',true,null,null, null, null),
	new User(114,'','test 2','edit','','','ACME CORPORATION, INC.','','','','',true,null,null, null, null),
	new User(115,'mwashington','Martha','Washington','','mmcdonald@costargroup.com','RE Portfolio','','',false,'42909',true,null,null, null, null),
	new User(119,'ahamilton','Alexander','Hamilton','','mmcdonald@costargroup.com','ACME Technology, LLC','','',false,'42835',true,null,null, null, null),
	new User(120,'nsabo','Frank','Adams','','NSabo@ngkf.com','ACME Consumer Products','','',false,'42469',true,null,null, null, null),
	new User(121,'Machell','Abigail','Adams','','machell.roller@na.ugllimited.com','ACME CORPORATION, INC.','','',false,'42368',true,null,null, null, null),
	new User(122,'htubman','Harriet','Tubman','','kellyclark@costargroup.com','ACME Consumer Products','','',false,'42638',true,null,null, null, null),
	new User(123,'nsalla','Jane','Doe','','neha.salla@mckesson.com','ACME CORPORATION, INC.','','',false,'42261',true,null,null, null, null),
	new User(158,'ssecor','Scott','Secor','','ssecor@costargroup.com','ACME Consumer Products','','',true,'43903',true,null,null, null, null),
	new User(167,'allan','Allan','B','','allan.brass@cushwake.com','ACME CORPORATION, INC.','','',false,'42437',true,null,null, null, null),
	new User(169,'Chris','Chris','P','','Chris.Potter@cassidyturley.com','ACME CORPORATION, INC.','','',false,'42550',true,null,null, null, null),
	new User(170,'Kelly','Kelly','K','','Kelly.Korpusik@cbre.com','ACME CORPORATION, INC.','','',false,'42447',true,null,null, null, null),
	new User(192,'pgriffith','Patrick','Griffith','','pgriffith@costargroup.com','ACME Consumer Products','','',true,'43900',true,null,null, null, null),
	new User(193,'greg','Greg','S','','greg.schementi@cushwake.com','ACME CORPORATION, INC.','','',false,'',true,null,null, null, null),
	new User(194,'cwdemo','CW','Demo','','mitchell.wickland@dtz.com','ACME CORPORATION, INC.','','',false,'42617',true,null,null, null, null),
	new User(195,'JDeere','John','Deere','','tjhaskett@costargroup.com','FASCO, Inc','','',false,'42545',true,null,null, null, null),
	new User(196,'sap','sample user','sample user','','pgriffith@costar.com','ACME Consumer Products','','',true,'',true,null,null, null, null),
	new User(202,'','Alexis','Konopisos','','Alexis.Konopisos@cbre.com','CBRE','Senior Real Estate Manager','Property Manager','','',true,null,null, null, null),
	new User(204,'','Mark','Sweeney','','msweeney@ableserve.com','ABC Associates','','','','',true,null,null, null, null),
	new User(205,'','Mark','Sweeney','','msweeney@ableserve.com','Able Engineering Services','','','','',true,null,null, null, null),
	new User(206,'','Rodney','Blocker','','duluth.satellitepl@regus.com','Regus Executive Suites','','','','',true,null,null, null, null),
	new User(207,'dang','Jeff','Blasbalg','','jblasbalg@costar.com','Acme Technology, LLC','','',true,'43874',true,null,null, null, null),
	new User(208,'','Kristin','B','','kristin@myname.com','Kristin Co.','','','','',true,null,null, null, null),
	new User(209,'bbutton','Belly','Butt','','bbutton@youtube.com','ACME CORPORATION, INC.','','',false,'',true,null,null, null, null),
	new User(211,'lringle2','Louie_Test','Ingle_Test','','lingle@costargroup.com','ACME CORPORATION, INC.','','',true,'',true,null,null, null, null),
	new User(212,'Tim','Tim','H','','thaskett@costargroup.com','ACME CORPORATION, INC.','','',false,'42656',true,null,null, null, null),
	new User(213,'','David','Perown','','dave@cbre.com','CBRE','','','','',true,null,null, null, null),
	new User(215,'vhenry','Victor','Henry','','secor21@gmail.com','Accesso Partners LLC','','',false,'',true,null,null, null, null),
	new User(216,'barbara','Barbara','E','','barbara.elia@cushwake.com','ACME CORPORATION, INC.','','',false,'43305',true,null,null, null, null),
	new User(217,'','TT','Frank','','test@tac.om','401 Brookfield LLC','','','','',true,null,null, null, null),
	new User(218,'dangg','daniel','galenkamp','','dan@galenkamp.com','CoStar Real Estate Manager - (Group)','','',true,'43900',true,null,null, null, null),
	new User(219,'Ccooney111','Chris','Cooney','','ccooney@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43893',true,null,null, null, null),
	new User(220,'MWaters','Matt','Waters','','matthewtwaters@gmail.com','CoStar Real Estate Manager - (Group)','','',false,'42835',true,null,null, null, null),
	new User(221,'','PG Test','Test','','pgriffith@email.com','ACME Consumer Products - View Only','','','','',true,null,null, null, null),
	new User(225,'CSTRTestDV','CSTR','TestDV','','dweitz@costargroup.com','CoStar Real Estate Manager - (Group)','','',false,'42838',true,null,null, null, null),
	new User(226,'pgriffith2','Sample user','griffith','','patrickgrif+1@gmail.com','Acme Consumer, LLC.','','',false,'42843',true,null,null, null, null),
	new User(227,'cindy','Cindy','M','','cmitchell@jacksoncooksey.com','ACME CORPORATION, INC.','','',false,'43501',true,null,null, null, null),
	new User(228,'GPerrine','Gerry','Perrine','','gperrine@costar.com','ACME Consumer Products','','',true,'43678',true,null,null, null, null),
	new User(229,'kangaroo','captain','kangaroo','','cap@kangaroo.com','CoStar Real Estate Manager - (Group)','','',false,'',true,null,null, null, null),
	new User(233,'Kathleen','Kathleen','P','','Kathleen.Pierce@cushwake.com','ACME CORPORATION, INC.','','',false,'43220',true,null,null, null, null),
	new User(234,'Sucharita','Sucharita','R','','Sucharita.Raman@cbre.com','ACME CORPORATION, INC.','','',false,'42993',true,null,null, null, null),
	new User(235,'Libra','Libra','B','','Libra.Burress@cbre.com','ACME CORPORATION, INC.','','',false,'43080',true,null,null, null, null),
	new User(236,'Tomasz','Tomasz','K','','Tomasz.krol@eu.jll.com','ACME CORPORATION, INC.','','',false,'43299',true,null,null, null, null),
	new User(237,'Mateusz','Mateusz','W','','Mateusz.wujec@eu.jll.com','ACME CORPORATION, INC.','','',false,'43299',true,null,null, null, null),
	new User(238,'webinar1','Brooks','Webinar','','hdavis@costarremanager.com','ACME Consumer Products','','',false,'42941',true,null,null, null, null),
	new User(239,'will724','w','w','','will+724@artificers.net','CoStar Real Estate Manager - (Group)','','',false,'42940',true,null,null, null, null),
	new User(240,'will725','will','will','','will+725@artificers.net','CoStar Real Estate Manager - (Group)','','',false,'42942',true,null,null, null, null),
	new User(243,'vp_servicecheck','DONOTDELETE','ServiceCheck','','plee@costargroup.com','CoStar Real Estate Manager - (Group)','','',false,'43011',true,null,null, null, null),
	new User(250,'swhite@costargroup.com','Scott','White','','swhite@costargroup.com','ACME Consumer Products','','',true,'43168',true,null,null, null, null),
	new User(251,'ryder','Ryder','Training','','jdykes@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43216',true,null,null, null, null),
	new User(252,'Steve','Stephen','Miller','','StephenD.Miller@am.jll.com','ACME CORPORATION, INC.','','',false,'43276',true,null,null, null, null),
	new User(253,'Matt','Matt','Westwood','','Matthew.Westwood@am.jll.com','ACME CORPORATION, INC.','','',false,'43299',true,null,null, null, null),
	new User(255,'costar_templates','Admin','Templates','','ccooney@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43298',true,null,null, null, null),
	new User(261,'Ross_Training','Ross','Training','','jluna@costargroup.com','ACME Consumer Products','','',true,'43571',true,null,null, null, null),
	new User(262,'rsinghal','Rahul','Singhal','','aa','ACME Financial, LLC','','',false,'',true,null,null, null, null),
	new User(263,'rsinghal3','Rahul','Singhal','','rahul','ACME Consumer Products','','',false,'',true,null,null, null, null),
	new User(264,'','Brian','Gary','','bgary@costarremanager.com','1001 West Loop, LP','','','','',true,null,null, null, null),
	new User(266,'agomez','Avi','Gomez','','mhurtado@costargroup.com','ACME Financial, LLC','','',true,'43713',true,null,null, null, null),
	new User(271,'testadmin123','Test','Admin','','blank@costardemo.com','CoStar Real Estate Manager - (Group)','','',true,'43304',true,null,null, null, null),
	new User(272,'testUser1','Test User','Help Desk','','hdavis@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(274,'vshah95','Vanessa','Ghasemshahi','','vghasemshahi@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43357',true,null,null, null, null),
	new User(276,'jb4932','Jon','Barker','','jbarker@costar.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(277,'mkrantz@costargroup.com','Mark','Krantz','','mkrantz@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(278,'','Rahul','s','','','401 Brookfield LLC','','','','',true,null,null, null, null),
	new User(279,'','Rahul','S','','r','1001 West Loop, LP','','','','',true,null,null, null, null),
	new User(280,'','Raahul','s','','r','1001 West Loop, LP','','','','',true,null,null, null, null),
	new User(281,'nparker','Nate','Parker','','nparker@costargroup.com','Acme Technology, LLC','','',true,'43347',true,null,null, null, null),
	new User(282,'sapplegarth','Scott','Applegarth','','sapplegarth@costar.com','ACME Consumer Products','','',true,'43390',true,null,null, null, null),
	new User(284,'anguyen','Anthony','Nguyen','','anguyen@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(286,'','Test FN','Test LN','','test@test.com','American Broker Company','','','','',true,null,null, null, null),
	new User(287,'kkepley','Kelly','Kepley','','kkepley@costargroup.com','ACME CORPORATION, INC.','','',true,'43812',true,null,null, null, null),
	new User(299,'rgtest','Rebecca','Glasser','','rglasser@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(301,'adugar','Aditi','Dugar','','mmcdonald@costargroup.com','ACME CORPORATION, INC.','','',true,'43437',true,null,null, null, null),
	new User(302,'','CoStarFN','CoStarLN','','costar@test.com','1001 West Loop, LP','','','','',true,null,null, null, null),
	new User(303,'landerson@rgp.com','Lynn','Anderson','','landerson@rgp.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(304,'sbranch','Sara','Branch','','sbranch@Costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43580',true,null,null, null, null),
	new User(305,'bgary','Brian','Gary','','bgary@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(306,'mponciano','Miriam','Ponciano','','mponciano@costar.com','ACME CORPORATION, INC.','','',true,'43522',true,null,null, null, null),
	new User(307,'','my first','my last','','me@mail.com','ABC Associates','','','','',true,null,null, null, null),
	new User(308,'','dan','galenkamp','','none@costar.com','Christmas Creations','','','','',true,null,null, null, null),
	new User(309,'khanson','Kevin','Hanson','','khanson@costar.com','CoStar Real Estate Manager - (Group)','','',true,'43523',true,null,null, null, null),
	new User(310,'IHarpley','Irma','Harpley','','irma.rovaite-harpley@redcross.org','ACME CORPORATION, INC.','','',true,'',true,null,null, null, null),
	new User(311,'DDavis','Dana','Davis','','dana.davis4@redcross.org','ACME CORPORATION, INC.','','',true,'43558',true,null,null, null, null),
	new User(312,'JWard','Joe','Ward','','joe.ward@redcross.org','ACME CORPORATION, INC.','','',true,'43565',true,null,null, null, null),
	new User(313,'CSmith','Cheri','Smith','','cheri.smith@redcross.org','ACME CORPORATION, INC.','','',true,'43558',true,null,null, null, null),
	new User(314,'CStevens','Corey','Stevens','','corey.stevens@redcross.org','ACME CORPORATION, INC.','','',true,'43530',true,null,null, null, null),
	new User(315,'LAmbalong','Linda','Ambalong','','linda.ambalong@redcross.org','ACME CORPORATION, INC.','','',true,'',true,null,null, null, null),
	new User(316,'DHaufler','Debra','Haufler','','debra.haufler@redcross.org','ACME CORPORATION, INC.','','',true,'43556',true,null,null, null, null),
	new User(318,'sbeasley','Seirra','Beasley','','sbeasley@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(319,'andrew.hamilton','Andrew','Hamilton','','ahamilton@costargroup.com','ACME CORPORATION, INC.','','',true,'43549',true,null,null, null, null),
	new User(320,'kbrundidge','Kimberly','Brundidge','','kbrundidge@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43642',true,null,null, null, null),
	new User(321,'JT','J','T','','jtodd@costargroup.com','ACME Consumer Products','','',true,'43565',true,null,null, null, null),
	new User(322,'PBeesly','Pamela','Beesly','','sbranch@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43903',true,null,null, null, null),
	new User(323,'JWatson','Joan','Watson','','kbrundidge@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43642',true,null,null, null, null),
	new User(324,'adeist','art','Deist','','art.deist@redcross.org','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(325,'RTest','Ross','Ta.','','rtarantino@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43605',true,null,null, null, null),
	new User(326,'RigorTest','Rigor','Test','','plee@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43679',true,null,null, null, null),
	new User(327,'','PG Test contact first','last name 1234567890!@#$%^&*(','','','401 Brookfield LLC','','','','',true,null,null, null, null),
	new User(328,'ejupiter','Elyse','Jupiter','','elyse817@gmail.com','CoStar Real Estate Manager - (Group)','','',true,'43864',true,null,null, null, null),
	new User(330,'AnneMartinez','Anne','Martinez','','annemartinez@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(331,'sdsmith','Stephanie','S','','sdsmith@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43658',true,null,null, null, null),
	new User(332,'JoeD','Joe','D','','jdumovich@askpsg.com','ACME Consumer Products','','',true,'43647',true,null,null, null, null),
	new User(333,'777','David','Perrins','','dperrins@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(334,'vp_jenny','Niranjani','Natarajan','','nnatarajan@costar.com','ACME Technology, LLC','','',true,'43656',true,null,null, null, null),
	new User(335,'scannan','Stacy','Cannan','','scannan@costargroup.com','ACME Consumer Products','','',true,'43656',true,null,null, null, null),
	new User(336,'jturner','Jason','Turner','','jlturner@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(337,'mcoggen','Melanie','Coggen','','mcoggen@costarremanager.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(338,'tnjohnson','Tyler','Johnson','','tnjohnson@costar.com','ACME Consumer Products','','',true,'43661',true,null,null, null, null),
	new User(339,'kbouban','Khalil','Bouban','','kbouban@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43808',true,null,null, null, null),
	new User(340,'Dweitz99','Davis','Weitz','','dweitz@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(342,'CMabry','Carole','Mabry','','cmabry@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43739',true,null,null, null, null),
	new User(343,'bstark@costargroup.com','Ben','Stark','','bstark@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(344,'anarayan1','Adhiti','Narayan','','adhiti.narayan@gmail.com','CoStar Real Estate Manager - (Group)','','',true,'43733',true,null,null, null, null),
	new User(345,'dkoerschner','Dave','Koerschner','','dkoerschner@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43906',true,null,null, null, null),
	new User(346,'M5641389','Mark','Krantz','','mkrantz@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(347,'rnovelo','Robin','Novelo','','rnovelo@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(348,'Clifford','Clifford','Rhymes','','crhymes@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43791',true,null,null, null, null),
	new User(349,'kcarpenter','Kent','Carpenter','','kcarpenter@costarremanager.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(350,'99999','John','Balmforth','','jbalmforth@costarremanager.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(351,'Connorlh','Connor','Harmsworth','','charmsworth@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(352,'DM','D','M','','dmclaughlin@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(353,'R0195835','Robert','Flick','','rflick@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43656',true,null,null, null, null),
	new User(354,'TestUser_Hima','Hima','','','hkallepalli@costar.com','ACME Technology, LLC','','',true,'43692',true,null,null, null, null),
	new User(355,'mbui2','Michael','Bui','','mbui@costargroup.com','ACME Consumer Products','','',true,'43656',true,null,null, null, null),
	new User(356,'soj721','Seth','Jacob','','sjacob@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(357,'jlee','Joseph','Lee','','jlee@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43672',true,null,null, null, null),
	new User(358,'mezra','Mark','Ezra','','mezra@costar.com','CoStar Real Estate Manager - (Group)','','',true,'43885',true,null,null, null, null),
	new User(359,'','Henry','Winkler','','thefonz@home.com','Acme Technology, LLC','','','','',true,null,null, null, null),
	new User(360,'sbeasley1','Seirra','Beasley','','sbeasley@gmail.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),
	new User(362,'jtestuser','Jeffrey','TestUser','','jtodd@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43756',true,null,null, null, null),
	new User(363,'','CK','Kucsera','','ckucsera@costargroup.com','**Filler Vendor','','','','',true,null,null, null, null),
	new User(364,'jdivittorio','Joe','Di Vittorio','','jdivittorio@costar.com','CoStar Real Estate Manager - (Group)','','',true,'43768',true,null,null, null, null),
	new User(365,'PRODISSUES','PROD','Issue','','TESTEMAIL@GMAIL.COM','ABC Associates','','',true,'',true,null,null, null, null),
	new User(366,'PRODISSUES2','PROD','ISSUES2','','TESTEMAIL2@AOL.COM','ABC LLC','','',true,'',true,null,null, null, null),
	new User(369,'jbarron','Justin','Barron','','jbarron@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43880',true,null,null, null, null),
	new User(370,'artest','ARTEST','ARTEST','','arahman@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'43894',true,null,null, null, null),
	new User(371,'epull','Evan','Test','','epull@costargroup.com','CoStar Real Estate Manager - (Group)','','',true,'',true,null,null, null, null),

];
