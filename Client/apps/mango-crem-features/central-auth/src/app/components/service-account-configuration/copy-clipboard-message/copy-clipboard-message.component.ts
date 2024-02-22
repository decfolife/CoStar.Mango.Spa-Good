import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  imports:[ModalModule, MatDialogModule],
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
    try {
      navigator.clipboard.writeText(this.apiKey);
      console.log('using navigator.clipboard.writeText');
    } catch (error) {
      console.log('using document.execCommand');
      const el = document.createElement('textarea');
      el.value = this.apiKey;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      const selected =
        document.getSelection().rangeCount > 0
          ? document.getSelection().getRangeAt(0)
          : false;
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
      }
    }

    this.info = "Copied to clipboard";
  }
}
