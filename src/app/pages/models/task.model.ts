/* Modelo Que Me permite Tener Disponible Las Propiedades
De Los Tareas Creados En Todo El Proyecto UPTASK,
Con Ayuda De Los Servicios, Por Que Los Servicios
Son Singleton Y Eso Me Permite Que Al Modificar
Este Arreglo De Tareas, Se Modifique Automaticamente
En Cualquier Lugar Donde Se Tenga Una Instancia
De Este Modelo, Que En teoria Se Instancia
Una Sola Vez En Un Servicio, Pero Gracias
A la Habilidad Singleton De Los Servicios, Puedo
A puntar A La Misma Referencia De Memoria, Donde
Tenga Solicitado El Servicio Donde Se Instancio Este Modelo.
*/
export class Task {
    constructor(public taskIds: number[], public taskNames: string[], public taskStates: number[], public projectId: number) { }
  }