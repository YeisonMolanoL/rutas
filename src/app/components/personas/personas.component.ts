import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Persona } from 'src/app/modells/Persona';
import { AlmacenamientoService } from 'src/app/services/almacenamiento.service';
import { PersonaServiceService } from 'src/app/services/persona.service.service';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {
  formNewTrabajador: FormGroup;
  imagenPersona: string;
  imagen: string;
  personas: Array<Persona>;
  uploadedFiles: any[] = [];
  isAdmin = false

  constructor(
    private fb: FormBuilder,
    private pService: PersonaServiceService,
    private aService: AlmacenamientoService
  ) {
    this.personas = new Array<Persona>();
    this.imagen = 'http://localhost:8080/imagen/media/perfil-vacio.png';

    this.formNewTrabajador = fb.group({
      noDocumento: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      correoElectronico: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
      //idEntidad_empresa: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
    this.getAllPersonas()    
  }

  getImagen(){
  } 

  getAllPersonas(){
    this.pService.getAllPersonas().subscribe(res =>{
      this.personas = res
      console.log(this.personas);
    })
  }

  newPersona(){
    if(this.formNewTrabajador.valid){
      let personaNueva = new Persona();
      personaNueva.noDocumento = this.formNewTrabajador.get('noDocumento')?.value
      personaNueva.nombre = this.formNewTrabajador.get('nombre')?.value
      personaNueva.apellido = this.formNewTrabajador.get('apellido')?.value
      personaNueva.edad = this.formNewTrabajador.get('edad')?.value
      personaNueva.correoElectronico = this.formNewTrabajador.get('correoElectronico')?.value
      personaNueva.telefono = this.formNewTrabajador.get('telefono')?.value
      personaNueva.imagen = this.imagen
      personaNueva.idEntidad_Empresa = {'idEntidad_Empresa': 1, 'entidad': 'Conductor'}      
      console.log(personaNueva);
      this.pService.newPersona(personaNueva).subscribe(res => {
        this.getAllPersonas();
        this.formNewTrabajador.reset();
        this.imagen = 'http://localhost:8080/imagen/media/perfil-vacio.png';
      })
    }
  }

  onUpload(event: any) {
    const imagen = event.target.files[0];
    if(imagen){
      const formData = new FormData();
      formData.append('file', imagen);

      this.aService.saveImage(formData).subscribe(res => {
        this.imagen = res.url;
      })
    }
  }
  
}
