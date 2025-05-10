import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import {
    createTzimer,
    deleteTzimer,
    updateTzimer,
} from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';
import { getQueryParams } from '@/app/utils/helper';

//Create new tzimer - for admin
export const POST = async (request: NextRequest) => {
    try {
        const body = await request
            .json()
            .catch(() =>
                API_RESPONSES.BAD_REQUEST(
                    'Invalid JSON format. Please check your request body',
                ),
            );

        if (body instanceof NextResponse) return body;

        await dbConnect();

        const status = await createTzimer(body);

        if (status === 400) {
            return API_RESPONSES.BAD_REQUEST('Invalid data format');
        }

        return API_RESPONSES.CREATED('Tzimer added successfully');
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};

//Delete tzimer by name - for admin
export const DELETE = async (request: NextRequest) => {
    try {
        const name = getQueryParams(request, 'name');

        if (!name) {
            return API_RESPONSES.BAD_REQUEST('Missing query params: name');
        }

        await dbConnect();

        const data = await deleteTzimer(name);

        if (!data) {
            return API_RESPONSES.NOT_FOUND('Tzimer not found');
        }

        return API_RESPONSES.OK({ message: 'Tzimer deleted successfully' });
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};

//Update tzimer - for tzimer owners
export const PATCH = async (request: NextRequest) => {
    try {
        const name = getQueryParams(request, 'name');

        if (!name) {
            return API_RESPONSES.BAD_REQUEST('Missing query parameter: name');
        }

        const body = await request
            .json()
            .catch(() =>
                API_RESPONSES.BAD_REQUEST(
                    'Invalid JSON format. Please check your request body',
                ),
            );

        if (body instanceof NextResponse) return body;

        await dbConnect();

        const status = await updateTzimer(name, body);

        if (status === 404) {
            return API_RESPONSES.NOT_FOUND('Tzimer not found');
        }

        return API_RESPONSES.OK({ message: 'Tzimer updated successfully' });
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
