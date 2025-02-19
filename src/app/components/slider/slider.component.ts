import { AfterViewInit, Component, OnInit, Input } from '@angular/core';
import { ResponsiveOverlayOptions } from 'primeng/api';
import { Autobus } from 'src/app/modells/Autobus';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, AfterViewInit {

  @Input() autobuses: Array<Autobus>;

  constructor() {
    this.autobuses = new Array<Autobus>();
   }
  ngAfterViewInit(): void {
  
  }

  ngOnInit(): void {
  }

}
