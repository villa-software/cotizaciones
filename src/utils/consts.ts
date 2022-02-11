import { City, Company, Office } from "../types";

export const companies: Company[] = [{
    id: 1,
    name: 'Cambios Chaco',
    baseUrl: 'https://www.cambioschaco.com.py/api',
}, {
    id: 2,
    name: 'Santa Rita Cambios',
    baseUrl: 'http://admin.santaritacambios.com.py/rest',
}];

export const CITIES: City[] = [
    { id: 1,name: 'Asunción' },
    { id: 2,name: 'San Lorenzo' },
    { id: 3,name: 'Luque' },
    { id: 4,name: 'Lambaré' },
    { id: 5,name: 'Ciudad del Este' },
    { id: 6,name: 'Hernandarias' },
    { id: 7,name: 'Encarnación' },
    { id: 8,name: 'Santa Rita' },
    { id: 9,name: 'Pedro Juan Caballero' },
];

export const OFFICES: Office[] = [
    { id: 1, company: 1, name: 'Casa Central - Asuncion', city: 1 },
    { id: 2, company: 1, name: 'Shopping Villa Morra - Asuncion', city: 1 },
    { id: 3, company: 1, name: 'Shopping Multiplaza - Asuncion', city: 1 },
    { id: 4, company: 1, name: 'Palma', city: 1 },
    { id: 5, company: 1, name: 'Agencia San Lorenzo', city: 2 },
    { id: 6, company: 1, name: 'Aeropuerto Intl Silvio Pettirossi', city: 3 },
    { id: 7, company: 1, name: 'Ag. Plaza Madero', city: 3 },
    { id: 8, company: 1, name: 'Paseo Lambaré', city: 4 },
    { id: 9, company: 1, name: 'Sucursal Adrián Jara - CDE', city: 5 },
    { id: 10, company: 1, name: 'Supercarretera KM 4 - CDE', city: 5 },
    { id: 11, company: 1, name: 'Itá Ybate - CDE', city: 5 },
    { id: 12, company: 1, name: 'Ag. Shopping Jesuiticas', city: 5 },
    { id: 13, company: 1, name: 'Noblesse - KM 3,5 - CDE', city: 5 },
    { id: 14, company: 1, name: 'CDE - Agencia Ita Piru', city: 5 },
    { id: 15, company: 1, name: 'Agencia CDE - Km7 - 2', city: 5 },
    { id: 16, company: 1, name: 'Hernandarias', city: 6 },
    { id: 17, company: 1, name: 'Itaipú', city: 6 },
    { id: 18, company: 1, name: 'Sucursal Super 6 - ENC', city: 7 },
    { id: 19, company: 1, name: 'Zona Alta - ENC', city: 7 },
    { id: 20, company: 1, name: 'EBY  Circuito Comercial - ENC', city: 7 },
    { id: 21, company: 1, name: 'Sucursal Santa Rita', city: 8 },
    { id: 22, company: 1, name: 'Sucursal Pedro Juan Caballero', city: 9 },
    { id: 23, company: 1, name: 'Agencia Pedro Juan Caballero', city: 9 },
];




						