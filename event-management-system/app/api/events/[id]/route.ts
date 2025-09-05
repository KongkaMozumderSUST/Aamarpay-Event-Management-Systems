import { demoEvents } from "@/app/data/event";
export async function GET( _request:Request,{params}:{params:Promise<{id:string}>})
{
const {id} =await params;
const event = demoEvents.find((event)=> parseInt(event.id) === parseInt(id));
console.log(event)
return Response.json({event});

}
export async function DELETE( _request:Request,{params}:{params:Promise<{id:string}>})
{
const {id} =await params;
const index = demoEvents.findIndex((event)=> parseInt(event.id) === parseInt(id));
const deletedEvent = demoEvents[index]
console.log(demoEvents)
demoEvents.splice(index,1)
return Response.json({
    success: true,
    deletedEvent: {
      ...deletedEvent,
    },
  });


}