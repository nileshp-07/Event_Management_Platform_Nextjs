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


export type GetOrganizedEventType = {
    userId : string,
    limit? : number,
    page? : number
}


export type CheckoutOrderType = {
    eventTitle : string,
    eventId : string,
    price : string,
    isFree : boolean,
    buyerId : string
}


export type CreateOrderType = {
    orderId: string
    eventId: string
    userId: string
    amount: string
    createdAt: Date
  }

export type PurchashedOrderType = {
    userId : string,
    limit? : number,
    page? :  number
}


export type SearchParamType = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }

  export type UrlQueryType = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryType = {
    params: string
    keysToRemove: string[]
  }

  export type GetEventOrdersType =  {
     searchString? : string,
     eventId : string
  }