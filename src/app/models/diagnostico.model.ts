import { StringMapWithRename } from "@angular/compiler/src/compiler_facade_interface";
import { Tratamiento } from "./tratamiento.model";
import { Veterinario } from "./veterinario.model";

export interface Diagnostico {
    id?: number
    enfermedad?: string
    tratamiento?:Tratamiento
    veterinario?: Veterinario
}