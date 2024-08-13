"use server"

import { createEventType, DeleteEventType, GetAllEventsType, GetOrganizedEventType, RelatedEventsType, UpdateEventType } from "@/types";
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


export const getAllEvents = async ({query, limit=6, page, category}: GetAllEventsType) => {
    try{
        const searchQuery =  query ? { title: { contains: query, mode: 'insensitive' } } : {};
        const conditions: any = {
            AND : [
                searchQuery, 
                category ? {categoryId: category} : {}
            ]
        }

        const skipAmount = (Number(page) - 1)*limit

        const events = await db.event.findMany(
            {
                where: conditions,
                //   orderBy: {
                //       createdAt: 'desc',
                //   },
                  skip: skipAmount,
                  take: limit,
                  include: {
                    organizer: true,
                    category: true,
                  },
            }
        )

        const eventsCount = await db.event.count({
            where : conditions,
        })

        return {
            events : JSON.parse(JSON.stringify(events)),
            totalPages: Math.ceil(eventsCount / limit),
        };
    
    }
    catch(err)
    {
        console.log( "ERROR : ",err)
        // handleError(err);
    }
}


export const deleteEvent = async ({eventId, path}: DeleteEventType) => {
    try{
        const deletedEvent = await db.event.delete({
            where :{
                id: eventId
            }
        })

        if(deletedEvent)  revalidatePath(path)
    }
    catch(err)
    {
        handleError(err);
    }
}

export const updateEvent = async ({userId, event, path}: UpdateEventType) => {
   try{


    const eventToUpdate = await db.event.findFirst({
        where: {
            id : event.id
        }
    })

    if(!eventToUpdate || eventToUpdate.organizerId?.toString() !== userId)
        throw new Error('Unauthorized or event not found')

    const { categoryId, ...eventData } = event;

    
    const updatedEvent = await db.event.update({
        where: {
          id: event.id,
        },
        data: {
            title: event.title,
            description: event.description,
            location: event.location,
            imageUrl: event.imageUrl,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            price: event.price,
            isFree: event.isFree,
            url: event.url,
            category: {
              connect: { id: categoryId },
            },
        },
      });

    revalidatePath(path)
    return JSON.parse(JSON.stringify(updatedEvent))
    }
    catch(err)
   {
     handleError(err);
   }
}


export const getRelatedEvents = async ({categoryId, eventId, limit=3, page="1"}: RelatedEventsType) => {
    try{
        const skipAmount = (Number(page) - 1) * limit;

        const events = await db.event.findMany({
            where: {
              categoryId: categoryId,
              id: { not: eventId }
            },
            // orderBy: {
            //   createdAt: 'desc'
            // },
            skip: skipAmount,
            take: limit
          });
      
          const eventsCount = await db.event.count({
            where: {
              categoryId: categoryId,
              id: { not: eventId }
            }
          });

          return { 
            events: JSON.parse(JSON.stringify(events)), 
            totalPages: Math.ceil(eventsCount / limit) 
        }
    }
    catch(err)
    {
        handleError(err);
    }
}


export const getOrganizedEvents = async ({userId, limit=3 , page}: GetOrganizedEventType) => {
    try{
        const skipAmount = (Number(page) - 1) * limit;

        const organizedEvents = await db.event.findMany({
            where:{
                organizerId: userId
            },
            skip: skipAmount,
            take :  limit,
             // orderBy: {
            //   createdAt: 'desc'
            // },
            include: {  //populating the ordganizer and category
                organizer: true, 
                category: true, 
            },
        });

        const eventCounts = await db.event.count({
            where: {
                organizerId: userId
            }
        })

        return {
            events: JSON.parse(JSON.stringify(organizedEvents)),
            totalPages: Math.ceil(eventCounts)
        }
    }
    catch(err)
    {
        handleError(err);
    }

}