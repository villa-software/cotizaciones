import axios from 'axios';
import { curry } from 'lodash/fp';
import type { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import asyncPipe from 'pipeawait';
import { Office, Quote } from 'src/types';
import { CHACO_OFFICES, CITIES, SANTA_RITA_CAMBIOS_OFFICES } from 'src/utils/consts';
import { successResponse } from 'src/utils/response.utils';
;
const mapChaco = (item: any): Quote | undefined => {
    if (item.data.length === 0) {
        return;
    }
    const office = CHACO_OFFICES.find(office => office.branchId === parseInt(item.data.branchOfficeId));
    return {
        company: "CHACO",
        office,
        branchOfficeId: item.data.branchOfficeId,
        city: CITIES.find(city => city.id === office?.city),
        usd: {
            purchasePrice: item.data.items.find((currency: any) => currency.isoCode === 'USD').purchasePrice,
            salePrice: item.data.items.find((currency: any) => currency.isoCode === 'USD').salePrice,
        },
        brl: {
            purchasePrice: item.data.items.find((currency: any) => currency.isoCode === 'BRL').purchasePrice,
            salePrice: item.data.items.find((currency: any) => currency.isoCode === 'BRL').salePrice,
        },
        ars: {
            purchasePrice: item.data.items.find((currency: any) => currency.isoCode === 'ARS').purchasePrice,
            salePrice: item.data.items.find((currency: any) => currency.isoCode === 'ARS').salePrice,
        },
        eur: {
            purchasePrice: item.data.items.find((currency: any) => currency.isoCode === 'EUR').purchasePrice,
            salePrice: item.data.items.find((currency: any) => currency.isoCode === 'EUR').salePrice,
        },
        defaultCurrency: 'PYG'
    }
};
const mapSantaRita = (item: any, stOffice: Office): Quote => {
    return {
        company: "SANTA RITA CAMBIOS",
        office: stOffice,
        city: CITIES.find(city => city.id === stOffice.city),
        branchOfficeId: stOffice.branchId,
        usd: {
            purchasePrice: parseInt(item.data.quotes['USDxPYG'].amount_buy),
            salePrice: parseInt(item.data.quotes['USDxPYG'].amount_sell),
        },
        brl: {
            purchasePrice: parseInt(item.data.quotes['BRLxPYG'].amount_buy),
            salePrice: parseInt(item.data.quotes['BRLxPYG'].amount_sell),
        },
        ars: {
            purchasePrice: parseInt(item.data.quotes['ARSxPYG'].amount_buy),
            salePrice: parseInt(item.data.quotes['ARSxPYG'].amount_sell),
        },
        eur: {
            purchasePrice: parseInt(item.data.quotes['EURxPYG'].amount_buy),
            salePrice: parseInt(item.data.quotes['EURxPYG'].amount_sell),
        },
        defaultCurrency: 'PYG'
    };
};

const getCityOffices = async (req: NextApiRequest) => {
    const { ids } = req.query;
    const cities = CITIES
        .filter(city => {
            if (Array.isArray(ids)) {
                const idsNumber = ids.map(id => parseInt(id));
                return idsNumber.includes(city.id);
            }
            return parseInt(ids) === city.id;
        })
        .map(city => city.id);
    const chacoOffices = CHACO_OFFICES.filter(office => cities.includes(office.city));
    const santaRitaOffices = SANTA_RITA_CAMBIOS_OFFICES.filter(office => cities.includes(office.city));

    const chacoData = await Promise.all(chacoOffices.map(async office => axios.get(`https://www.cambioschaco.com.py/api/branch_office/${office.branchId}/exchange`)));
    const sanaRitaData: Quote[] = [];
    for (let index = 0; index < santaRitaOffices.length; index++) {
        const stOffice = santaRitaOffices[index];
        const santaRita = await axios.get(`http://admin.santaritacambios.com.py/rest/get-quotes?s=${stOffice.branchId}`);
        sanaRitaData.push(mapSantaRita(santaRita, stOffice));
    }

    const result = [...chacoData.map(mapChaco), ...sanaRitaData];
    return result;
}

const quotes = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const data = await asyncPipe(
        getCityOffices,
        curry(successResponse)(req)
    )(req);
    res.status(200).send(data);
}

export default quotes;