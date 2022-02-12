
export type Company = {
    id: number;
    name: string;
    baseUrl: string;
};

export type City = {
    id: number;
    name: string;
};

export type Office = {
    id: number;
    name: string;
    city: number;
    company: number;
};

export type Languages = "pt" | "es"