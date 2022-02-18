import { curry } from 'lodash/fp';
import type { NextApiRequest, NextApiResponse } from 'next';
//@ts-ignore
import asyncPipe from 'pipeawait';
import { CITIES } from 'src/utils/consts';
import { successResponse } from 'src/utils/response.utils';
;

const getCities = async () => {
    return CITIES;
}
   
    
const quotes = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
    const data = await asyncPipe(
        getCities,
        curry(successResponse)(req)
    )(req);
    res.status(200).send(data);
}

export default quotes;