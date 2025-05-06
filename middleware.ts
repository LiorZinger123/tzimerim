import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const allowedMethods = ['GET', 'POST', 'OPTIONS'];
    const method = request.method;
    const origin = request.headers.get('Origin');
    const secret = process.env.SECRET;
    const headerSecret = request.headers.get('authorization');

    // if (origin !== process.env.ALLOWED_ORIGIN) {
    //     return new NextResponse(
    //         JSON.stringify({ message: 'Origin not allowed' }),
    //         {
    //             status: 403,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         },
    //     );
    // }

    if (!allowedMethods.includes(method)) {
        return new NextResponse(
            JSON.stringify({ message: 'Method not allowed' }),
            {
                status: 405,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
    }

    if (!headerSecret || headerSecret !== `Bearer ${secret}`) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return NextResponse.next();
}
