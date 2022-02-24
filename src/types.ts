
export type Company = {
    id: number;
    name: string;
    baseUrl: string;
    paths: any;
};

export type City = {
    id: number;
    name: string;
    default?: boolean;
};

export type Office = {
    id: number;
    name: string;
    city: number;
    branchId: number;
};

export type QuoteCurrency = {
    purchasePrice: number;
    salePrice: number;
}

export type Quote = {
    company: string;
    office: Office;
    city: City;
    branchOfficeId: string;
    usd: QuoteCurrency;
    brl: QuoteCurrency;
    ars: QuoteCurrency;
    eur: QuoteCurrency;
}

export type ApiResponse = {
    success: boolean;
    code: string;
    data: Array<Quote>;
}

export type Languages = "pt" | "es"

export type Currencies = "USD" | "BRL" | "PYG"