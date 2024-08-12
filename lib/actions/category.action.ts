"use server"

import db from "../prisma/db"
import { handleError } from "../utils";

export const createCategory = async ({categoryName} : {categoryName: string}) => {
    try{
        const newCategory = await db.category.create({
            data : {
                name: categoryName
            }
        })
        
        return JSON.parse(JSON.stringify(newCategory));
    }
    catch(err)
    {
        handleError(err)
    }
}


export const getAllCategories = async () => {
    try{
        const categories = await db.category.findMany();

        return JSON.parse(JSON.stringify(categories));
    }
    catch(err)
    {
        handleError(err);
    }
}
