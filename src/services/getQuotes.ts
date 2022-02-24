import { ApiResponse } from "src/types";

export const getQuotes = async (cityId: number | undefined) => {
    if (!cityId) return []

    const jsonData = await fetch(
        process.env.NODE_ENV === "production"
            ? `https://cotizacionespy.vercel.app/api/quotes/${cityId}`
            : `http://localhost:3000/api/quotes/${cityId}`
    );


    const { data }: ApiResponse = await jsonData.json();

    return data
};