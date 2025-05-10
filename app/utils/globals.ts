import { NextResponse } from 'next/server';

export const API_RESPONSES = {
    OK: (data?: any) => {
        return NextResponse.json(data ? data : null, {
            status: 200,
        });
    },
    CREATED: (msg: string) => {
        return NextResponse.json(
            { message: msg || 'Created' },
            { status: 201 },
        );
    },
    NO_CONTENT: () => {
        return new NextResponse(null, { status: 204 });
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
