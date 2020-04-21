import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expandable-content',
  templateUrl: './expandable-content.component.html',
  styleUrls: ['./expandable-content.component.scss'],
})
export class ExpandableContentComponent implements OnInit {
  @Input()
  public title: string;

  collapsed: boolean;
  symbol: string = 'remove-circle';

  @Output()
  change = new EventEmitter<boolean>();

  constructor() {
    this.collapsed = true;
  }

  ngOnInit() {}

  toggle() {
    this.collapsed = !this.collapsed;
    this.symbol = this.collapsed ? 'add-circle' : 'remove-circle';
    this.change.emit(this.collapsed);
  }
}
