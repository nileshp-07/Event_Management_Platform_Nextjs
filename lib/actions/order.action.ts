"use server"

import { CheckoutOrderType, CreateOrderType, GetEventOrdersType, PurchashedOrderType } from "@/types"
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


export const getPurchasedOrder = async({userId, page, limit=3}:PurchashedOrderType) => {
    try{
        const skipAmount = (Number(page) - 1)*limit;

        const orders = await db.order.findMany({
            where: {
                userId: userId
            },
            orderBy: {
              createdAt: 'desc'
            },
            skip: skipAmount,
            take : limit,
            include : {
                event:  true
            }
        })

        const eventIds = [...new Set(orders.map(order => order.eventId))];

        // Count total distinct event IDs
        const ordersCount = eventIds.length;

        return {
            orders : JSON.parse(JSON.stringify(orders)),
            totalPages: Math.ceil(ordersCount)
        }
    }
    catch(err)
    {
        handleError(err);
    }
}



export const getEventOrders = async ({ searchString, eventId }: GetEventOrdersType) => {
    try {
      if (!eventId) throw new Error('Event ID is required');
  
      const orders = await db.order.findMany({
        where: {
          eventId: eventId,
          user : {
            OR: [
              {
                firstName: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: searchString,
                  mode: 'insensitive',
                },
              },
            ],
          },
        },
        select: {
          id: true,
          amount: true,
          createdAt: true,
          event: {
            select: {
              title: true,
              id: true,
            },
          },
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
  
      return orders.map(order => ({
        _id: order.id,
        totalAmount: order.amount,
        createdAt: order.createdAt,
        eventTitle: order?.event?.title,
        eventId: order?.event?.id,
        buyer: `${order?.user?.firstName} ${order?.user?.lastName}`,
      }));
    } catch (error) {
      // Handle the error as appropriate
      handleError(error);
    }
  }