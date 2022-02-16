// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { companies } from 'src/utils/consts';

const getOffices = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { companyId } = req.query;
  const company = companies.find(c => Array.isArray(companyId) ? c.id === parseInt(companyId.join('')) : c.id === parseInt(companyId));
  if (company) {
    await axios
      .get(`${company.baseUrl}/branch_office`)
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch(({ err }) => {
        res.status(400).json({ err })
      })
  }
  res.status(404);
}

export default getOffices;
