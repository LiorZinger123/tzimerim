import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const secret = process.env.SECRET;
    const headerSecret = request.headers.get('authorization');

    if (!headerSecret || headerSecret !== `Bearer ${secret}`) {
        return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return NextResponse.next();
}
