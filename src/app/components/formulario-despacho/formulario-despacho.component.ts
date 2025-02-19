import { Time } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService, PrimeNGConfig, OverlayOptions } from 'primeng/api';
import { Autobus } from 'src/app/modells/Autobus';
import { Despacho } from 'src/app/modells/Despacho';
import { Ruta } from 'src/app/modells/Ruta';
import { DespachoServiceService } from 'src/app/services/despacho.service.service';
import { RutaServiceService } from 'src/app/services/ruta.service.service';

@Component({
  selector: 'app-formulario-despacho',
  templateUrl: './formulario-despacho.component.html',
  styleUrls: ['./formulario-despacho.component.css'],
})
export class FormularioDespachoComponent implements OnChanges, OnInit {
  @Input() autobus: Autobus;
  autobusesDisponibles: Array<Autobus>;
  rutasExistentes: Array<Ruta>;
  formNewDespacho: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dService: DespachoServiceService,
    private messageService: MessageService,
    private rService: RutaServiceService,
  ) {
    this.formNewDespacho = fb.group({
      idDespacho: new FormControl('', []),
      horaSalida: new FormControl('', []),
      idAutobus: new FormControl('', [Validators.required]),
      idRuta: new FormControl('', [Validators.required]),
    });
    this.autobus = new Autobus();
    this.autobusesDisponibles = new Array<Autobus>();
    this.rutasExistentes = new Array<Ruta>();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllRutas();
    this.getAutobus();
  }

  getAutobus() {
    if (this.autobus.idAutobus) {
      this.autobusesDisponibles.push(this.autobus);
    }
  }

  getAllRutas() {
    this.rService.getAllRutas().subscribe((res) => {
      this.rutasExistentes = res;
    });
  }

  newDespacho() {
    let date: Date = new Date();
    if (this.formNewDespacho.valid) {
      let despachoNuevo = new Despacho();
      despachoNuevo.horaSalida = date;
      despachoNuevo.idAutobus = this.formNewDespacho.get('idAutobus')?.value;
      despachoNuevo.idRuta = this.formNewDespacho.get('idRuta')?.value;
      console.log(despachoNuevo);
      //this.dService.createNewDespacho(despachoNuevo);
    } else {
      this.showMessage('Por favor diligencia todos los campos');
    }
  }

  showMessage(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Datos incorrectos',
      detail: message,
    });
  }
}
