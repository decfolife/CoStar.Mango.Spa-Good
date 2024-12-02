import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Description } from '@mango/data-models/lib-data-models';

@Component({
  standalone: true,
  selector: 'crem-descriptions',
  imports: [CommonModule],
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.scss'],
})
export class DescriptionsComponent implements OnInit {
  @Input() items: Description[];
  @Input() showBorders = false;
  ngOnInit(): void {}
}
