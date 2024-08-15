import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'crem-no-objects-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './no-objects-found.component.html',
  styleUrls: ['./no-objects-found.component.scss'],
})


export class NoObjectsFoundComponent {
  @Input() title = 'No objects found';
  @Input() subtitle = 'Create or add a new object to get started';
}
