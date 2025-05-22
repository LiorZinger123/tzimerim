import { Prisma } from '@prisma/client';
import prisma from '../lib/prismaClient';
import { Filters, Resort, Room } from '../utils/interfaces';
import { mapPrismaResortToResort } from '../utils/helper';

export const getResortsBySearch = async (search: string): Promise<string[]> => {
    try {
        const resorts = await prisma.resort.findMany({
            where: {
                name: {
                    contains: search,
                },
            },
            select: {
                name: true,
            },
        });

        return resorts.map((resort: { name: string }) => resort.name);
    } catch (error) {
        throw error;
    }
};

export const getFilteredResorts = async (
    filters: Partial<Filters>,
): Promise<Resort[]> => {
    try {
        const baseRoomFilter = {
            ...(filters.adults && { maxAdults: { gte: filters.adults } }),
            ...(filters.kids && { maxKids: { gte: filters.kids } }),
            ...(filters.babies && { maxBabies: { gte: filters.babies } }),
            ...(filters.startDate &&
                filters.endDate && {
                    bookings: {
                        none: {
                            AND: [
                                { startDate: { lte: filters.endDate } },
                                { endDate: { gte: filters.startDate } },
                            ],
                        },
                    },
                }),
        };

        const where = filters.name
            ? {
                  name: {
                      contains: filters.name,
                  },
                  ...(Object.keys(baseRoomFilter).length && {
                      rooms: {
                          some: baseRoomFilter,
                      },
                  }),
              }
            : {
                  ...(filters.location && {
                      location: {
                          contains: filters.location,
                          mode: 'insensitive',
                      },
                  }),
                  ...(filters.region && {
                      region: { contains: filters.region, mode: 'insensitive' },
                  }),
                  ...(Object.keys(baseRoomFilter).length && {
                      rooms: {
                          some: baseRoomFilter,
                      },
                  }),
              };

        const resorts = await prisma.resort.findMany({
            where,
            include: {
                rooms: true,
            },
        });

        return mapPrismaResortToResort(resorts);
    } catch (error) {
        throw error;
    }
};

export const createResort = async (data: {
    resort: Resort;
    rooms: Room[];
}): Promise<number> => {
    try {
        await prisma.resort.create({
            data: {
                ...data.resort,
                reviews: JSON.parse(JSON.stringify(data.resort.reviews)),
                rooms: {
                    create: data.rooms.map((room) => room),
                },
            },
            include: {
                rooms: true,
            },
        });

        return 201;
    } catch (error) {
        console.log(error);
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002'
        ) {
            return 409;
        }

        throw error;
    }
};

export const deleteResort = async (name: string): Promise<number> => {
    try {
        await prisma.resort.delete({
            where: {
                name,
            },
        });

        return 204;
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025'
        ) {
            return 404;
        }

        throw error;
    }
};
