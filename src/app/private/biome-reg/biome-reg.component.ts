import {Component, ElementRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-biome-reg',
  templateUrl: './biome-reg.component.html',
  styleUrls: ['./biome-reg.component.scss']
})
export class BiomeRegComponent implements OnDestroy{
  constructor(private elementRef: ElementRef) {
  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();
  }
}
