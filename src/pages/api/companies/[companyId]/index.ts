import type { NextApiRequest, NextApiResponse } from 'next'
import { companies } from 'src/utils/consts';
import { Company } from 'src/types';

const getCompany = async (
  req: NextApiRequest,
  res: NextApiResponse<Company>
) => {
  const { companyId } = req.query;
  const company = companies.find(c => Array.isArray(companyId) ? c.id === parseInt(companyId.join('')) : c.id === parseInt(companyId));
  if (company) {
    res.json(company);
  }
  res.status(404);
}

export default getCompany;
