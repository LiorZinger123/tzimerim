export interface UnavailableDate {
    checkIn: string | Date;
    checkOut: string | Date;
}

export interface NewTzimer {
    name: string;
    description: string;
    location: string;
    unavailableDates: UnavailableDate[];
}

export interface Tzimer extends NewTzimer {
    siteId: string;
}
