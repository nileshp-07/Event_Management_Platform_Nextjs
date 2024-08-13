"use server"

import { CheckoutOrderType, CreateOrderType } from "@/types"
import { handleError } from "../utils"
import Stripe from "stripe"
import { redirect } from "next/navigation"
import db from "../prisma/db"


export const checkoutOrder = async (order: CheckoutOrderType) => {
    try{
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

        const price  = order.isFree ? 0 : Number(order.price) * 100;

        const session = await stripe.checkout.sessions.create({
            line_items :[
                {
                    price_data: {
                      currency: 'INR',
                      unit_amount: price,
                      product_data: {
                        name: order.eventTitle
                      }
                    },
                    quantity: 1
                  }
            ],
            metadata : {
                eventId : order.eventId,
                buyerId : order.buyerId
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        })

        return { url: session.url }
    }
    catch(err)
    {
        handleError(err);
    }
}


export const createOrder = async (order: CreateOrderType) => {
    try{
        const newOrder = await db.order.create({
            data: order
        });

        return JSON.parse(JSON.stringify(newOrder));
    }
    catch(err)
    {
        handleError(err);
    }
}