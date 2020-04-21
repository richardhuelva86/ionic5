import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-loading-feedback',
  templateUrl: './loading-feedback.component.html',
  styleUrls: ['./loading-feedback.component.scss'],
})
export class LoadingFeedbackComponent implements OnInit {
  @Input()
  public state: 'loaded' | 'loading' | 'error';

  @Output()
  public retryPressed = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  public handleClick() {
    this.retryPressed.emit();
  }
}
