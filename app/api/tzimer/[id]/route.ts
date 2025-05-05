import { NextRequest } from 'next/server';
import { getTzimer } from '@/app/lib/controllers/tzimerimController';

export const GET = async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    const { id } = await params;

    return await getTzimer(id);
};
