import { NextRequest } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import { getSingleTzimer } from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';

//Get Tzimer with id for tzimer page in site
export const GET = async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    try {
        const { id } = await params;

        if (isNaN(+id)) {
            return API_RESPONSES.BAD_REQUEST('Id is not valid');
        }

        await dbConnect();

        const data = await getSingleTzimer(+id);

        if (!data) {
            return API_RESPONSES.NOT_FOUND('Tzimer not found');
        }

        return API_RESPONSES.OK(data);
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
