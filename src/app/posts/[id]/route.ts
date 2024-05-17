import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  context: { params: { id: string } }
) => {
  const id = context.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (post) {
      return NextResponse.json({ post });
    } else {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
