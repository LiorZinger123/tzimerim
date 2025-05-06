import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { getSingleTzimer } from '@/app/lib/services/tzimerimService';

export const GET = async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    try {
        const { id } = await params;

        if (isNaN(+id)) {
            return NextResponse.json(
                { message: 'Tzimer id is not a valid number' },
                { status: 400 },
            );
        }

        await dbConnect();
        const data = await getSingleTzimer(+id);

        if (!data) {
            return NextResponse.json(
                { message: 'Tzimer not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(data, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
};
