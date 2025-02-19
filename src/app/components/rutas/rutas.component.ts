import { Component, OnInit, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Cruce } from 'src/app/modells/Cruce';
import { Paradero } from 'src/app/modells/Paradero';
import { Ruta } from 'src/app/modells/Ruta';
import { Trayecto } from 'src/app/modells/Trayecto';
import { CruceServiceService } from 'src/app/services/cruce.service.service';
import { ParaderoServiceService } from 'src/app/services/paradero.service.service';
import { RutaServiceService } from 'src/app/services/ruta.service.service';
import { TrayectoServiceService } from 'src/app/services/trayecto.service.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css'],
  providers: [MessageService],
})
export class RutasComponent implements OnInit {
  @Input() latitud: string;
  @Input() longitud: string;

  formNuevoParadero: FormGroup;
  formNuevaRuta: FormGroup;
  formNuevoTrayecto: FormGroup;
  titulo = 'Rutas';
  overlaysGeneral: any;
  overlaysParadero: any;
  overlaysNewParadero: any;
  rutasDisponibles: Array<Ruta>;
  //Todos los paraderos que cruzan por una ruta
  cruceByRutas: Cruce[];
  //Todas las rutas que cruzan por un paradero
  paraderos: Array<Paradero>;
  trayectos: Array<Trayecto>;
  cruces: Array<Cruce>;
  pDialog: boolean;
  dialogRutas: boolean;
  dialogTrayectos: boolean;
  nuevoParadero: boolean;
  nuevoTrayecto: boolean;
  nuevaRuta: boolean;
  latitudParadero: string;
  longitudParadero: string;
  width: string;
  width1: string;
  width2: string;
  height2: string;
  height: string;
  heigth1: string;
  paraderoSeleccionado: Paradero;

  cols?: any[];

  categories: any[] = [
    { name: 'Accounting', key: 'A' },
    { name: 'Marketing', key: 'M' },
    { name: 'Production', key: 'P' },
    { name: 'Research', key: 'R' },
  ];
  paraderosDeRuta: Array<Paradero>;

