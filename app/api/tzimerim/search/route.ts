import { NextRequest, NextResponse } from 'next/server';
import { searchTzimerim } from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';
import dbConnect from '@/app/lib/mongodb';

export const GET = async (request: NextRequest) => {
    try {
        await dbConnect();

        const urlString = request.url ?? '';
        const { searchParams } = new URL(urlString);
        const query = searchParams.get('query');

        if (!query) {
            return API_RESPONSES.BAD_REQUEST('Missing query params');
        }

        const data = await searchTzimerim(query);

        return API_RESPONSES.OK(data);
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
