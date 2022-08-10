import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { CETEG_OFFICES, CHACO_OFFICES, CITIES, SANTA_RITA_CAMBIOS_OFFICES } from 'src/utils/consts';
//@ts-ignore
import asyncPipe from 'pipeawait';
import { curry, map, filter } from 'lodash/fp';
import { successResponse } from 'src/utils/response.utils';
import { Office, Quote } from 'src/types';
import { currencyMaskToNumber } from 'src/utils/currency';
;

const mapChaco = (item: any): Quote | undefined => {
    if (item.data.length === 0) {
        return;
    }
    const office = CHACO_OFFICES.find(office => office.branchId === parseInt(item.data.branchOfficeId));
    return {
        company: "CHACO",
        office,
        city: CITIES.find(city => city.id === office?.city),
        branchOfficeId: item.data.branchOfficeId,
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
        branchOfficeId: stOffice.branchId,
        city: CITIES.find(city => city.id === stOffice.city),
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

enum CETEG_CURRENCY_ID {
    USD = "1",
    BRL = "2",
    ARS = "3",
    PYG = "5"
}

const mapCeteg = (item, cetegOffice): Quote => {
    return {
        company: "CETEG CAMBIOS SA",
        office: cetegOffice,
        branchOfficeId: cetegOffice.branchId,
        city: CITIES.find((city) => city.id === cetegOffice.city),
        usd: {
            purchasePrice: currencyMaskToNumber(item.data.find(
                (item) =>
                    item.idmoneda1 === CETEG_CURRENCY_ID.USD &&
                    item.idmoneda2 == CETEG_CURRENCY_ID.PYG
            ).compra),
            salePrice: currencyMaskToNumber(item.data.find(
                (item) =>
                    item.idmoneda1 === CETEG_CURRENCY_ID.USD &&
                    item.idmoneda2 == CETEG_CURRENCY_ID.PYG
            ).venta)
        },
        brl: {
            purchasePrice: currencyMaskToNumber(item.data.find(
                (item) =>
                    item.idmoneda1 === CETEG_CURRENCY_ID.BRL &&
                    item.idmoneda2 == CETEG_CURRENCY_ID.PYG
            ).compra),
            salePrice: currencyMaskToNumber(item.data.find(
                (item) =>
                    item.idmoneda1 === CETEG_CURRENCY_ID.BRL &&
                    item.idmoneda2 == CETEG_CURRENCY_ID.PYG
            ).venta)
        },
        ars: {
            purchasePrice: currencyMaskToNumber(item.data.find(
                (item) =>
                    item.idmoneda1 === CETEG_CURRENCY_ID.ARS &&
                    item.idmoneda2 == CETEG_CURRENCY_ID.PYG
            ).compra),
            salePrice: currencyMaskToNumber(item.data.find(
                (item) =>
                    item.idmoneda1 === CETEG_CURRENCY_ID.ARS &&
                    item.idmoneda2 == CETEG_CURRENCY_ID.PYG
            ).venta)
        },
        eur: {
            purchasePrice: 0,
            salePrice: 0
        },
        defaultCurrency: "PYG"
    };
};

const getDefaultCityOffices = async () => {
    const defaultCity = CITIES.find(city => city.default);
    const chacoOffices = CHACO_OFFICES.filter(office => office.city === defaultCity?.id);
    const santaRitaOffices = SANTA_RITA_CAMBIOS_OFFICES.filter(office => office.city === defaultCity?.id);
    const cetegOffices = CETEG_OFFICES.filter(office => office.city === defaultCity?.id)

    const chacoData = await Promise.all(chacoOffices.map(async office => axios.get(`https://www.cambioschaco.com.py/api/branch_office/${office.branchId}/exchange`)));
    const santaRitaData: Quote[] = [];
    for (let index = 0; index < santaRitaOffices.length; index++) {
        const stOffice = santaRitaOffices[index];
        const santaRita = await axios.get(`http://admin.santaritacambios.com.py/rest/get-quotes?s=${stOffice.branchId}`);
        santaRitaData.push(mapSantaRita(santaRita, stOffice));
    }

    const cetegData: Quote[] = []
    for (let index = 0; index < cetegOffices.length; index++) {
        const cetegOffice = cetegOffices[index];
        const { data } = await axios.get(`https://www.ceteg.com.py/api/cotizacion/${cetegOffice.branchId}`);
        cetegData.push(mapCeteg(data, cetegOffice));
    }

    const result = [...chacoData.map(mapChaco), ...santaRitaData, ...cetegData];
    return result;
}

const quotes = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    const data = await asyncPipe(
        getDefaultCityOffices,
        curry(successResponse)(req)
    )(req);
    res.status(200).send(data);
}

export default quotes;