import { getTzimerim } from '@/app/lib/controllers/tzimerimController';

export const GET = async () => {
    return await getTzimerim();
};