  constructor(
    private rService: RutaServiceService,
    private pService: ParaderoServiceService,
    private fb: FormBuilder,
    private mService: MessageService,
    private tService: TrayectoServiceService,
    private cService: CruceServiceService
  ) {
    this.rutasDisponibles = new Array<Ruta>();
    this.paraderos = new Array<Paradero>();
    this.paraderosDeRuta = new Array<Paradero>();
    this.pDialog = false;
    this.dialogRutas = false;
    this.dialogTrayectos = false;
    this.nuevoParadero = false;
    this.nuevoTrayecto = false;
    this.nuevaRuta = false;
    this.width = '100%';
    this.width1 = '100px';
    this.width2 = '400px';
    this.height2 = '200px';
    this.height = '320px';
    this.heigth1 = '100px';
    this.paraderoSeleccionado = new Paradero();
    this.overlaysNewParadero = [];
    this.overlaysParadero = [];
    this.overlaysGeneral = [];

    this.formNuevoParadero = fb.group({
      idParadero: new FormControl('', []),
      nombreParadero: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      barrio: new FormControl('', [Validators.required]),
    });

    this.formNuevaRuta = fb.group({
      idRuta: new FormControl('', [Validators.required]),
      frecuencia: new FormControl('', [Validators.required]),
      idTrayecto: new FormControl('', [Validators.required]),
      nombreRuta: new FormControl('', []),
    });

    this.formNuevoTrayecto = fb.group({
      idTrayecto: new FormControl('', []),
      inicio: new FormControl('', [Validators.required]),
      medio: new FormControl('', [Validators.required]),
      fin: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.overlaysGeneral = [
      new google.maps.Marker({
        position: { lat: 5.54908568157243, lng: -73.35428386117079 },
        title: 'Mi ruta Tunja',
      }),
    ];
    this.getAllRutas();
    this.getAllParaderos();
    this.getAllTrayectos();
    this.getAllCruces();
  }

  getAllCruces() {
    this.cService.getAllCruces().subscribe((res) => {
      this.cruces = res;
    });
  }

  getAllTrayectos() {
    this.tService.getAll().subscribe((res) => {
      this.trayectos = res;
      this.trayectos.forEach((element) => {
        element.trayectoCompleto =
          element.inicio + '-' + element.medio + '-' + element.fin;
      });
    });
  }

  newParadero() {
    if (this.formNuevoParadero.valid) {
      let newParadero = new Paradero();
      newParadero.barrio = this.formNuevoParadero.get('barrio')?.value;
      newParadero.direccion = this.formNuevoParadero.get('direccion')?.value;
      newParadero.latitud = this.latitud;
      newParadero.longitud = this.longitud;
      newParadero.nombreParadero =
        this.formNuevoParadero.get('nombreParadero')?.value;
      this.pService.newParadero(newParadero).subscribe((res) => {
        this.getAllParaderos();
        this.opcionNuevoParadero();
        this.formNuevoParadero.reset();
      });
    } else {
      this.showMessage('Por favor llena todos los campos');
    }
  }

  showMessage(message: string) {
    this.mService.add({
      severity: 'info',
      summary: 'Datos incorrectos',
      detail: message,
    });
  }

  getAllRutas() {
    this.rService.getAllRutas().subscribe((res) => {
      this.rutasDisponibles = res;
    });
  }

  getAllParaderos() {
    this.pService.getAllParaderos().subscribe((res) => {
      this.paraderos = res;
    });
  }

  opcionNuevoParadero() {
    if (this.nuevoParadero) {
      this.nuevoParadero = false;
    } else {
      this.nuevoParadero = true;
    }
  }

  opcionNuevoTrayecto() {
    if (this.nuevoTrayecto) {
      this.nuevoTrayecto = false;
    } else {
      this.nuevoTrayecto = true;
    }
  }

  receiveLongitud(event: any) {
    this.longitud = event;
  }

  receiveLatitud(event: any) {
    this.latitud = event;
  }

  verTrayectos(){
    this.dialogTrayectos = true;
  }

  verParaderos() {
    this.pDialog = true;
  }

  verRutas() {
    this.dialogRutas = true;
  }

  editUbicacionNewParadero() {
    this.overlaysNewParadero = [];
  }

  generateUbicacionParadero(event: any, event1: any) {
    this.overlaysParadero = [
      new google.maps.Marker({
        position: { lat: event, lng: event1 },
        title: 'Mi ruta Tunja',
      }),
    ];
  }

  aniadirParadero(event: Paradero) {
    if (!this.paraderoExist(event)) {
      this.paraderosDeRuta.push(event);
    } else {
      this.paraderosDeRuta.splice(this.paraderosDeRuta.indexOf(event), 1);
    }
    console.log(this.paraderosDeRuta);
  }

  paraderoExist(paradero: Paradero): Boolean {
    let verify = false;
    if (this.paraderosDeRuta.length > 0) {
      this.paraderosDeRuta.forEach((element) => {
        if (element.idParadero === paradero.idParadero) {
          verify = true;
        }
      });
    }
    return verify;
  }

  activarNuevaRuta() {
    if (this.nuevaRuta) {
      this.nuevaRuta = false;
      this.formNuevaRuta.reset();
      this.paraderosDeRuta = [];
    } else {
      this.nuevaRuta = true;
      this.dialogRutas = false;
    }
  }

  newRuta() {
    if (this.formNuevaRuta.valid) {
      let rutaNueva = new Ruta();
      rutaNueva.idRuta = this.formNuevaRuta.get('idRuta')?.value;
      rutaNueva.frecuencia = this.formNuevaRuta.get('frecuencia')?.value;
      rutaNueva.idTrayecto = this.formNuevaRuta.get('idTrayecto')?.value;
      rutaNueva.nombreRuta = 'R-' + this.formNuevaRuta.get('idRuta')?.value;
      console.log(this.paraderosDeRuta.length);
      if (this.paraderosDeRuta.length > 0) {
        this.rService.newRuta(rutaNueva).subscribe(res => {
          this.agregarCruces(rutaNueva)
          this.activarNuevaRuta()
          this.getAllRutas()
          this.showMessage('Se ha creado la ruta');
        })
      } else {
        this.showMessage('La ruta debe pasar minimo por 1 paradero');
      }
    } else {
      this.showMessage('Por favor ingrese todos los datos de la Ruta');
    }
  }

  newTrayecto(){
    if(this.formNuevoTrayecto.valid){
      let trayecto = new Trayecto();
      trayecto.inicio = this.formNuevoTrayecto.get('inicio')?.value
      trayecto.medio = this.formNuevoTrayecto.get('medio')?.value
      trayecto.fin = this.formNuevoTrayecto.get('fin')?.value
      console.log(trayecto);
      
      this.tService.newTrayecto(trayecto).subscribe(res =>{
        this.getAllTrayectos();
        this.opcionNuevoTrayecto();
        this.showMessage('El trayecto se ha creado exitosamente');
      })
    }
  }

  agregarCruces(ruta: Ruta) {
    let cruce = new Cruce();
    for (let i = 0; i < this.paraderosDeRuta.length; i++) {
      cruce.idParadero = this.paraderosDeRuta[i]
      cruce.idRuta = ruta
      this.cService.newCruce(cruce).subscribe(res => {
        this.getAllCruces();
      })
    }
  }
}
