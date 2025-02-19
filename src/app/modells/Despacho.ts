import { Autobus } from "./Autobus";
import { Ruta } from "./Ruta";

export class Despacho{
    public idDespacho?: number;
    public horaSalida?: Date;
    public idAutobus?: Autobus;
    public idRuta?: Ruta;
}