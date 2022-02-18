import { NextApiRequest } from "next";
import { ApiResponse, Quote } from "src/types";

export const successResponse = (request: NextApiRequest, data: Quote[]) : ApiResponse => ({
    success: true,
    code: request.url || '',
    data
});
