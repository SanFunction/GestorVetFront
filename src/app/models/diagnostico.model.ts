import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";
import { Mascota } from "./mascota.model";
import { Tratamiento } from "./tratamiento.model";
import { Veterinario } from "./veterinario.model";

export interface Diagnostico {
    id?: number
    enfermedad?: string
    estado?: string
    fecha?: Date | string
    mascota?: Mascota[]
    tratamiento?: String
    veterinario?: any



}