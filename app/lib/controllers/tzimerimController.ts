import { NextResponse } from 'next/server';
import { connectToDatabase } from '../mongodb';
import { getAllTzimerim, getSingleTzimer } from '../services/tzimerimService';

export const getTzimerim = async () => {
    try {
        const db = await connectToDatabase();
        const data = await getAllTzimerim(db);
        return NextResponse.json({ body: data }, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
};

export const getTzimer = async (id: string) => {
    try {
        if (isNaN(+id)) {
            return NextResponse.json(
                { message: 'Tzimer id is not a valid number' },
                { status: 400 },
            );
        }

        const db = await connectToDatabase();
        const data = await getSingleTzimer(db, +id);

        if (!data) {
            return NextResponse.json(
                { message: 'Tzimer not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({ body: data }, { status: 200 });
    } catch {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
};
