import {Component, ElementRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-operations',
  templateUrl: './core-config.component.html',
  styleUrls: ['./core-config.component.scss']
})
export class CoreConfigComponent implements OnDestroy{
  constructor(private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
}
