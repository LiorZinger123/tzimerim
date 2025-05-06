import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { getAllTzimerim } from '@/app/lib/services/tzimerimService';

export const GET = async () => {
    try {
        await dbConnect();
        const data = await getAllTzimerim();
        return NextResponse.json(data, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
};
