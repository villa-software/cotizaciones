import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { CHACO_OFFICES, SANTA_RITA_CAMBIOS_OFFICES } from 'src/utils/consts';
//@ts-ignore
import asyncPipe from 'pipeawait';
import { curry, map } from 'lodash/fp';
import { successResponse } from 'src/utils/response.utils';
;
const getChaco = async () => 
    await Promise.all(CHACO_OFFICES.map(async office => await axios.get(`https://www.cambioschaco.com.py/api/branch_office/${office.branchId}/exchange`)))

const mapChaco = (item:any) => ({ 
    company: "CHACO",
    office: CHACO_OFFICES.find(office => office.branchId === parseInt(item.data.branchOfficeId)),
    branchOfficeId: item.data.branchOfficeId,
    dollar: item.data.items.find((currency:any) => currency.isoCode === 'USD').purchasePrice,
    real: item.data.items.find((currency:any) => currency.isoCode === 'BRL').purchasePrice,
});

const getSantaRita = async (currentValues: Array<any>) => {
    const santaRitaData = await Promise.all(SANTA_RITA_CAMBIOS_OFFICES.map(async office => {
        const item = await axios.get(`http://admin.santaritacambios.com.py/rest/get-quotes?s=${office.branchId}`);
        return { 
            company: "SANTA RITA CAMBIOS",
            office,
            branchOfficeId: 0,
            dollar: parseInt(item.data.quotes['USDxPYG'].amount_buy),
            real: parseInt(item.data.quotes['BRLxPYG'].amount_buy),
        };
    }));
    return [...currentValues, ...santaRitaData];
}
   
    
const quotes = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
    const data = await asyncPipe(
        getChaco,
        map(mapChaco),
        getSantaRita,
        curry(successResponse)(req)
    )(req);
    res.status(200).send(data);
}

export default quotes;