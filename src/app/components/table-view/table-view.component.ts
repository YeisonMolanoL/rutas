import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Cruce } from 'src/app/modells/Cruce';
import { Paradero } from 'src/app/modells/Paradero';
import { Ruta } from 'src/app/modells/Ruta';
import { Trayecto } from 'src/app/modells/Trayecto';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  @Input() paraderos: Array<Paradero>;
  @Input() rutas: Array<Ruta>;
  @Input() trayectos: Array<Trayecto>;
  @Input() cruces: Array<Cruce>;
  @Input() heigth: string;
  @Input() width: string;
  @Input() zoom: number;
  @Input() selector: string;

  cruceByParaderos: Array<Cruce>;
  cruceByRutas: Array<Cruce>;

  constructor() {
    this.cruceByParaderos = new Array<Cruce>();
  }

  ngOnInit(): void {
  }

  filtrarByParaderos(paradero: Paradero) { 
    this.cruceByParaderos = [];  
    this.cruces.forEach((element) => {      
      if (element.idParadero?.idParadero == paradero.idParadero) { 
        this.cruceByParaderos.push(element)
      }
    })
  }

  filtrarByRutas(ruta: Ruta) { 
    this.cruceByRutas = [];    
    this.cruces.forEach((element) => {      
      if (element.idRuta?.idRuta == ruta.idRuta) { 
        this.cruceByRutas.push(element)
      }
    })
    console.log(this.cruceByRutas);
    
  }
}
