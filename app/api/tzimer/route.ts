import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { createTzimer } from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();

        const body = await request
            .json()
            .catch(() =>
                API_RESPONSES.BAD_REQUEST(
                    'Invalid JSON format. Please check your request body',
                ),
            );

        if (body instanceof NextResponse) return body;

        const status = await createTzimer(body);

        if (status === 400) {
            return API_RESPONSES.BAD_REQUEST('Invalid data format');
        }

        return API_RESPONSES.CREATED('Tzimer added successfully');
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
