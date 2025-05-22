import { NextRequest } from 'next/server';
import { API_RESPONSES } from '@/app/utils/globals';
import { getResortsBySearch } from '@/app/services/resortsService';

// Search resorts by search value
export const GET = async (request: NextRequest) => {
    try {
        const url = new URL(request.url);
        const params = url.searchParams;
        const query = params.get('query');

        if (!query) {
            return API_RESPONSES.BAD_REQUEST('Missing resort name');
        }

        const resorts = await getResortsBySearch(query);

        return API_RESPONSES.OK(resorts);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : String(error);
        return API_RESPONSES.INTERNAL_SERVER_ERROR(errorMessage);
    }
};
