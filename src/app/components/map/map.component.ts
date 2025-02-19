import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Paradero } from 'src/app/modells/Paradero';
import { Ruta } from 'src/app/modells/Ruta';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [MessageService],
})
export class MapComponent implements OnInit {
  options: any;
  //Property Binding
  @Input() overlays?: any[];
  @Input() height?: string;
  @Input() width?: string;
  @Input() latitudParadero: string;
  @Input() longitudParadero: string;
  @Input() zoom: number;
  @Input() nombre: string;
  @Input() paradero: Paradero;

  //Event Binding
  @Output() latitud = new EventEmitter<string>();
  @Output() longitud = new EventEmitter<string>();

  markerTitle?: string;

  selectedPosition: any;

  infoWindow: any;

  draggable?: boolean;
  ruta: Ruta;
  muestra: boolean;

  constructor(private messageService: MessageService) {
    this.ruta = new Ruta();
    this.paradero = new Paradero()
    this.latitudParadero = '';
    this.longitudParadero = '';
    this.overlays = new Array();
  }

  ngOnInit() {    
    if (this.longitudParadero && this.latitudParadero) {
      this.options = {
        center: {
          lat: parseFloat(this.latitudParadero),
          lng: parseFloat(this.longitudParadero),
        },
        zoom: this.zoom,
      };
      this.overlays?.push(
        new google.maps.Marker({
          position: {
            lat: parseFloat(this.latitudParadero),
            lng: parseFloat(this.longitudParadero),
          },
          title: this.markerTitle,
          draggable: this.draggable,
        })
      );
      this.markerTitle == null;
    } else {
      this.options = {
        center: { lat: 5.53961248261512, lng: -73.3595279014337 },
        zoom: this.zoom,
      };
    }
    this.longitud.emit('Longitud');
    this.latitud.emit('Latitud');
    this.initOverlays();
    this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event: any) {
    if (!this.selectedPosition || this.overlays?.length == 0) {
      this.selectedPosition = event.latLng;
      this.latitud.emit(this.selectedPosition.lat());
      this.longitud.emit(this.selectedPosition.lng());
      this.addMarker();
    }
  }

  handleOverlayClick(event: any) {
    let isMarker = event.overlay.getTitle != undefined;

    if (isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('<div>' + title + '</div>');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.messageService.add({
        severity: 'info',
        summary: 'Marker Selected',
        detail: title,
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'Shape Selected',
        detail: '',
      });
    }
  }

  addMarker() {
    if (this.overlays?.length == 0) {
      this.overlays?.push(
        new google.maps.Marker({
          position: {
            lat: this.selectedPosition.lat(),
            lng: this.selectedPosition.lng(),
          },
          title: this.markerTitle,
          draggable: this.draggable,
        })
      );
      this.markerTitle == null;
    }
  }

  handleDragEnd(event: any) {
    this.messageService.add({
      severity: 'info',
      summary: 'Marker Dragged',
      detail: event.overlay.getTitle(),
    });
  }

  initOverlays() {
    if (!this.overlays || !this.overlays.length) {
    }
  }

  zoomIn(map: any) {
    map.setZoom(map.getZoom() + 1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom() - 1);
  }

  clear() {
    this.overlays = [];
  }
}
