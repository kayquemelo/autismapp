import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @ContentChildren('column') columns!: QueryList<TemplateRef<any>>;
  @ContentChildren('header') headers!: QueryList<TemplateRef<any>>;
  @Input() dataset: Array<any> | null = null;
}
