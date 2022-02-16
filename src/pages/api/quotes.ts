import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { CHACO_OFFICES, SANTA_RITA_CAMBIOS_OFFICES } from 'src/utils/consts';

const quotes = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
    const chaco = await Promise.all(CHACO_OFFICES.map(async office => await axios.get(`https://www.cambioschaco.com.py/api/branch_office/${office.branchId}/exchange`)));
    const chacoData = chaco.map(item => ({ 
        company: "CHACO",
        office: CHACO_OFFICES.find(office => office.branchId === parseInt(item.data.branchOfficeId)),
        branchOfficeId: item.data.branchOfficeId,
        dollar: item.data.items.find((currency:any) => currency.isoCode === 'USD').purchasePrice,
        real: item.data.items.find((currency:any) => currency.isoCode === 'BRL').purchasePrice,
    }));
    const santaRita = await Promise.all(SANTA_RITA_CAMBIOS_OFFICES.map(async office => {
        const item = await axios.get(`http://admin.santaritacambios.com.py/rest/get-quotes?s=${office.branchId}`);
        return { 
            company: "SANTA RITA CAMBIOS",
            office,
            branchOfficeId: 0,
            dollar: parseInt(item.data.quotes['USDxPYG'].amount_buy),
            real: parseInt(item.data.quotes['BRLxPYG'].amount_buy),
        };
    }));

    const response = [...chacoData, ...santaRita];
    res.status(200).send(response);
}

export default quotes;