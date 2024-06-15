import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest
) {
  const body = await req.json();
  console.log(body);
  try {
    const { phone } = await body;
    const res = await axios.post(
      'https://console.melipayamak.com/api/send/otp/98900ceec3fc4e02a37eb213f9ea5a2a',
      { to: phone },
    );
    const { data, status, statusText } = res;
    return NextResponse.json({ data, status, statusText });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
