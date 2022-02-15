
export type Company = {
    id: number;
    name: string;
    baseUrl: string;
    paths: any;
};

export type City = {
    id: number;
    name: string;
};

export type Office = {
    id: number;
    name: string;
    city: number;
    branchId: number;
};

export type Languages = "pt" | "es"