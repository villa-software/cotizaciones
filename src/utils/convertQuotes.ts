import { Currencies, Quote } from "src/types";

type ConvertedQuote = {
    purchasePrice: number;
    salePrice: number;
}

type Conversions = {
    pyg: any;
    brl: any;
    usd: any;
}

export const convertQuote = (from: Currencies, to: Currencies, data: Quote): ConvertedQuote => {
    const conversions: Conversions = {
        pyg: {
            usd: {
                purchasePrice: 1 / data.usd.purchasePrice,
                salePrice: 1 / data.usd.salePrice
            },
            brl: {
                purchasePrice: 1 / data.brl.purchasePrice,
                salePrice: 1 / data.brl.salePrice
            }
        },
        brl: {
            pyg: {
                purchasePrice: data.brl.purchasePrice,
                salePrice: data.brl.salePrice
            },
            usd: {
                purchasePrice: data.brl.purchasePrice / data.usd.purchasePrice,
                salePrice: data.brl.salePrice / data.usd.salePrice
            }
        },
        usd: {
            pyg: {
                purchasePrice: data.usd.purchasePrice,
                salePrice: data.usd.salePrice
            },
            brl: {
                purchasePrice: data.usd.purchasePrice / data.brl.purchasePrice,
                salePrice: data.usd.salePrice / data.brl.salePrice
            }
        }
    };

    const result: ConvertedQuote = conversions[from][to];
    return result;
};