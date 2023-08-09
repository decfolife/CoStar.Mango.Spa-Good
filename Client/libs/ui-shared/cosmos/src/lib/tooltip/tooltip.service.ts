import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class TooltipService {
OTID: string;
portfolioID: string;
helptextName: string;
fieldHistoryName: string;

  constructor(private http: HttpClient){
    // this.id = "2"
    // this.pageName = "leaseterms.aspx";
    // this.helptextId = "LeaseYears";
    // this.getHelpText();
  }

  // getHelpText() {
  //   this.getHelpTextData(this.pageName, this.helptextId).subscribe(result => {
  //     console.log(result);
  //     // this.helpTextData = result.toString();
  //   });
  // }

  public GetHelptextAndHistory(portfolioID: string, OTID: string, helptextName: string, fieldHistoryName: string)  {
    // return this.http.post('NLAS.aspx/GetOtherChargeInfo', {
      const url = `/v06/WebServices/Helptext.asmx/GetHelptextAndHistory`;
      const params = new HttpParams()
            .append('portfolioID', portfolioID)
            .append('OTID', OTID)
            .append('helptextName', helptextName)
            .append('fieldHistoryName', fieldHistoryName)
      return this.http.post(url, params);
  }
}


