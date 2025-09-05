import { demoEvents } from "@/app/data/event";
import { NextResponse } from "next/server";
export async function GET( _request:Request,{params}:{params:Promise<{id:string}>})
{
const {id} =await params;
const event = demoEvents.find((event)=> parseInt(event.id) === parseInt(id));
return NextResponse.json({event});

}

export async function PATCH( request:Request,{params}:{params:Promise<{id:string}>})
{
      try {
const {id} =await params;
const index = demoEvents.findIndex((event)=> parseInt(event.id) === parseInt(id));
const deletedEvent = demoEvents[index]
console.log(demoEvents)
demoEvents.splice(index,1)
const body = await request.json();
if(body.creatorName=="")
      return;

    const newEvent = {
      ...body,
      id: body.id && body.id.trim() !== "" ? body.id : id
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
  