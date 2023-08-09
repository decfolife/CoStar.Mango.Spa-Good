export class Building {
    systemBuildingID : Number;
	buildingName : String;
	address1 : String;
	address2 : String;
	city : String;
	state : String;
	zipCode : String;
	country : String;
	ownershipType : String;
	buildingType : String;	
	buildingHierarchy : String;
	portfolio : String;
	buildingRentableArea : String;
	buildingUsableArea : String;
	buildingMeasureUnits : String;
	landSize_Acres : String;
	annualOpEx : String;
	annualTaxes : String;
	yearBuilt : String;
	purchasePrice : String;
	constructionType : String;
	currencyType : String;
	marketRent_PSF_YR : String;
	parkingRate : String;
	parkingRatio_PerK : String;
	latitude : String;
	longitude : String;
	estimatedRent: String;
	market: String;
	subMarket: String;
	starRating: String;
	parcel: String;
	primaryLeasing: String;
	vacancy: String;

	constructor(systemBuildingID,buildingName,address1,address2,city,state,zipCode,country,ownershipType,buildingType,buildingHierarchy,
		portfolio,buildingRentableArea,buildingUsableArea,buildingMeasureUnits,landSize_Acres,annualOpEx,annualTaxes,yearBuilt,purchasePrice,
		constructionType,currencyType,marketRent_PSF_YR,parkingRate,parkingRatio_PerK,latitude,longitude, estimatedRent, market, subMarket,
		starRating, parcel, primaryLeasing, vacancy) {
		this.systemBuildingID = systemBuildingID;
		this.buildingName = buildingName;
		this.address1 = address1;
		this.address2 = address2;
		this.city = city;
		this.state = state;
		this.zipCode = zipCode;
		this.country = country;
		this.ownershipType = ownershipType;
		this.buildingType = buildingType;
		this.buildingHierarchy = buildingHierarchy;
		this.portfolio = portfolio;
		this.buildingRentableArea = buildingRentableArea;
		this.buildingUsableArea = buildingUsableArea;
		this.buildingMeasureUnits = buildingMeasureUnits;
		this.landSize_Acres = landSize_Acres;
		this.annualOpEx = annualOpEx;
		this.annualTaxes = annualTaxes;
		this.yearBuilt = yearBuilt;
		this.purchasePrice = purchasePrice;
		this.constructionType = constructionType;
		this.currencyType = currencyType;
		this.marketRent_PSF_YR = marketRent_PSF_YR;
		this.parkingRate = parkingRate;
		this.parkingRatio_PerK = parkingRatio_PerK;
		this.latitude = latitude;
		this.longitude = longitude;
		this.estimatedRent = estimatedRent;
		this.market = market;
		this.subMarket = subMarket;
		this.starRating = starRating;
		this.parcel = parcel;
		this.primaryLeasing = primaryLeasing;
		this.vacancy = vacancy;
	}
}

