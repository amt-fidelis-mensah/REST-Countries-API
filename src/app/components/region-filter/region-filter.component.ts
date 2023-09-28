import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-region-filter',
  templateUrl: './region-filter.component.html',
  styleUrls: ['./region-filter.component.css'],
})
export class RegionFilterComponent {
  selectedOption: string = '';
  @Input()
  placeholder!: string;

  @Input()
  options!: string[];

  @Input()
  value?: string;

  select(value: string) {
    console.log('Hello Fidelis you are doing a great job');
    this.valueChange.emit(value);
  }

  @Output()
  valueChange: EventEmitter<string> = new EventEmitter();
}
