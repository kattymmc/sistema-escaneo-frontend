export class TipoDocumento {
    id?: number;
    descripcion: string;

    constructor(descripcion: string) {
        this.descripcion = descripcion;
    }
    /*constructor(id: number) {
        this.id = id;
    }*/

}