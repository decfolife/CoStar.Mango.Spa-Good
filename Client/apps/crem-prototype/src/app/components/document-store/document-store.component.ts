import { Component, OnInit } from '@angular/core';
import RemoteFileSystemProvider from 'devextreme/file_management/remote_provider';

@Component({
	selector: 'document-store',
	templateUrl: './document-store.component.html',
	styleUrls: ['./document-store.component.scss']
})
export class DocumentStoreComponent implements OnInit {

	remoteProvider: RemoteFileSystemProvider;
	
	constructor() { 
		this.remoteProvider = new RemoteFileSystemProvider({
            endpointUrl: "https://js.devexpress.com/Demos/Mvc/api/file-manager-file-system-images"
        });
	}

	ngOnInit() {
	}

}
