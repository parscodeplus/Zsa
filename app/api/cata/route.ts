import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  try {
    const { name, description } = await body;
    const category = await prisma.category.create({
      data: { name, description },
    });
    return NextResponse.json({category});
    
  } catch (error) {
    return NextResponse.json({
        error
    })
  }
 
}
