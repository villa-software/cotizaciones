import type { NextApiRequest, NextApiResponse } from 'next'
import { Company } from '../../../types';
import { companies } from '../../../utils/consts';

const getCompanies = async (
  req: NextApiRequest,
  res: NextApiResponse<Company[]>
) => {
  res.json(companies);
}

export default getCompanies;
