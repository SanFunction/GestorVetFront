import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";
import { Cliente } from "./cliente.model";
import { Diagnostico } from "./diagnostico.model";


export interface Mascota{
    id?: number
    nombre?: string
    color?:string
    edad?: string
    foto?:string
    peso?:string
    raza?:string
    especie?:string
    diagnostico?:Diagnostico
    propietario?: Cliente

}