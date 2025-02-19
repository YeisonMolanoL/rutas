import { Entidad_Empresa } from "./Entidad_Empresa";

export class Persona{
    public noDocumento?: number;
    public nombre?: string;
    public apellido? : string;
    public correoElectronico?: string;
    public telefono? : string;
    public imagen? : string;
    public edad? : Date;
    public isTrabajador? : number;
    public idEntidad_Empresa?: Entidad_Empresa;
}