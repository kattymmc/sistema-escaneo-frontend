import { TipoDocumento } from "./tipo-documento";

export class Documento {
    id?: number;
    codigoDoc: string;
    descripcion: string;
    //tipoDocumento: TipoDocumento;
    
    constructor(codigoDoc: string, descripcion: string){
        this.codigoDoc = codigoDoc;
        this.descripcion = descripcion;
        //this.tipoDocumento = tipoDocumento;
    }
}