import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { BadgeModule } from 'primeng/badge';
import { OverlayModule } from 'primeng/overlay';
import { GMapModule } from 'primeng/gmap';
import { TableModule } from 'primeng/table';
import {DataViewModule} from 'primeng/dataview';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CardModule} from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AutobusComponent } from './components/autobus/autobus.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RutasComponent } from './components/rutas/rutas.component';
import { SliderComponent } from './components/slider/slider.component';
import { FormularioDespachoComponent } from './components/formulario-despacho/formulario-despacho.component';
import { MapComponent } from './components/map/map.component';
import { MessageService } from 'primeng/api';
import { TableViewComponent } from './components/table-view/table-view.component';
import { PersonasComponent } from './components/personas/personas.component';
import { GeneralComponent } from './components/general/general.component';
import { LoginComponent } from './auth/login.component';
import { NuevoUsuarioComponent } from './auth/nuevo-usuario.component';
import { interceptorProvider } from './interceptors/rutas-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AutobusComponent,
    PrincipalComponent,
    RutasComponent,
    SliderComponent,
    FormularioDespachoComponent,
    MapComponent,
    TableViewComponent,
    PersonasComponent,
    GeneralComponent,
    LoginComponent,
    NuevoUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    CarouselModule,
    AutoCompleteModule,
    FormsModule,
    BrowserAnimationsModule,
    KeyFilterModule,
    DropdownModule,
    ReactiveFormsModule,
    CheckboxModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    ConfirmPopupModule,
    DialogModule,
    BadgeModule,
    OverlayModule,
    GMapModule,
    TableModule,
    DataViewModule,
    RadioButtonModule,
    CardModule,
    FileUploadModule
  ],
  providers: [AutoCompleteModule, MessageService, interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
