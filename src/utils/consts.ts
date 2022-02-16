import { City, Company, Office } from "../types";

export const companies: Company[] = [{
    id: 1,
    name: 'Cambios Chaco',
    baseUrl: 'https://www.cambioschaco.com.py/api',
    paths: {
        offices: '/branch_office'
    },
}, {
    id: 2,
    name: 'Santa Rita Cambios',
    baseUrl: 'http://admin.santaritacambios.com.py/rest',
    paths: {
        offices: ''
    }
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

export const SANTA_RITA_CAMBIOS_OFFICES: Office[] = [
    { id: 1, branchId: 1, name: 'Matrix', city: 1 },
    { id: 2, branchId: 2, name: 'Santa Rosa', city: 1 },
    { id: 3, branchId: 3, name: 'Katuete', city: 1 },
    { id: 4, branchId: 5, name: 'Santa Rita', city: 1 },
];
export const CHACO_OFFICES: Office[] = [
    { id: 1, branchId: 1, name: 'Casa Central - Asuncion', city: 1 },
    { id: 2, branchId: 2, name: 'Shopping Villa Morra - Asuncion', city: 1 },
    { id: 3, branchId: 3, name: 'Shopping Multiplaza - Asuncion', city: 1 },
    { id: 4, branchId: 30, name: 'Palma', city: 1 },
    // { id: 5, branchId: , name: 'Agencia San Lorenzo', city: 2 },
    // { id: 6, branchId: , name: 'Aeropuerto Intl Silvio Pettirossi', city: 3 },
    // { id: 7, branchId: , name: 'Ag. Plaza Madero', city: 3 },
    // { id: 8, branchId: , name: 'Paseo Lambaré', city: 4 },
    // { id: 9, branchId: , name: 'Sucursal Adrián Jara - CDE', city: 5 },
    // { id: 10, branchId: , name: 'Supercarretera KM 4 - CDE', city: 5 },
    // { id: 11, branchId: , name: 'Itá Ybate - CDE', city: 5 },
    // { id: 12, branchId: , name: 'Ag. Shopping Jesuiticas', city: 5 },
    // { id: 13, branchId: , name: 'Noblesse - KM 3,5 - CDE', city: 5 },
    // { id: 14, branchId: , name: 'CDE - Agencia Ita Piru', city: 5 },
    // { id: 15, branchId: , name: 'Agencia CDE - Km7 - 2', city: 5 },
    // { id: 16, branchId: , name: 'Hernandarias', city: 6 },
    // { id: 17, branchId: , name: 'Itaipú', city: 6 },
    // { id: 18, branchId: , name: 'Sucursal Super 6 - ENC', city: 7 },
    // { id: 19, branchId: , name: 'Zona Alta - ENC', city: 7 },
    // { id: 20, branchId: , name: 'EBY  Circuito Comercial - ENC', city: 7 },
    // { id: 21, branchId: , name: 'Sucursal Santa Rita', city: 8 },
    // { id: 22, branchId: , name: 'Sucursal Pedro Juan Caballero', city: 9 },
    // { id: 23, branchId: , name: 'Agencia Pedro Juan Caballero', city: 9 },
];




						