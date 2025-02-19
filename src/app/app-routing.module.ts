import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { NuevoUsuarioComponent } from './auth/nuevo-usuario.component';
import { AutobusComponent } from './components/autobus/autobus.component';
import { PersonasComponent } from './components/personas/personas.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { RutasGuardService as guard } from './guards/rutas-guard.service';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'nuevo', component: NuevoUsuarioComponent},
  {path: 'autobus', component: AutobusComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'rutas', component: RutasComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}},
  {path: 'personas', component: PersonasComponent, canActivate: [guard], data: {expectedRol: ['admin', 'user']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
