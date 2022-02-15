import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { CHACO_OFFICES, SANTA_RITA_CAMBIOS_OFFICES } from 'src/utils/consts';

const quotes = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
    const chaco = await Promise.all(CHACO_OFFICES.map(async office => await axios.get(`https://www.cambioschaco.com.py/api/branch_office/${office.branchId}/exchange`)));
    const chacoData = chaco.map(item => ({ 
        office: CHACO_OFFICES.find(office => office.branchId === item.data.branchOfficeId),
        branchOfficeId: item.data.branchOfficeId,
        dollar: item.data.items.find((currency:any) => currency.isoCode === 'USD'),
        real: item.data.items.find((currency:any) => currency.isoCode === 'BRL'),
    }));
    const santaRita = await Promise.all(SANTA_RITA_CAMBIOS_OFFICES.map(async office => await axios.get(`http://admin.santaritacambios.com.py/rest/get-quotes?s=${office.branchId}`)));
    const santaData = santaRita.map(item =>  ({ 
        office: SANTA_RITA_CAMBIOS_OFFICES.find(office => office.branchId === item.data.branchOfficeId),
        // branchOfficeId: item.data.branchOfficeId,
        // dollar: item.data.items.find((currency:any) => currency.isoCode === 'USD'),
        // real: item.data.items.find((currency:any) => currency.isoCode === 'BRL'),
    }));

    const response = {
        
    }
    res.status(200).send(response);
}

export default quotes;