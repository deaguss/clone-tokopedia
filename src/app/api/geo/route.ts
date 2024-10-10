import { auth } from "@/auth";
import db from "@/lib/db";
import { formLocation } from "@/lib/validators/location-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || !session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { location } = formLocation.parse(body);

    const locationExists = await db.location.findMany({
      where: {
        userId: session.user.id,
      },
    });

    if (locationExists.length === 0) {
      await db.location.create({
        data: {
          userId: session.user.id,
          location,
        },
      });
    } else {
      await db.location.update({
        where: {
          id: locationExists[0].id,
        },
        data: {
          location,
        },
      });
    }

    return NextResponse.json({ message: "Location saved successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
        const session = await auth();
        if(!session?.user) return new Response('Unauthorized',  { status: 401 })

        const locations = await db.location.findMany({
            where: {
                userId: session?.user.id
            }   
        })  
        return NextResponse.json({ data:locations }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
    } 