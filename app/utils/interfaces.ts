export interface Resort {
    name: string;
    location: string;
    region: string;
    description: string;
    images: string[];
    phoneNumber: string;
    averageReview: number;
    reviews: Review[];
    aboutUs: string;
    importantNotes: string[];
    attractions: string[];
    breakfast?: number;
}

export interface Review {
    name: string;
    date: Date;
    score: number;
    review: string;
}

export interface Room {
    name: string;
    description: string;
    accessorizes: Accessorizes;
    importantNotes: string[];
    weekdayPrice: number;
    weekendPrice: number;
    maxCapacity: number;
    maxAdults?: number;
    maxKids?: number;
    maxBabies?: number;
}

interface Accessorizes {
    [key: string]: string;
}

export interface Filters {
    name?: string;
    location?: string;
    region?: string;
    startDate?: Date;
    endDate?: Date;
    adults?: number;
    kids?: number;
    babies?: number;
}
