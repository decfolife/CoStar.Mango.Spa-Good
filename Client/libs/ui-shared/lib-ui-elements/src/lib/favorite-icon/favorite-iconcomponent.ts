import { Component, Input } from '@angular/core';

/**
 *
 */
@Component({
  selector: 'favorite-icon',
  templateUrl: 'favorite-icon.component.html',
  styleUrls: ['./favorite-iconcomponent.scss'],
})
export class FavoriteIconComponent {
  
@Input() favIconColor: string;
  ngOnInit() {}
    
}
