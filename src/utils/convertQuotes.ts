import { Currencies, Quote } from "src/types";

export const convertQuote = (from: Currencies, to: Currencies, data: Quote) => {
    const conversions = {
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

    return conversions[from][to];
};