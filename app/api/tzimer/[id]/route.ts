import { NextRequest } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/app/lib/mongodb';
import {
    deleteTzimer,
    getSingleTzimer,
} from '@/app/lib/services/tzimerimService';
import { API_RESPONSES } from '@/app/utils/globals';

export const GET = async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return API_RESPONSES.BAD_REQUEST('Id is not valid');
        }

        await dbConnect();
        const data = await getSingleTzimer(id);

        if (!data) {
            return API_RESPONSES.NOT_FOUND('Tzimer not found');
        }

        return API_RESPONSES.OK(data);
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};

export const DELETE = async (
    _: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) => {
    try {
        const { id } = await params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return API_RESPONSES.BAD_REQUEST('Id is not valid');
        }

        await dbConnect();

        const deletedTzimer = await deleteTzimer(id);

        if (!deletedTzimer) {
            API_RESPONSES.NOT_FOUND(`No tzimer found with ID: ${id}`);
        }

        return API_RESPONSES.OK('Tzimer with ID ${id} deleted successfully');
    } catch {
        return API_RESPONSES.INTERNAL_SERVER_ERROR();
    }
};
