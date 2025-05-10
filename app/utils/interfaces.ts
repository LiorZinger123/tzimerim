export interface NewTzimer {
    name: string;
    description: string;
    location: string;
    region: string;
}

export interface Tzimer extends NewTzimer {
    id: number;
}
