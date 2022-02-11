// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

type Data = {
  name: string
}

const CAMBIOS_CHACO_URL = `https://www.cambioschaco.com.py/api/branch_office/1/exchange`;
const SANTA_RITA_CAMBIOS_URL = `http://admin.santaritacambios.com.py/rest/get-quotes?s=3`;

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const a = await axios
    .get(CAMBIOS_CHACO_URL)
    .then(({ data }) => {
      //@ts-ignore
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      //@ts-ignore
      res.status(400).json({ err })
    })
    //@ts-ignore
    res.json(a);
  // res.status(200).json({ name: 'John Doe' })
}
