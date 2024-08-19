import { getAllEvents } from '@/lib/actions/event.actions'
import React from 'react'
import Collection from '../common/Collection';
import Search from '../common/Search';
import CategoryFilter from '../common/CategoryFilter';
import { SearchParamType } from '@/types';
import { useRouter } from 'next/router';

const Events = async ({searchParams}:any) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';
  const response = await getAllEvents({
    query: searchQuery,
    page,
    limit : 6,
    category
  });

  return (
    <section id="events" className='my-8 wrapper flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold'>Trust by <br/>
        Thousands of Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search/>
          <CategoryFilter/>
        </div>

        <div className='flex flex-col md:flex-row'>

          <Collection
            events = {response?.events}
            emptyMsg = "No Events Found"
            emptyStateSubtext = "No back later"
            collectionType =  "All_Events"
            limit = {6}
            page = {page}
            totalPages = {response?.totalPages}
          />

        </div>
    </section>
  )
}

export default Events