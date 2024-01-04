import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mango-copy-clipboard-message',
  templateUrl: 'copy-clipboard-message.component.html',
  styleUrls: ['copy-clipboard-message.component.scss'],
})
export class CopyClipboardMessageComponent {
  public apiKey: string = "";
  public value: string = "";
  public info: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.apiKey = this.data.apikey;
  }

  copyClipboard() {
    navigator.clipboard.writeText(this.apiKey);
    this.info = "Copied to clipboard";
  }

}
