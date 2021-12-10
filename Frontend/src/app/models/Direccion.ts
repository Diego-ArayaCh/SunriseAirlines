export class Direccion{
    _id?:number;
    sennas:string;
    latitud:string;
    longitud:string;
    

    constructor(id:number, sennas:string,  latitud:string,longitud:string){

        this._id = id;
        this.sennas = sennas;
        this.latitud = latitud;
        this.longitud = longitud;
        




    }
}