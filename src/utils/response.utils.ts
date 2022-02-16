import { NextApiRequest } from "next";

export const successResponse = (request: NextApiRequest, data: any) => ({
    success: true,
    code: request.url,
    data
});
