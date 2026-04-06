import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { checkEventCacheKey } from '../../../../../../remotes'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: '인증되지 않은 요청입니다.' }, { status: 401 })
  }

  try {
    revalidateTag(checkEventCacheKey, 'max')

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: `checkEvent의 캐시가 성공적으로 무효화되었습니다.`
    })
  } catch (err) {
    return NextResponse.json({ message: '재검증 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
