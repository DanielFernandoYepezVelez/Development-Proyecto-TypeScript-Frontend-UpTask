/* Modelo Que Me permite Tener Disponible Los Nombres
De Los Proyectos Creados En Todo El Proyecto UPTASK,
Con Ayuda De Los Servicios, Por Que Los Servicios
Son Singleton Y Eso Me Permite Que Al Modificar
Este Arreglo De Nombres, Se Modifique Automaticamente
En Cualquier Lugar Donde Se Tenga Una Instancia
De Este Modelo, Que En teoria Se Instancia
Una Sola Vez En Un Servicio, Pero Gracias
A la Habilidad Singleton De Los Servicios, Puedo
A puntar A La Misma Referencia De Memoria, Donde
Tenga Solicitado El Servicio Donde Se Instancio Este Modelo.
*/
export class Project {
  constructor(public projectNames: string[], public projectsId: number[]) { }
}