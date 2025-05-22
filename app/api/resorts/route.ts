import {
    createResort,
    getFilteredResorts,
} from '@/app/services/resortsService';
import { API_RESPONSES } from '@/app/utils/globals';
import { getFiltersFromQueryParams } from '@/app/utils/helper';
import { NextRequest } from 'next/server';

// get by filters, maybe change return value (returns all resort, if not all rooms fit to filter add value to returned value)
export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const params = url.searchParams;
        const filters = getFiltersFromQueryParams(params);

        const resorts = await getFilteredResorts(filters);

        return API_RESPONSES.OK(resorts);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        return API_RESPONSES.INTERNAL_SERVER_ERROR(errorMessage);
    }
};

// Create resort and rooms
export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json();
        if (!body || Object.keys(body).length === 0) {
            return new Response(
                JSON.stringify({ error: 'Invalid Body Json' }),
                {
                    status: 400,
                },
            );
        }

        const status = await createResort(body);

        if (status === 409) {
            return API_RESPONSES.DUPLICATE();
        }

        return API_RESPONSES.CREATED('Resort created successfully');
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        return API_RESPONSES.INTERNAL_SERVER_ERROR(errorMessage);
    }
};