export let buildings : Building[] = [
    new Building(627,"Phipps Tower","3438 Peachtree Rd NE","Upper Buckhead Submarket","Atlanta","GA","30326","United States","Leased","Office","North America","RE Portfolio","25200","","SF","","","","","","","USD","","","","","","Estimated","Atlanta","Upper Buckhead","5","","","120362"),
    new Building(628,"33 Arch Street","33 Arch Street","Suite 3300","Boston","MA","2110","United States","Leased","Office","North America","RE Portfolio","25200","","SF","","","","","","","USD","","","","","","Estimated","Boston","Boston/Suffolk County","5","","","120362"),
    new Building(633,"1177 Avenue of the Americas","1177 Avenue of the Americas","43rd Floor","New York","NY","10036","United States","Leased","Office","North America","RE Portfolio","11644","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(638,"312 Walnut Street","312 Walnut Street","","Cincinnati","OH","45202","United States","Leased","Office","North America","RE Portfolio","1","","","","","","","","","","","","","","","","","","","","",""),
    new Building(639,"6100 Oaktree Blvd.","6100 Oaktree Blvd.","","Independence","OH","44131","United States","Leased","Office","North America","RE Portfolio","1","","","","","","","","","","","","","","","","","","","","",""),
    new Building(640,"7120 Samuel Morse Drive","7120 Samuel Morse Drive","Crestpointe Corporate Center","Columbia","MD","21046","United States","Leased","Office","North America","RE Portfolio","33371","","","","","","","","","","","","","","","","","","","","",""),
    new Building(646,"1300 Post Oak Blvd.","1300 Post Oak Blvd.","Suite 1545","Houston","TX","77056","United States","Leased","Office","North America","RE Portfolio","480759","","SF","","","","","","","USD","","","","","","Actual","Houston","West Loop","4","","","145194"),
    new Building(648,"1735 Market Street","1735 Market Street","","Philadelphia","PA","19103","United States","Leased","Office","North America","RE Portfolio","3896","","","","","","","","","","","","","","","","","","","","",""),
    new Building(650,"12100 Sunrise Valley Drive","12100 Sunrise Valley Drive","","Reston","VA","20191","United States","Leased","Office","North America","RE Portfolio","970","","","","","","","","","","","","","","","","","","","","",""),
    new Building(660,"1331 L Street","1331 L Street NW","","Washington","DC","20005","United States","Leased","Office","North America","RE Portfolio","149514","169249","SF","N/A","2631232","1296132","2008","101000000","Reinforced Concrete","USD","","","0","N/A","N/A","","Washington","Downtown DC","5","","",""),
    new Building(662,"2000 McKinney Avenue","2000 McKinney Avenue","","Dallas","TX","75201","United States","Leased","Office","North America","RE Portfolio","4491","","","","","","","","","","","","","","","","","","","","",""),
    new Building(663,"2530 Meridian Parkway","2530 Meridian Parkway","","Durham","NC","27713","United States","Leased","Office","North America","RE Portfolio","1","","","","","","","","","","","","","","","","","","","","",""),
    new Building(671,"82 Avenue Marceau","82 Avenue Marceau","","Paris","France","75008","France","Leased","Office","Europe","RE Portfolio","185","","SF","","","","","","","EUR","","","","","","","","","","","",""),
    new Building(672,"40 Portman Square","40 Portman Square","","London","UK","W1H 6LT","United Kingdom","Leased","Office","North America","RE Portfolio","10972","","","","","","","","","","","","","","","","","","","","",""),
    new Building(674,"7733 Forsyth Blvd.","7733 Forsyth Blvd.","","St. Louis","MO","63105","United States","Leased","Office","North America","RE Portfolio","1","","","","","","","","","","","","","","","","","","","","",""),
    new Building(676,"7990 Science Application Court","7990 Science Applications Court","","Vienna","VA","22182","United States","Leased","Other","North America","RE Portfolio","1","","","","","","","","","","","","","","","","","","","","",""),
    new Building(678,"529 Bryant Street","529 Bryant Street","","Palo Alto","CA","94301","United States","Leased","Other","North America","RE Portfolio","1","","","","","","","","","","","","","","","","","","","","",""),
    new Building(681,"2325 East Camelback Road","2325 East Camelback Road","Suite 110","Phoenix","AZ","85016","United States","Leased","Office","North America","RE Portfolio","4112","","SF","","","","","","","USD","","","",""," ","Actual","Phoenix","East Phoenix","5","","","104612"),
    new Building(682,"3438 Peachtree Road","3438 Peachtree Road, NE","","Atlanta","GA","30326","United States","Leased","Office","North America","RE Portfolio","82005","","SF","2.96","N/A","N/A","2010","N/A","Reinforced Concrete","USD","","23605385","b682@costar.costarremail.com","33.8527529","-84.366233","Estimated","Atlanta","Buckhead","5","","","26093"),
    new Building(683,"4115 Broad Street","4115 Broad Street","Suite B-1","San Luis Obispo","CA","93401","United States","Leased","Office","North America","RE Portfolio","2500","","","","","","","","","","","","","","","","","","","","",""),
    new Building(684,"8910 University Center Lane","8910 University Center Lane","The Aventine -Suite 300","San Diego","CA","92122","United States","Leased","Office","North America","RE Portfolio","29786","","SF","","","","","","","USD","","","","","","Estimated","San Diego","North San Diego","4","","","49623"),
    new Building(686,"3161 Michelson Drive","3161 Michelson Drive","Suite 1675","Irvine","CA","92612","United States","Leased","Office","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(687,"1450 Brickell Ave.","1450 Brickell Ave.","5th Floor Loft","Miami","FL","33131","United States","Leased","Office","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Miami","Brickell","5","","","53500"),
    new Building(691,"151 Yonge Street","151 Yonge Street","11th Floor","Toronto","ON","M5C 2W7","Canada","Leased","Office","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(692,"10200 Forest Green Blvd","10200 Forest Green Blvd Suite 112","","Louisville","KY","40223","United States","Leased","Office","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(694,"One Piemonte","901 Via Piemonte","Suite 450","Ontario","CA","91764","United States","Leased","","North America","RE Portfolio","121601","","SF","","","","","","","USD","","","","","","Actual","Inland Empire","Inland Empire West","4","","","5456"),
    new Building(696,"3333 Piedmont Road","3333 Piedmont Road, NE","Suite 200","Atlanta","GA","30305","United States","Leased","","North America","RE Portfolio","1","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(697,"1 Marsden Street","1 Marsden Street","12th Floor","Manchester","UK","M2 1HW","United Kingdom","","Office","Europe","RE Portfolio","","","SF","","","","","","","GBP","","","","","","","Manchester","Manchester CBD","4","","",""),
    new Building(2741,"100 Congress Avenue","100 Congress Avenue","Suite 1500","Austin","TX","78701","United States","Leased","Office","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Austin","CBD","4","","","62971"),
    new Building(2742,"101 California Street","101 California Street","Suite 4300","San Francisco","CA","94111","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","San Francisco","SF Downtown Core","5","","","332254"),
    new Building(2743,"LOS ANGELES 777 S. Figueroa Street","777 S. Figueroa Street","Suite 5000","Los Angeles","CA","90017","United States","","","North America","RE Portfolio","1024834","","SF","","","","","","","USD","","","","","","Actual","Los Angeles","Downtown Los Angeles","5","","","180704"),
    new Building(2744,"1225 17th Street","1225 17th Street","Suite 2150","Denver","CO","80202","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Denver","Downtown","5","","","188144"),
    new Building(2745,"15 Southlake Lane","15 Southlake Lane","","Birmingham","AL","35244","United States","Leased","Office","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2749,"180 N. Riverview Dr.","180 N. Riverview Dr.","","Anaheim","CA","92808","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2751,"1633 Bayshore Hwy S338","1633 Bayshore Hwy S338","","Burlingame","CA","94010","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2752,"10525 E. 40th Ave.","10525 E. 40th Ave.","","Denver","CO","80239","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2753,"804","10175 Fortune Pkwy.","","Jacksonville","FL","32256","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2755,"401 N. Wickham Rd.","401 N. Wickham Rd.","","Melbourne","FL","32940","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2756,"225 S. Westmonte Dr.","225 S. Westmonte Dr.","","Altamonte Springs","FL","32714","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2757,"2 Sun Ct.","2 Sun Ct.","","Norcross","GA","30092","United States","Leased","Office","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2759,"15301 W. 87th Pkwy.","15301 W. 87th Pkwy","","Lenexa","KS","66219","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2762,"222 Forbes Rd.","222 Forbes Rd.","","Braintree","MA","2184","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2763,"7100 Northland Circle","7100 Northland Circle","","Brooklyn Park","MN","55428","United States","Leased","Office","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2766,"140 Southcenter Ct.","140 Southcenter Ct.","","Morrisville","NC","27560","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2767,"A Oak Hill Dr.","2401-A Oak Hill Dr.","","Greensboro","NC","27408","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2768,"C Ramsey St.","5843-C Ramsey St.","","Fayetteville","NC","28311","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2769,"205 Regency Executive Park Dr.","205 Regency Executive Park Dr.","","Charlotte","NC","28217","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2770,"4037 Masonboro Loop Rd.","4037 Masonboro Loop Rd.","","Wilmington","NC","28409","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2772,"7 Cedar Grove Lane","7 Cedar Grove Lane","","Somerset","NJ","8873","United States","Leased","Office","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2774,"Bank 2 Tower","Bank 2 Tower","909 S Meridian Ave","Oklahoma City","OK","73108","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2775,"8138 S. 107th E. Ave.","8138 S. 107th E. Ave.","","Tulsa","OK","74133","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2776,"666 Washington Rd.","666 Washington Rd.","","Pittsburgh","PA","15228","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2778,"4500 Leeds Ave.","4500 Leeds Ave.","","Charleston","SC","29405","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2785,"2500 Tanglewilde St.","2500 Tanglewilde St.","","Houston","TX","77063","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2786,"2420 Tarpley St.","2420 Tarpley Rd.","","Carrollton","TX","75006","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2796,"513 E. Blanco Rd.","513 E. Blanco Rd.","","Boerne","TX","78006","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2798,"621 Capitol Mall","621 Capitol Mall","Suite 2550","Sacramento","CA","95814","United States","Leased","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Sacramento","Sacramento County","5","","","67968"),
    new Building(2812,"101 South Tryon Street","101 South Tryon Street","Suite 2570","Charlotte","NC","28280","United States","Leased","Office","North America","RE Portfolio","816692","","SF","","","","","","","USD","","","","","","Actual","Charlotte","CBD","4","","","481055"),
    new Building(2813,"4601 Locust Lane","4601 Locust Lane","","Harrisburg","PA","","United States","Leased","Office","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2814,"600 Campus Drive","600 Campus Drive","Suite 140","Florham Park","NJ","7932","United States","Leased","Office","North America","RE Portfolio","105595","","SF","","","","","","","USD","","","","","","Estimated","Northern New Jersey","Morristown Area","4","","","6013"),
    new Building(2815,"1 Chapel Place","1 Chapel Place","W1G OBG","London","UK","","United Kingdom","Leased","Office","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2817,"717 Green Valley Road","717 Green Valley Road","","Greensboro","NC","27408","United States","Leased","Office","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2818,"60 South Sixth Street","60 South Sixth Street","RBC Plaza - Suite 2460","Minneapolis","MN","55402","United States","Leased","Office","North America","RE Portfolio","609368","","SF","","","","","","","USD","","","","","","Actual","Minneapolis","Minneapolis CBD","4","","","217352"),
    new Building(2820,"222 SW Columbia Street","222 SW Columbia Street","Suite 1550","Portland","OR","97201","United States","Leased","Office","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Portland","CBD","4","","","163842"),
    new Building(2822,"Calle De Serrano 47","Calle De Serrano 47","13th Floor","Madrid","Spain","28001","Spain","","Office","Europe","RE Portfolio","","","SF","","","","","","","EUR","","","","","","","","","","","",""),
    new Building(2823,"Two Hannover Square","434 Fayetteville Street","Suite 2110","Raleigh","NC","27601","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Raleigh","Raleigh","4","","","106767"),
    new Building(2824,"10 Almaden Boulevard","10 Almaden Boulevard","Suite 950","San Jose","CA","95113","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2825,"625 Liberty Ave","625 Liberty Avenue","Suite 1170","Pittsburgh","PA","15222","United States","","","North America","RE Portfolio","615942","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2826,"101 S Hanley Rd","101 S. Hanley Road","Suite 1300","Clayton","MO","63105","United States","","","North America","RE Portfolio","360505","","SF","","","","","","","USD","","","","","","Actual","Saint Louis","Central County","4","","","112914"),
    new Building(2827,"300 S Orange Ave","300 S Orange Avenue","Suite 1375","Orlando","FL","32801","United States","","","North America","RE Portfolio","245457","","SF","","","","","","","USD","","","","","","Estimated","Orlando","Downtown","5","","","26175"),
    new Building(2828,"424 Church Street","424 Church Street","Suite 1740","Nashville","TN","37219","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2829,"79 Wellington Street","79 Wellington Street","Suite 1610","Toronto","ON","M5K 1B1","Canada","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2830,"101 E Kennedy Blvd","101 E Kennedy Blvd","Suite 1845","Tampa","FL","33602","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Estimated","Tampa","Central Tampa","5","","","85026"),
    new Building(2831,"1010 Washington Blvd","1010 Washington Blvd","6th Floor","Stamford","CT","6901","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2832,"150 W Main St","150 W Main St","Suites 1510, 1550 & 1740","Norfolk","VA","23510","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Norfolk","Southside","5","","","24997"),
    new Building(2833,"215 South State Street","215 South State Street","Suite 525","Salt Lake City","UT","84111","United States","","","North America","RE Portfolio","190415","","SF","","","","","","","USD","","","","","","Actual","Salt Lake City","CBD","4","","","77884"),
    new Building(2834,"3930 Howard Hughes","3930 Howard Hughes","Suite 100","Las Vegas","NV","89169","United States","Leased","Office","North America","RE Portfolio","89174","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2835,"4801 Main Street","4801 Main Street","Suite 300","Kansas City","MO","64112","United States","","","North America","RE Portfolio","283774","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2836,"221 East Fourth Street","221 East Fourth Street","Suite 2260","Cincinnati","OH","45202","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Cincinnati","Cincinnati","4","","","83323"),
    new Building(2837,"395 North Service Road","395 North Service Road","Suite 108E","Melville","NY","11747","United States","","","North America","RE Portfolio","191649","","SF","","","","","","","USD","","","","","","Actual","Long Island","Suffolk","4","","","31195"),
    new Building(2838,"411 E Wisconsin Ave","411 E Wisconsin Ave","Suite 2299","Milwaukee","WI","53202","United States","","","North America","RE Portfolio","693126","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2839,"10 West Market Street","10 West Market Street","Suite 810","Indianapolis","IN","46204","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Indianapolis","Downtown","4","","","132352"),
    new Building(2840,"10 West","8000 IH-10 West","Suite 207","San Antonio","TX","78230","United States","","","North America","RE Portfolio","277115","","SF","","","","","","","USD","","","","","","Actual","San Antonio","Northwest","4","","","50250"),
    new Building(2841,"500 E Broward","500 E Broward","Suite 1160","Ft Lauderdale","FL","33394","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2843,"10 West Broad Street","10 West Broad Street","Suite 750","Columbus","OH","43215","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Columbus ","Columbus Central","4","","","121674"),
    new Building(2844,"3000 Town Center","3000 Town Center","Suite 2340","Southfield","MI","48075","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Detroit","Southfield","5","","","35516"),
    new Building(2845,"1301 Second Avenue","1301 Second Avenue","Suite 1910","Seattle","WA","98101","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Estimated","Seattle","Downtown Seattle","5","","","90914"),
    new Building(2846,"501 South 5th Street","501 South 5th Street","","Richmond","VA","23219","United States","Leased","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","Richmond","Downtown","5","","",""),
    new Building(2847,"CLEVELAND 600 Superior Avenue East","600 Superior Avenue East","Suite 1310","Cleveland","OH","44114","United States","","","North America","RE Portfolio","508397","","SF","","","","","","","USD","","","","","","Actual","Cleveland","Downtown Cleveland","4","","","146849"),
    new Building(2848,"750 N. Saint Paul Street","750 N. Saint Paul Street","Suite 2000","Dallas","TX","75201","United States","","","North America","RE Portfolio","273217","","SF","","","","","","","USD","","","","","","Actual","Dallas-Fort Worth","Dallas CBD","4","","","128039"),
    new Building(2850,"227 Broadway","227 Broadway","Suite 300","Santa Monica","CA","90401","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2851,"3350 161st Avenue SE","3350 161st Avenue SE","2nd Floor","Bellevue","WA","98008","United States","Leased","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2852,"75 South Clinton Avenue","75 South Clinton Avenue","Suite 720","Rochester","NY","14604","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Rochester","Rochester CBD","4","","","86985"),
    new Building(2853,"8 Cherry Street","12th Floor - Bank House - 8 Cherry Street","","Birmingham","UK","B2 5AL","United Kingdom","","Office","Europe","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Birmingham","Birmingham CBD","3","","","7137"),
    new Building(2854,"Str. 30","Ingeborg-Krummer-Schroth-Str. 30","","Freiburg im Breisgau","Germany","79108","Germany","","Office","Europe","RE Portfolio","","","SF","","","","","","","EUR","","","","","","","","","","","",""),
    new Building(2856,"An der Welle 4","An der Welle 4","","Frankfurt am Main","Hessen","60322","Germany","","Office","Europe","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2858,"7 Stratford Place","7 Stratford Place","","London","UK","W1C 1AY","United Kingdom","Leased","Office","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2859,"1020 Wilshire Blvd","1020 Wilshire Blvd","","Santa Monica","CA","90401","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2861,"16501 Ventura Blvd","16501 Ventura Blvd","","Encino","CA","91436","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2862,"888 Prospect Street","888 Prospect Street","","La Jolla","CA","92037","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2864,"VANCOUVER 885 West Georgia Street","885 West Georgia Street","","Vancouver","BC","V6C 3E8","Canada","","","North America","RE Portfolio","","","SF","","","","","","","CAD","","","","","","","","","","","",""),
    new Building(2865,"32 London Bridge Street","The Shard","32 London Bridge Street","London","","SE1 9SG","United Kingdom","","Office","Europe","RE Portfolio","","","SF","","","","","","","GBP","","","","","","Actual","London","London Southbank","5","","","105598"),
    new Building(2869,"3303 Monte Villa Parkway","3303 Monte Villa Parkway","","Bothell","WA","98021","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2871,"11177 Reading Road","11177 Reading Road","","Cincinnati","OH","45241","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2873,"2777 Finley Road","2777 Finley Road","","Downers Grove","IL","60515","United States","","","North America","RE Portfolio","34140","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2876,"3700 Koppers Street","3700 Koppers Street","","Halethorpe","MD","21227","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2878,"32 Executive Park","32 Executive Park","","Irvine","CA","92614","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2881,"3902 Columbia Avenue","3902 Columbia Avenue","","Linwood","PA","19061","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2882,"11500 Olympic Blvd","11500 Olympic Blvd","","Los Angeles","CA","90064","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2883,"11060 Oak Street","11060 Oak Street","","Omaha","NE","68144","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2888,"1610 Forest Avenue","1610 Forest Avenue","","Richmond","VA","23229","United States","","","North America","RE Portfolio","228879","228879","","","","","","","","","","","","","","","","","","","",""),
    new Building(2894,"3200 N. Hayden Road","3200 N. Hayden Road","","Scottsdale","AZ","85251","United States","","","North America","RE Portfolio","65731","65731","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2896,"28400 Northwestern Hwy.","28400 Northwestern Hwy.","","Southfield","MI","48034","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2898,"8405 Benjamin Road","8405 Benjamin Road","","Tampa","FL","33634","United States","","","North America","RE Portfolio","127566","127566","","","","","","","","","","","","","","","","","","","",""),
    new Building(2902,"400 West Cummings Park","400 West Cummings Park","","Woburn","MA","1801","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2903,"2005 Market Street","2005 Market Street","Suite 1950","Philadelphia","PA","19103","United States","","","North America","RE Portfolio","942866","","SF","","","","","","","USD","","","","","","Actual","Philadelphia","Philadelphia CBD","4","","","229519"),
    new Building(2904,"150 N Riverside Drive","150 N Riverside Drive","Suite 5150","Chicago","IL","60606","United States","","","North America","RE Portfolio","1226111","","SF","","","","","","","USD","","","","","","Actual","Chicago","Metro Chicago","5","","","66510"),
    new Building(2907,"14205 SE 36th Street","14205 SE 36th Street","Suite 220","Bellevue","WA","98006","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2908,"181 Bay Street","181 Bay Street","34th Floor","Toronto","ON","M5J 2T","Canada","","","North America","RE Portfolio","","","SF","","","","","","","CAD","","","","","","Actual","Toronto","Downtown","5","","","59605"),
    new Building(2909,"2111 South 67th Street","2111 South 67th Street","","Omaha","NE","68106","United States","","","North America","RE Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2911,"9 George Square","9 George Square","Suite 109","Glasgow","UK","G2 10Q","United Kingdom","","","Europe","RE Portfolio","","","SF","","","","","","","GBP","","","","","","Actual","Glasgow","Glasgow CBD","4","","","11857"),
    new Building(2912,"420 20th Street North","420 20th Street North","Suite 2500","Birmingham","AL","35203","United States","","","North America","RE Portfolio","514893","","SF","","","","","","","USD","","","","","","Actual","Birmingham","Central Birmingham","4","","","111014"),
    new Building(2913,"3514 Vancouver Ave","3514 Vancouver Ave","4th Floor","Portland","OR","97277","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2915,"100 Light Street","100 Light Street","","Baltimore","MD","21202","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Estimated","Baltimore","Downtown Baltimore City","4","","","207710"),
    new Building(2916,"Regus – Charleston, SC","170 Meeling Street","1st, 2nd and 3rd Floors","Charleston","SC","29401","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2917,"Frankfurt, Germany Nextower","Thurn-und-Taxis-Platz 6","","Frankfurt","","60313","Germany","","","Europe","RE Portfolio","","","SM","","","","","","","EUR","","","","","","","","","","","",""),
    new Building(2918,"Las Olas City Center","401 E. Las Olas Blvd","Suite 1530","Fort Lauderdale","FL","33301","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Fort Lauderdale","Downtown Fort Lauderdale","4","","","77912"),
    new Building(2919,"One PPG Place","One PPG Place","Suite 2410","Pittsburgh","PA","15222","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Pittsburgh","Central Business District","5","","","142083"),
    new Building(2920,"1215 E. Market Street","1215 E. Market Street","","Charlottesville","VA","22902","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2927,"Coresite","","","","","","","","","","EQ Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2928,"Equinix","","","","","","","","","","EQ Portfolio","","","","","","","","","","","","","","","","","","","","","",""),
    new Building(2929,"Sungard","","","","","","","","","","EQ Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2930,"Internap Network Services","","","","","","","","","","EQ Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2931,"Advanced Office Equipment","","","","","","","","","","EQ Portfolio","","","SF","","","","","","","CAD","","","","","","","","","","","",""),
    new Building(2931,"Advanced Office Equipment","","","","","","","","","","EQ Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2932,"Tesla","","","","","","","","","","EQ Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2933,"946 Grady Avenue","946 Grady Avenue","","Charlottesville","VA","22903","United States","Leased","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Estimated","Charlottesville","Charlottesville","4","","","3202"),
    new Building(2934,"Hendersonville, TN","735 East Main Street","","Hendersonville","TN","37075","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","","Nashville","Rivergate/Hendersonville","3","","",""),
    new Building(2935,"London, UK","110 Southwark Street","","London","","SEl OTA","United Kingdom","","","Europe","RE Portfolio","","","SF","","","","","","","GBP","","","","","","Actual","London","London Southbank","5","","","71741"),
    new Building(2936,"Adelaide, Australia","70 Light Square","","Adelaide","","","Australia","","","Europe","RE Portfolio","","","SF","","","","","","","AUD","","","","","","","","","","","",""),
    new Building(2937,"Broomfield, CO","11001 West 120th Avenue","Suite 250","Broomfield","CO","80021","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Denver","Broomfield","4","","","46725"),
    new Building(2938,"Singapore","15 Scotts Road","#08-12 Thong Teck Building","","","228218","Singapore","","","Europe","RE Portfolio","","","SF","","","","","","","SGD","","","","","","","","","","","",""),
    new Building(2939,"Edinburgh","93 George Street","","Lothian Region","","EH2 3ES","United Kingdom","","","Europe","RE Portfolio","","","SF","","","","","","","GBP","","","","","","Estimated","Edinburgh","Edinburgh CBD","3","","","31308"),
    new Building(2940,"Bogata, Columbia","11B ## 99-25","","Bogota","","","Colombia","","","Europe","RE Portfolio","","","SF","","","","","","","USD","","","","","","","","","","","",""),
    new Building(2941,"Germany","Herzogspitalstraße 24","","München","","80331","Germany","","","Europe","RE Portfolio","","","SF","","","","","","","EUR","","","","","","","Munich","Zentrum","3","","",""),
    new Building(2942,"Dubai","ONE JLT Tower, Jumeirah Lakes Towers","","Dubai","","","United Arab Emirates","","","Europe","RE Portfolio","","","SF","","","","","","","AED","","","","","","","","","","","",""),
    new Building(2943,"Beijing","No 6, Xuanwumenwai Street","Unit 1106 Tower 1","","","","China","","","Europe","RE Portfolio","","","SM","","","","","","","CNY","","","","","","","","","","","",""),
    new Building(2944,"Lakewood, OH","14650 Detroit Avenue","Suite 450","Lakewood","OH","","United States","","","North America","RE Portfolio","","","SF","","","","","","","USD","","","","","","Actual","Cleveland","West","3","","","22767"),
    new Building(2945,"Jakarta","110 Southwark Street","","","London","SE1 OTA","United Kingdom","","","Europe","RE Portfolio","","","SM","","","","","","","INR","","","",""," ","Actual","London","London Southbank","5","","","71741"),
];



