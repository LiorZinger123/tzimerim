import prisma from '@/prisma/prismaClient';
import { NewTzimer, Tzimer } from '../../utils/interfaces';
import { validateNewTzimer } from '@/app/utils/helper';

export const getTzimerim = async (
    skip: number,
    limit: number,
): Promise<Tzimer[]> => {
    return await prisma.tzimer.findMany({
        skip: skip,
        take: limit,
    });
};

export const getSingleTzimer = async (id: number): Promise<Tzimer | null> => {
    return await prisma.tzimer.findUnique({
        where: { id },
    });
};

export const createTzimer = async (data: NewTzimer): Promise<number> => {
    if (!validateNewTzimer(data)) {
        return 400;
    }

    try {
        await prisma.tzimer.create({
            data,
        });
    } catch (error: any) {
        if (error?.code === 'P2002') {
            return 409;
        } else {
            throw error;
        }
    }

    return 201;
};

export const deleteTzimer = async (name: string): Promise<number> => {
    try {
        await prisma.tzimer.delete({
            where: { name },
        });

        return 204;
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return 404;
        }
        throw error;
    }
};

export const updateTzimer = async (
    name: string,
    updateData: Partial<Tzimer>,
): Promise<number> => {
    try {
        await prisma.tzimer.update({
            where: { name },
            data: updateData,
        });

        return 204;
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return 404;
        }
        throw error;
    }
};

export const searchTzimerim = async (query: string): Promise<Tzimer[]> => {
    return await prisma.tzimer.findMany({
        where: {
            name: {
                contains: query,
            },
        },
    });
};
