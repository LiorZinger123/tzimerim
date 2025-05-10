import { NextRequest } from 'next/server';
import { getTzimerim } from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';
import { getQueryParams } from '@/app/utils/helper';

//Get tzimerim in lazy loading
export const GET = async (request: NextRequest) => {
    try {
        const skip = getQueryParams(request, 'skip');
        const limit = getQueryParams(request, 'limit') || '10';

        if (!skip) {
            return API_RESPONSES.BAD_REQUEST('Missing query params: skip');
        }

        if (isNaN(+skip) || isNaN(+limit)) {
            return API_RESPONSES.BAD_REQUEST(
                'Query params are not a valid numbers',
            );
        }

        const data = await getTzimerim(+skip, +limit);

        return API_RESPONSES.OK(data);
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
