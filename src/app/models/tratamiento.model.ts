import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";

export interface Tratamiento {
    id?: number
    detalle?: string
    precio?: string
    tipoTratamiento?:string
    diagnosticoId?:number;
}