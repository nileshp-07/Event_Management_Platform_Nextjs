import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from '@/components/ui/input'
import { createCategory, getAllCategories } from '@/lib/actions/category.action'
  

type CategoryDropDownType = {
    value? : string,
    onChangeHandler? : () => void
}

type categoryType = {
   name : string,
   id : string
}
 
const CategoryDropDown = ({onChangeHandler, value}: CategoryDropDownType) => {
    const [categories, setCategories] = useState<categoryType[]>([])

    const [newCategory, setNewCategory] = useState("");

    const handleAddCategory = async() => {
        const newCategoryObj = await createCategory({
           categoryName: newCategory.trim()
        })

        setCategories(() => [...categories, newCategoryObj]);
    }

    useEffect(() =>{
      const getCategories = async () => {
        const allCategories = await getAllCategories();

        setCategories(allCategories);

      }
      getCategories();

    },[])
    
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {
             categories?.length > 0 && categories.map((category) => (
                <SelectItem key={category.id} value={category.id} className='select-item  p-regular-14'>
                    {category.name}
                </SelectItem>
             ))
          }

          <AlertDialog>
            <AlertDialogTrigger className='p-medium -14 w-full py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>Create New Category</AlertDialogTrigger>
            <AlertDialogContent className='bg-white'>
              <AlertDialogHeader>
               <AlertDialogTitle>New Category</AlertDialogTitle>
               <AlertDialogDescription>
                  <Input type='text' placeholder='Category name' className='input-field mt-3' onChange={(e) => setNewCategory(e.target.value)}/>
               </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
               {/* startTransition is a React API that marks state updates as low-priority, allowing the UI to remain responsive by deferring non-urgent updates. */}
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </SelectContent>
    </Select>

  )
}

export default CategoryDropDown