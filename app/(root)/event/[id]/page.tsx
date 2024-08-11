import { getEventDetails } from '@/lib/actions/event.actions'
import { SearchParamTypes } from '@/types'
import React from 'react'

const eventDetails = async ({params: {id}} : SearchParamTypes) => {

    const eventDetails = await getEventDetails(id);

    console.log(eventDetails);

  return (
    <div>
        
    </div>
  )
}

export default eventDetails