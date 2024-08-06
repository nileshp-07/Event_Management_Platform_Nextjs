import { createUserType, updateUserType } from "@/types";
import db from "../prisma/db";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const createUser = async (user: createUserType) => {
    try{
        const {clerkId, firstName, lastName, username, email , profileImage} =user;
        const newUser = await db.user.create({
            data : {
                clerkId,
                firstName,
                lastName,
                username,
                email,
                profileImage
            }
        });

        return JSON.parse(JSON.stringify(newUser))
    }
    catch(err)
    {
        handleError(err);
    }
}


export const updateUser = async (clerkId: string, user: updateUserType) => {
    try{
        const {firstName, lastName, username, profileImage} = user;
        
        const updatedUser = await db.user.update({
            where : {
                clerkId: clerkId
            },
            data: user
        })

        if(!updateUser) throw new Error("User could'nt updated");


        return JSON.parse(JSON.stringify(updatedUser))
    }
    catch(err)
    {
        handleError(err);
    }
}



export const deleteUser = async (clerkId: string) => {
    try{
        const userToDelete = await db.user.findUnique({
            where : {
                clerkId: clerkId
            }
        })

        if(!userToDelete)
        {
            throw new Error('User Not found');
        }

        await Promise.all([
            db.event.updateMany({
                where: {
                    organizerId: userToDelete.id
                },
                data : {
                    organizerId: null
                }
            }),

            db.order.updateMany({
                where: { userId: userToDelete.id },
                data: { userId: null } // or use `undefined` if needed
              })
        ]);

        // delete the user
        const deletedUser  = await db.user.delete({
            where : {
                id: userToDelete.id
            }
        })


        revalidatePath('/')

        return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null
    }

    catch(err)
    {
        handleError(err);
    }
}