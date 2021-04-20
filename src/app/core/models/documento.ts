import { TipoDocumento } from "./tipo-documento";
import {Imagen } from "./imagen";

export class Documento {
    id?: number;
    codigoDoc: string;
    descripcion: string;
    dateCreated: Date;
    tipoDocumento: TipoDocumento;
    imagenes?: Imagen[];

    constructor(codigoDoc: string, descripcion: string, tipoDocumento: TipoDocumento) {
        this.codigoDoc = codigoDoc;
        this.descripcion = descripcion;
        this.tipoDocumento = tipoDocumento
    }
}
