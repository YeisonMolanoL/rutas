import { Compañia_Autobus } from "./Compañia_Autobus";
import { Entidad_Empresa } from "./Entidad_Empresa";
import { EstadoAutobus } from "./EstadoAutobus";
import { Iniciales_Placa } from "./Iniciales_Placa";
import { Persona } from "./Persona";

export class Autobus{
    public idAutobus? : number;
    public idMiRuta? : string;
    public soat? : boolean;
    public tecnomecanica? : boolean;
    public numericPlaca? : number;
    public idInicialPlaca?: Iniciales_Placa;
    public idCompaniaAutobus?: Compañia_Autobus;
    public imagen?: string;
    public capacidadMaxima?: number;
    public placanumero?: string;
    public idEstadoAutobus?: EstadoAutobus;
}