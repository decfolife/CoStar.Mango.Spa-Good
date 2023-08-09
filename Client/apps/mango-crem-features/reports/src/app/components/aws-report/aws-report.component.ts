import { Component, OnInit } from '@angular/core';
import { AWSReportService } from './aws-report.service';
import { AWSReport } from './aws-report.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'aws-report',
  templateUrl: './aws-report.component.html',
  styleUrls: ['./aws-report.component.scss']
})
export class AWSReportComponent implements OnInit {
  public pageTitle = this.route.snapshot.data['pageTitle'];
  private awsReportData: AWSReport;
  private reportName = ''
  public reportData = ''

  constructor(    
    public service: AWSReportService,
    private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.reportName = this.route.snapshot.queryParamMap.get('name')
    console.log('angular report name: ' + this.reportName)
    this.service.getAWSReportData(this.reportName)
    .subscribe(result => {
      this.awsReportData = result.data as AWSReport;
      this.reportData = this.awsReportData.content;
      console.log(this.reportData);
    });
  }
}

