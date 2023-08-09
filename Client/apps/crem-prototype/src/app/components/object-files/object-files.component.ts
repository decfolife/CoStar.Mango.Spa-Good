import { Component, OnInit, Input } from '@angular/core';
import { Service, File } from '../../app.service';
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';


@Component({
  selector: 'app-object-files',
  templateUrl: './object-files.component.html',
  styleUrls: ['./object-files.component.scss'],
  providers : [Service]
})
export class ObjectFilesComponent implements OnInit {

	files : File[];
	currentFolder : String;
	@Input() hideFolderSidenav : Boolean = true;
	remoteProvider: RemoteFileSystemProvider;

	constructor( private service : Service) { 
		this.files = this.service.getFiles();
		this.currentFolder = 'Main';

		// This is for the dev ex files control
		this.remoteProvider = new RemoteFileSystemProvider({
            endpointUrl: "https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images"
        });
	}

	ngOnInit() {
	}

	navigate (file) {
		if(file.type == 'folder') {
			this.currentFolder = file.fileName;
			this.files = [];
		}
	}

	goBack() {
		this.files = this.service.getFiles();
		this.currentFolder = 'Main';
	}

}
