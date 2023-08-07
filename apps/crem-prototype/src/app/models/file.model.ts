export class File {
    id : number;
	fileName : string;
	filePath : string;	
	uploadedBy : string;
	lastModified : string;
	fileSize : number;
	type : string;
	extension : string;

	constructor( id, fileName, filePath, uploadedBy, lastModified, fileSize, type, extension ) {
		this.id = id;
		this.fileName = fileName;
		this.filePath = filePath;	
		this.uploadedBy = uploadedBy;
		this.lastModified = lastModified;
		this.fileSize = fileSize;
		this.type = type;
		this.extension = extension;
	}
}

export let files : File[] = [
	new File(1, 'Correspondence', '', 'Jason Trkovsky', '2019-10-18', null, 'folder', ''),
	new File(2, 'Facilities', '', 'Jason Trkovsky', '2019-10-18', null, 'folder', ''),
	new File(3, 'Floor Plans', '', 'Jason Trkovsky', '2019-10-18', null, 'folder', ''),
	new File(4, 'Legal Documents', '', 'Jason Trkovsky', '2019-10-18', null, 'folder', ''),
	new File(5, 'Photos', '', 'Jason Trkovsky', '2019-10-18', null, 'folder', ''),
	new File(6, 'my_word_document.docx', '', 'Jason Trkovsky', '2019-10-18', 24, 'file', 'docx'),
	new File(7, 'my_excel_document.xlsx', '', 'Jason Trkovsky', '2019-10-18', 24, 'file', 'xlsx'),
	new File(8, 'my_pdf_document.pdf', '', 'Jason Trkovsky', '2019-10-18', 24, 'file', 'pdf'),
	new File(9, 'my_csv_document.csv', '', 'Jason Trkovsky', '2019-10-18', 24, 'file', 'csv'),
	new File(10, 'my_photo_document.jpg', '', 'Jason Trkovsky', '2019-10-18', 24, 'file', 'jpg'),
	new File(11, 'my_powerpoint_document.pptx', '', 'Jason Trkovsky', '2019-10-18', 24, 'file', 'pptx'),
	new File(11, 'A link to a really cool place', 'http://www.costar.com', 'Jason Trkovsky', '2019-10-18', null, 'link', ''),
];