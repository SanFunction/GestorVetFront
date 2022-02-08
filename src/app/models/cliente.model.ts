import { Mascota } from "./mascota.model";


export interface Cliente {
    id?: number
    nombre?: string
    descripcion?: string
    telefono?: string
    mascotas?: Mascota[];
}