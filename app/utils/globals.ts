import { NextResponse } from 'next/server';

export const API_RESPONSES = {
    OK: (data?: any, msg?: string) => {
        return NextResponse.json(data ? data : msg ? { message: msg } : null, {
            status: 200,
        });
    },
    CREATED: (msg: string) => {
        return NextResponse.json(
            { message: msg || 'Created' },
            { status: 201 },
        );
    },
    BAD_REQUEST: (msg: string) => {
        return NextResponse.json(
            {
                message: msg || 'Bad request',
            },
            { status: 400 },
        );
    },
    NOT_FOUND: (msg: string) => {
        return NextResponse.json(
            { message: msg || 'Not found' },
            { status: 404 },
        );
    },
    INTERNAL_SERVER_ERROR: () => {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 },
        );
    },
};
