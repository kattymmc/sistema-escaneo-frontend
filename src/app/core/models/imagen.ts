import { Documento } from "./documento";

export class Imagen {
  id?: number;
  nombre: string;
  documento: Documento

  constructor(nombre: string, documento: Documento){
    this.nombre = nombre;
    this.documento = documento;
}

}
