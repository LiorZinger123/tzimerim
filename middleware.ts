import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const origin = request.headers.get('Origin');
    const apiKey = process.env.X_API_KEY;
    const headerApiKey = request.headers.get('authorization');

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

    if (!headerApiKey || headerApiKey !== `Bearer ${apiKey}`) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return NextResponse.next();
}
