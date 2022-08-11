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
    { id: 1, name: 'Asunción' },
    { id: 2, name: 'San Lorenzo' },
    { id: 3, name: 'Luque' },
    { id: 4, name: 'Lambaré' },
    { id: 5, name: 'Ciudad del Este' },
    { id: 6, name: 'Hernandarias' },
    { id: 7, name: 'Encarnación' },
    { id: 8, name: 'Santa Rita', default: true },
    { id: 9, name: 'Pedro Juan Caballero' },
    { id: 10, name: 'Katuete' },
    { id: 11, name: 'Santa Rosa' },
];

export const SANTA_RITA_CAMBIOS_OFFICES: Office[] = [
    { id: 1, branchId: 1, name: 'Matrix', city: 1 },
    { id: 2, branchId: 2, name: 'Santa Rosa', city: 11 },
    { id: 3, branchId: 3, name: 'Katuete', city: 10 },
    { id: 4, branchId: 5, name: 'Santa Rita', city: 8 },
];
export const CHACO_OFFICES: Office[] = [
    { id: 5, branchId: 1, name: 'Casa Central - Asuncion', city: 1 },
    { id: 6, branchId: 2, name: 'Shopping Villa Morra - Asuncion', city: 1 },
    { id: 7, branchId: 3, name: 'Shopping Multiplaza - Asuncion', city: 1 },
    { id: 8, branchId: 30, name: 'Palma', city: 1 },
    { id: 9, branchId: 6, name: 'Agencia San Lorenzo', city: 2 },
    { id: 10, branchId: 7, name: 'Aeropuerto Intl Silvio Pettirossi', city: 3 },
    { id: 11, branchId: 14, name: 'Ag. Plaza Madero', city: 3 },
    { id: 12, branchId: 8, name: 'Paseo Lambaré', city: 4 },
    { id: 13, branchId: 9, name: 'Sucursal Adrián Jara - CDE', city: 5 },
    { id: 14, branchId: 10, name: 'Supercarretera KM 4 - CDE', city: 5 },
    { id: 11, branchId: 11, name: 'Itá Ybate - CDE', city: 5 },
    { id: 15, branchId: 12, name: 'Ag. Shopping Jesuiticas', city: 5 },
    { id: 16, branchId: 13, name: 'Noblesse - KM 3,5 - CDE', city: 5 },
    /* { id: 17, branchId: 16, name: 'CDE - Agencia Ita Piru', city: 5 }, */
    { id: 18, branchId: 32, name: 'Agencia CDE - Km7 - 2', city: 5 },
    { id: 19, branchId: 20, name: 'Hernandarias', city: 6 },
    /* { id: 20, branchId: 22, name: 'Itaipú', city: 6 }, */
    { id: 21, branchId: 23, name: 'Sucursal Super 6 - ENC', city: 7 },
    /* { id: 22, branchId: 24, name: 'Zona Alta - ENC', city: 7 }, */
    /*     { id: 23, branchId: 19, name: 'EBY  Circuito Comercial - ENC', city: 7 }, */
    { id: 24, branchId: 27, name: 'Sucursal Santa Rita', city: 8 },
    { id: 25, branchId: 28, name: 'Sucursal Pedro Juan Caballero', city: 9 },
    { id: 26, branchId: 29, name: 'Agencia Pedro Juan Caballero', city: 9 },
];
export const CETEG_OFFICES: Office[] = [
    { id: 1, branchId: 19, name: 'Santa Rita', city: 8 },
]




