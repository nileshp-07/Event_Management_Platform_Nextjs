import CreateEventForm from "@/components/shared/createEvent/CreateEventForm";
import { getEventDetails } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

type UpdateEventType = {
  params: {
    id: string
  }
}

const UpdateEvent = async ({ params: { id } }: UpdateEventType) => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventDetails(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">Update Event</h3>
      </section>

      <div className="wrapper my-8">
        <CreateEventForm
          type="Update" 
          event={event} 
          eventId={event.id} 
          userId={userId} 
        />
      </div>
    </>
  )
}

export default UpdateEvent