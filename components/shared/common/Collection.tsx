import React from 'react'
import EventCard from './EventCard'

type CollectionType = {
    events: any
    emptyMsg: string
    emptyStateSubtext : string,
    limit : number
    page: number | string
    totalPages? : number,
    urlParamName?: string,
    collectionType?: 'Events_Organized' | 'My_Tickets' | 'All_Events'
}

const Collection = ({events, emptyMsg, emptyStateSubtext, limit, page, totalPages, collectionType}: CollectionType) => {
  return (
    <>
        {
            events?.length > 0 ? (
                <div className='flex flex-col items-center gap-10'>
                    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>
                      {
                         events.map((event: any) => {
                            const hasOrderLink = collectionType === "Events_Organized"
                            const hidePrice = collectionType === "My_Tickets"

                            return (
                                <EventCard key={event.id} event={event} hasOrderLink={hasOrderLink} hidePrice={hidePrice}/>
                            )
                         })
                      }
                    </div>

                    {/* {
                        totalPages > 1 && (
                            <Pagination/>
                        )
                    } */}
                </div>
            ) : (
                <div className='flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-xl bg-grey-50 py-28 text-center'>
                    <h2 className='p-bold-20 md:h5-bold'>{emptyMsg}</h2>
                    <p className='p-regular-14'>{emptyStateSubtext}</p>
                </div>
            )
        }
    </>
  )
}

export default Collection