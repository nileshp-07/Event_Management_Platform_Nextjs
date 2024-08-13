"use client"

import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import React, { useEffect } from 'react'

import { loadStripe } from '@stripe/stripe-js';
import { checkoutOrder } from '@/lib/actions/order.action';
import { useRouter } from 'next/navigation';

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckOut = ({event} : {event : any}) => {
    const {user} = useUser();
    const userId = user?.publicMetadata.userId as string;
    const router = useRouter();
    const isPastEvent = new Date(event.endDateTime) <  new Date();


    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
          console.log('Order placed! You will receive an email confirmation.');
        }
    
        if (query.get('canceled')) {
          console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
      }, []);
    

    const onCheckout = async () => {
        const order = {
            eventTitle : event.title,
            eventId : event.id,
            price : event.price,
            isFree : event.isFree,
            buyerId : userId
        }
        
        try {
            const res = await checkoutOrder(order);
            if (res?.url) {
                window.location.href = res.url;
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    }

  return (
    <div className='flex items-center'>
        {
            isPastEvent ? (
                <p className='p-2 text-red-400'>Sorry, this event is passed</p>
            ) : (
                <>
                    <SignedOut>
                        <Button size="lg" className='rounded-full'>
                            <Link href="/sign-in">
                            Get Tickets
                            </Link>
                        </Button>
                    </SignedOut>

                    <SignedIn>
                       <form action={onCheckout} method='post'>
                            <Button type='submit' role='link' size="lg" className='rounded-full'>
                                {event.isFree ? "Get Tickets" : "Buy Ticket"}
                            </Button>
                       </form>
                    </SignedIn>
                </>  
            )
        }
    </div>
  )
}

export default CheckOut