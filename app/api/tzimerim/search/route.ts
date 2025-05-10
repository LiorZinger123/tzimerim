import { NextRequest } from 'next/server';
import { searchTzimerim } from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';
import { getQueryParams } from '@/app/utils/helper';

//Search tzimer - for admin
export const GET = async (request: NextRequest) => {
    try {
        const search = getQueryParams(request, 'search');

        if (!search) {
            return API_RESPONSES.BAD_REQUEST('Missing query params: search');
        }

        const data = await searchTzimerim(search);

        return API_RESPONSES.OK(data);
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
