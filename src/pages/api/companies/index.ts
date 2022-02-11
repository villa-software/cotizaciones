import type { NextApiRequest, NextApiResponse } from 'next'
import { Company } from '../../../types';
import { companies } from '../../../utils/consts';

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Company[]>
) => {
  res.json(companies);
}
