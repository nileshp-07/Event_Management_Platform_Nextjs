export type createUserType = {
    clerkId : string,
    firstName : string,
    lastName : string,
    username : string,
    email : string,
    profileImage: string    
}

export type updateUserType = {
    firstName : string,
    lastName : string,
    username : string, 
    profileImage: string
}

export  type createEventType = {
    event : {
        title : string,
        description: string,
        location : string,
        imageUrl : string,
        startDateTime : Date,
        endDateTime: Date,
        price : string,
        isFree : boolean,
        url? : string
    },
    userId : string,
    path : string
}

export type SearchParamTypes = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

export type GetAllEventsType = {
    query? : string,
    category? : string,
    limit :  number,
    page : number
}


export type DeleteEventType = {
    eventId: string,
    path : string
}

export type UpdateEventType = {
    userId : string,
    event : any,
    path : string
}


export type RelatedEventsType = {
    categoryId: string,
    eventId : string,
    limit? : number,
    page? : string
}