import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import editIcon from "../../../public/assets/icons/edit.svg"
import arrowIcon from "../../../public/assets/icons/arrow.svg"
import { DeleteConfirmation } from './DeleteConfimation'
import { formatDateTime } from '@/lib/utils'

type EventCardType = {
  event : any,
  hasOrderLink? : boolean,
  hidePrice? : boolean
}

const EventCard = ({event, hasOrderLink, hidePrice}: EventCardType) => {
  const {sessionClaims} = auth()
  const userId = sessionClaims?.userId as string;

  console.log("EVENT : ", event)

  const isOrganizer = userId === event?.organizer?.id.toString();

  return (
    <div className='group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px] border '>
      <Link href={`/event/${event.id}`}>
        <Image
        src={event.imageUrl}
        alt='EventImage'
        width={500}
        height={180}
        />
      </Link>

      { isOrganizer && !hidePrice && (
        <div className='absolute right-2 top-2 flex flex-col gap-4 rounded-lg bg-white p-3 shadow-sm transition-all border'>
          <Link href={`/event/${event.id}/update`}>
            <Image src={editIcon} alt='edit' width={20} height={20}/>
          </Link>

          <DeleteConfirmation eventId={event.id}/>
        </div>
      )}

      <div className='flex min-h-[230px] flex-col gap-3 p-5 md:gap-4 w-full'>
        {
           !hidePrice && (
            <div className='flex gap-2'>
              <div className='p-semibold-14 rounded-full bg-green-100 px-4 py-1 text-green-600'>{event.isFree ? "Free" : `Rs ${event.price}`}</div>
              <div className='p-semibold-14 w-min rounded-full bg-grey-50 px-4 py-1  text-grey-500 line-clamp-1'>{event.category.name}</div>
            </div>
           )
        }

        <p className='p-medium-16 p-medium-18 text-grey-500'>{formatDateTime(event.startDateTime).dateTime}</p>

        <Link href={`/event/${event.id}`}>
          <p className='p-medium-16 md:p-medium-20 line-clamp-2 flex-1 text-black'>{event.title}</p>
        </Link>

        <div className='flex justify-between w-full'> 
          <div className='p-medium-14 md:p-medium-16 text-grey-600'>{event.organizer.firstName} {event.organizer.lastName }</div>

          {
             hasOrderLink && (
               <Link href={`/orders?eventId=${event.id}`} className='flex gap-2'>
                  <p className='text-primary-500'>Order Details</p>
                  <Image src={arrowIcon} alt='order' width={10} height={10}/>
               </Link>
             )
          }
        </div>
      </div>
    </div>
  )
}

export default EventCard