import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Autobus } from 'src/app/modells/Autobus';
import { Compañia_Autobus } from 'src/app/modells/Compañia_Autobus';
import { FormaJuridica } from 'src/app/modells/FormaJuridica';
import { Iniciales_Placa } from 'src/app/modells/Iniciales_Placa';
import { AutobusServiceService } from 'src/app/services/autobus.service.service';
import { CompaniaAutobusServiceService } from 'src/app/services/compania-autobus.service.service';
import { FormaJuridicaServiceService } from 'src/app/services/forma-juridica.service.service';
import { InicialesPlacaServiceService } from 'src/app/services/iniciales-placa.service.service';
import { EstadoAutobusService } from 'src/app/services/estado-autobus.service';
import { EstadoAutobus } from 'src/app/modells/EstadoAutobus';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-autobus',
  templateUrl: './autobus.component.html',
  styleUrls: ['./autobus.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AutobusComponent implements OnInit {
  autobuses: Array<Autobus>;
  results: Array<Autobus>;
  autobusesDisponibles: Array<Autobus>;
  inicialesPlaca: Array<Iniciales_Placa>;
  formasJuridicas: Array<FormaJuridica>;
  companiasDisponibles: Array<Compañia_Autobus>;
  tipoEstados: Array<EstadoAutobus>;
  titulo: string;
  autobus: Autobus;
  formNewAutobus: FormGroup;
  formNewFormaJuridica: FormGroup;
  formNewCompaniaAutobus: FormGroup;
  tecnomecanica: boolean;
  soat: boolean;
  message: Array<Message>;
  inicial: Iniciales_Placa;
  formularios: string;
  infoAutobus: boolean;
  active: string;
  openNewDespacho: boolean;
  roles: Array<string>
  isAdmin = false

  constructor(
    private autobusService: AutobusServiceService,
    private inicialesPlacaService: InicialesPlacaServiceService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private fjService: FormaJuridicaServiceService,
    private confirmationService: ConfirmationService,
    private caService: CompaniaAutobusServiceService,
    private eaService: EstadoAutobusService,
    private tService: TokenService
  ) {
    this.formNewAutobus = this.formBuilder.group({
      idAutobus: new FormControl('', []),
      idMiRuta: new FormControl('', [Validators.required]),
      soat: new FormControl('', [Validators.required]),
      tecnomecanica: new FormControl('', [Validators.required]),
      numero: new FormControl('', [Validators.required]),
      idInicialPlaca: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      idCompaniaAutobus: new FormControl('', [Validators.required]),
      idEstadoAutobuss: new FormControl('', [Validators.required]),
      capacidadMaxima: new FormControl('', [Validators.required]),
    });

    this.formNewFormaJuridica = this.formBuilder.group({
      idForma_Juridica: new FormControl('', []),
      nombreFormaJuridica: new FormControl('', [Validators.required]),
    });

    this.formNewCompaniaAutobus = this.formBuilder.group({
      idCompania_autobus: new FormControl('', []),
      nombreCompania: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      ciudadResidencia: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required]),
      actividad: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      idFormaJuridica: new FormControl('', [Validators.required]),
    });
    this.autobuses = new Array<any>();
    this.results = new Array<Autobus>();
    this.autobusesDisponibles = new Array<Autobus>();
    this.inicialesPlaca = new Array<Iniciales_Placa>();
    this.formasJuridicas = new Array<FormaJuridica>();
    this.companiasDisponibles = new Array<Compañia_Autobus>();
    this.tipoEstados = new Array<EstadoAutobus>();
    this.titulo = 'Autobuses';
    this.autobus = new Autobus();
    this.tecnomecanica = false;
    this.soat = false;
    this.message = new Array();
    this.inicial = new Iniciales_Placa();
    this.formularios = '';
    this.infoAutobus = false;
    this.active = '';
    this.openNewDespacho = false;
  }

  ngOnInit(): void {
    this.getAllAutobuses();
    this.getTypesInicials();
    this.getAllCompaniaAutobus();
    this.getTipoEstados();
    this.getFormasJuridicas();
    this.roles = this.tService.getAuthorities()
    this.roles.forEach(rol =>{
      console.log(rol)
      
      if(rol == 'ROLE_ADMIN'){
        this.isAdmin = true;
        console.log('llegue')
        
      }
    })
  }

  getAllAutobuses() {
    this.autobuses.splice(0, this.autobuses.length);
    this.autobusService.getAll().subscribe((res) => {
      res.forEach((element) => {
        console.log(element.imagen);
        
        element.placanumero =
          element.idInicialPlaca?.inicial + '-' + element.numericPlaca;
        this.autobuses.push(element);
      });
    });
  }

  getTypesInicials() {
    this.inicialesPlacaService.getAll().subscribe((res) => {
      this.inicialesPlaca = res
    });
  }

  getFormasJuridicas() {
    this.fjService.getAll().subscribe((res) => {
      this.formasJuridicas = res;
      console.log(this.formasJuridicas);
    });
  }

  getAllCompaniaAutobus() {
    this.companiasDisponibles.splice(0, this.companiasDisponibles.length);
    this.caService.getAllCompanias().subscribe((res) => {
      this.companiasDisponibles = res;
    });
  }

  getTipoEstados() {
    this.eaService.getAll().subscribe((res) => {
      this.tipoEstados = res;
    });
  }

  search(event: any) {
    this.results = [];
    this.autobuses.forEach((element) => {
      if (
        element.idInicialPlaca?.inicial
          ?.toLowerCase()
          .includes(event.query.toLowerCase()) ||
        element.numericPlaca?.toString().includes(event.query)
      ) {
        this.results.push(element);
      }
    });
  }

  getObject() {
    if (this.autobus.idAutobus) {
      return true;
    } else {
      return false;
    }
  }

  elegirFormulario(text: string) {
    this.formularios = text;
  }

  newAutobus(): void {
    if (this.formNewAutobus.valid) {
      let autobus = new Autobus();
      autobus.idInicialPlaca = this.formNewAutobus.get('idInicialPlaca')?.value;
      autobus.idMiRuta = this.formNewAutobus.get('idMiRuta')?.value;
      autobus.imagen = this.formNewAutobus.get('imagen')?.value;
      autobus.numericPlaca = this.formNewAutobus.get('numero')?.value;
      autobus.soat = this.formNewAutobus.get('soat')?.value;
      autobus.tecnomecanica = this.formNewAutobus.get('tecnomecanica')?.value;
      autobus.idEstadoAutobus =
        this.formNewAutobus.get('idEstadoAutobuss')?.value;
      autobus.capacidadMaxima =
        this.formNewAutobus.get('capacidadMaxima')?.value;
      autobus.idCompaniaAutobus =
        this.formNewAutobus.get('idCompaniaAutobus')?.value;
      this.autobusService.newAutobus(autobus).subscribe((res) => {
        this.getAllAutobuses();
        this.elegirFormulario('');
      });
      this.vaciarFormAutobus();
    } else {
      this.showMessage('Por favor diligencie todos los campos');
    }
  }

  vaciarFormAutobus() {
    this.formNewAutobus.reset();
  }

  showMessage(message: string) {
    this.messageService.add({
      severity: 'info',
      summary: 'Datos incorrectos',
      detail: message,
    });
  }

  newFormaJuridica(event: Event) {
    if (this.formNewFormaJuridica.valid) {
      let formaJuridica = new FormaJuridica();
      formaJuridica.nombreFormaJuridica = this.formNewFormaJuridica.get(
        'nombreFormaJuridica'
      )?.value;
    } else {
      this.showMessage('Por favor diligencie todos los campos');
    }
  }

  showInfoAutobus() {
    if (this.infoAutobus) {
      this.infoAutobus = false;
    } else {
      if (this.getObject()) {
        this.estadoAutobus();
        this.infoAutobus = true;
      } else {
        this.showMessage('Por favor seleccione un autobus');
      }
    }
  }

  generarNuevoDespacho() {
    switch (this.autobus.idEstadoAutobus?.estado) {
      case 'Inactivo': {
        this.showMessage('El autobus esta fuera de servicio');
        break;
      }
      case 'En ruta': {
        this.showMessage('El autobus aun esta en Ruta');
        break;
      }
      case 'En despacho': {
        this.showInfoAutobus();
        this.openFormNewDespacho();
      }
    }
  }

  openFormNewDespacho() {
    if (this.openNewDespacho) {
      this.openNewDespacho = false;
    } else {
      this.openNewDespacho = true;
    }
  }

  estadoAutobus() {
    switch (this.autobus.idEstadoAutobus?.estado) {
      case 'En ruta': {
        this.active = 'success';
        break;
      }
      case 'En despacho': {
        this.active = 'warning';
        break;
      }
      case 'Inactivo'.toString(): {
        this.active = 'danger';
        break;
      }
    }
  }

  newCompaniaAutobus(){
    if(this.formNewCompaniaAutobus.valid){
      let compania = new Compañia_Autobus();
      compania.actividad = this.formNewCompaniaAutobus.get('actividad')?.value
      compania.ciudadResidencia = this.formNewCompaniaAutobus.get('ciudadResidencia')?.value
      compania.direccion = this.formNewCompaniaAutobus.get('direccion')?.value
      compania.idFormaJuridica = this.formNewCompaniaAutobus.get('idFormaJuridica')?.value
      compania.nit = this.formNewCompaniaAutobus.get('nit')?.value
      compania.nombreCompania = this.formNewCompaniaAutobus.get('nombreCompania')?.value
      compania.telefono = this.formNewCompaniaAutobus.get('telefono')?.value
      this.caService.newCompaniaAutobus(compania).subscribe(res =>{
        this.formNewCompaniaAutobus.reset();
        this.getAllCompaniaAutobus();
      })
    }else{
      this.showMessage('Por favor diligencie todos los datos');
    }
  }


  prueba(){
    let prueba: Autobus = new Autobus()
    this.autobusService.prueba().subscribe(res =>{
      prueba = res;
      console.log(prueba);
      console.log('Aca');
    })
  }
}
