import { Resort as PrismaResort } from '@prisma/client';
import { Filters, Resort, Review } from './interfaces';

export const getFiltersFromQueryParams = (
    params: URLSearchParams,
): Partial<Filters> => {
    const name = params.get('name') ?? undefined;
    const location = params.get('location') ?? undefined;
    const region = params.get('region') ?? undefined;
    const startDate = params.get('startDate')
        ? new Date(params.get('startDate')!)
        : undefined;
    const endDate = params.get('endDate')
        ? new Date(params.get('endDate')!)
        : undefined;
    const adults = params.get('adults')
        ? parseInt(params.get('adults')!)
        : undefined;
    const kids = params.get('kids') ? parseInt(params.get('kids')!) : undefined;
    const babies = params.get('babies')
        ? parseInt(params.get('babies')!)
        : undefined;

    const filters = {
        name,
        location,
        region,
        startDate,
        endDate,
        adults,
        kids,
        babies,
    };

    return Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value !== undefined),
    );
};

export const mapPrismaResortToResort = (
    prismaResorts: PrismaResort[],
): Resort[] => {
    return prismaResorts.map((prismaResort: PrismaResort) => ({
        ...prismaResort,
        images: prismaResort.images as unknown as string[],
        attractions: prismaResort.attractions as unknown as string[],
        importantNotes: prismaResort.importantNotes as unknown as string[],
        reviews: prismaResort.reviews as unknown as Review[],
        breakfast: prismaResort.breakfast ?? undefined,
    }));
};
