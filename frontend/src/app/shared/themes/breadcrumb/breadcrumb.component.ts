import { Component, Input } from '@angular/core';
import { breadcrumbItem } from '../../interfaces/shared';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {
  @Input() breadLabel!: Array<breadcrumbItem>;

  constructor ( ) { }

}
