import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: '인증되지 않은 요청입니다.' }, { status: 401 })
  }

  return NextResponse.json({ revalidated: false, live: true })
}
