"use server"

import { createEventType } from "@/types";
import { handleError } from "../utils";
import db from "../prisma/db";
import { revalidatePath } from "next/cache";


export const createEvent = async ({event, userId, path} : createEventType) => {
   try{
        const user = await db.user.findFirst({
            where : {
                id : userId
            }
        })

        if(!user)
        {
            throw new Error("User not found")
        }

        const newEvent = await db.event.create({
            data: {
                ...event,
                organizerId: userId
            }
        })

        revalidatePath(path)

        return JSON.parse(JSON.stringify(newEvent))
   }
   catch(err)
   {
     handleError(err);
   }
}


export const getEventDetails = async (eventId: string) => {
    try{
        const eventDetails = await db.event.findUnique({
            where : {
                id: eventId
            },
            include: {  //populating the ordganizer and category
                organizer: true, 
                category: true, 
            },
        })

        if (!eventDetails) throw new Error('Event not found')

        return JSON.parse(JSON.stringify(eventDetails))
    }
    catch(err)
    {
        handleError(err);
    }
}   