import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { getAllTzimerim } from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';

export const GET = async () => {
    try {
        await dbConnect();
        const data = await getAllTzimerim();
        return API_RESPONSES.OK(data);
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
