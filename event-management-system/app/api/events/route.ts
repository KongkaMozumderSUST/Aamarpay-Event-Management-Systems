import { NextResponse } from "next/server";
import {demoEvents } from "@/app/data/event";

export  async function GET()
{
 return NextResponse.json(demoEvents);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if(body.creatorName=="")
      return;

    const newEvent = {
      ...body,
      id: body.id && body.id.trim() !== "" ? body.id : Date.now().toString(),
    };


    demoEvents.push(newEvent);
console.log(newEvent)
    return NextResponse.json(
      { message: "Event created", event: newEvent },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request", details: (err as Error).message },
      { status: 400 }
    );
  }
}