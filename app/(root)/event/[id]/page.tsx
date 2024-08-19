import { getEventDetails, getRelatedEvents } from '@/lib/actions/event.actions'
import { SearchParamType } from '@/types'
import Image from 'next/image';
import React from 'react'
import calendarIcon from "../../../../public/assets/icons/calendar.svg"
import locationIcon from "../../../../public/assets/icons/location.svg"
import { formatDateTime } from '@/lib/utils';
import Collection from '@/components/shared/common/Collection';
import CheckOut from '@/components/shared/eventDetails/CheckOut';

const eventDetails = async ({params: {id}, searchParams} : SearchParamType) => {

    const eventDetails = await getEventDetails(id);
    const relatedEvents = await getRelatedEvents({
      categoryId: eventDetails.category.id,
      eventId: eventDetails.id,
      page: searchParams.page as string
    })

  return (
    <div>
       {/* event image and description  */}
       <div className='flex flex-col md:flex-row bg-primary-50 bg-contain'>
          <Image
          src={eventDetails.imageUrl}
          alt='Event Image'
          width={1000}
          height={1000}
          className='h-full min-h-[300px] object-cover object-center md:w-[50%]'/>


          {/* title, description and organizer  */}
          <div className='flex flex-col gap-8 p-5 md:p-10'>
            <div className='flex flex-col gap-6'>
              <h2 className='h2-bold capitalize'>{eventDetails.title}</h2>

              <div className='flex flex-col sm:flex-row sm:items-center'>
                <div className='flex gap-3'>
                   <p className='p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700'>{eventDetails.isFree ? "Free" : `Rs${eventDetails.price}`}</p>
                   <p className='p-medium-16 rounded-full bg-grey-500/10 px-4 py-2 text-grey-500'>{eventDetails.category.name}</p>
                </div>
                <p className='p-medium-18 mt-2 sm:mt-0 ml-2'>by {' '} <span className='text-primary-500'>{eventDetails.organizer.firstName} {eventDetails.organizer.lastName}</span></p>
              </div>
            </div>

            <CheckOut event={eventDetails}/>

            {/* time and location  */}
            <div className='flex flex-col gap-5'> 
              <div className='flex gap-3 items-center'>
                <Image
                src={calendarIcon}
                alt='calendar'
                width={32}
                height={32}/>

                <div className='p-medium-16 lg:p-regular-20 flex gap-2 flex-wrap items-center'>
                   <p>
                    {formatDateTime(eventDetails.startDateTime).dateOnly} | {" "}
                    {formatDateTime(eventDetails.startDateTime).timeOnly}
                    </p> 
                    to
                   <p>
                   {formatDateTime(eventDetails.endDateTime).dateOnly} | {" "}
                   {formatDateTime(eventDetails.endDateTime).timeOnly}
                   </p>
                </div>
              </div>

              <div className='flex items-center gap-3'>
                 <Image
                 src={locationIcon}
                 alt='location'
                 width={32}
                 height={32}
                 />
                 <p className='p-medium-16 lg:p-regular-20'>{eventDetails.location}</p>
              </div>
            </div>

            {/* description and url  */}
            <div className='flex flex-col gap-2'>
              <p className='p-bold-20 text-grey-600'>What You'll Learn</p>
              <p className='p-medium-16 lg:p-regular-18'>{eventDetails.description}</p>
              <a href={eventDetails.url} className='p-medium-16 lg:p-regular-18 truncate text-primary-500 underline'>{eventDetails.url}</a>
            </div>
          </div>
       </div>


        {/* related events  */}
       <div className='wrapper my-8 flex flex-col gap-8 md:gap-12'>
          <h2 className='h2-bold'>Related Events</h2>

          <Collection
             events={relatedEvents?.events}
             emptyMsg='No Related Events Found'
             emptyStateSubtext='Comback later'
             collectionType='All_Events'
             limit={3}
             page={searchParams.page as string}
             totalPages={relatedEvents?.totalPages}
          />
       </div>   
    </div>
  )
}

export default eventDetails