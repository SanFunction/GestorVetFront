import { Mascota } from "./mascota.model";
import { Veterinario } from "./veterinario.model";

export interface Diagnostico {
    id?: number
    enfermedad?: string
    estado?: string
    fecha?: any
    mascota?: Mascota[]
    tratamiento?: String
    veterinario?: Veterinario



}