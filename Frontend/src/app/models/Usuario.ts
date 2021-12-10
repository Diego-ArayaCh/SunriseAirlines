import { Direccion } from "./Direccion";

export class Usuario{
    _id?:number;
    rol:number;
    usuario:string;
    pwd:string;
    nombre:string;
    apellidos:string;
    correo:string;
    fech_nacimiento:Date;
    tel_trabajo:string;
    tel_celular:string;
    estado:number;
    direccion: Direccion;

    constructor(id:number, rol:number,  usuario:string,pwd:string,
         nombre:string, apellidos:string, correo:string, fech_nacimiento:Date,
          tel_trabajo:string, tel_celular:string, estado:number,direccion:Direccion ){

        this._id = id;
        this.rol = rol;
        this.usuario = usuario;
        this.pwd = pwd;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.fech_nacimiento = fech_nacimiento;
        this.tel_trabajo = tel_trabajo;
        this.tel_celular = tel_celular;
        this.estado = estado;
        this.direccion = direccion;
        




    }
}