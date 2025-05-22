import { deleteResort } from '@/app/services/resortsService';
import { API_RESPONSES } from '@/app/utils/globals';
import { NextRequest } from 'next/server';

// Delete resort by name
export const DELETE = async (
    _: NextRequest,
    { params }: { params: Promise<{ name: string }> },
) => {
    try {
        const { name } = await params;

        if (!name) {
            return API_RESPONSES.BAD_REQUEST('Missing resort name');
        }

        const status = await deleteResort(name);

        if (status === 404) {
            return API_RESPONSES.NOT_FOUND('Resort not found');
        }

        return API_RESPONSES.NO_CONTENT();
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        return API_RESPONSES.INTERNAL_SERVER_ERROR(errorMessage);
    }
};
