import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  try {
    const { phone } = await body;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);

    const res = await axios.post(
      'https://console.melipayamak.com/api/send/otp/98900ceec3fc4e02a37eb213f9ea5a2a',

      {
        from: '50002710043415',
        to: phone,
        text: ` لغو۱۱   ${generatedOtp}`,
      },
    );
    const { data, status, statusText } = res;
    return NextResponse.json({ data, status, statusText });
  } catch (error) {
    return NextResponse.json({
      error,
    });
  }
}
