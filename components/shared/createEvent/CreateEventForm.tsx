"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { eventFormSchema } from "@/lib/validators"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventDefaultValues } from "@/constants"
import CategoryDropDown from "./CategoryDropDown"
import { Textarea } from "@/components/ui/textarea"

 
type EventFormType = {
    userId : string,
    type : "Create" | "Update"
}

const CreateEventForm = ({userId , type}: EventFormType) => {

  const initailValues = eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initailValues
  })
 
  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
         <div className="flex flex-col md:flex-row gap-5">
            <FormField
             control={form.control}
             name="title"
             render={({ field }) => (
               <FormItem className="w-full">
                 <FormControl>
                   <Input placeholder="Event title" {...field} className="input-field" />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
            />
            <FormField
             control={form.control}
             name="categoryId"
             render={({ field }) => (
               <FormItem className="w-full">
                 <FormControl>
                   <CategoryDropDown onChangeHandler={field.onChange} value={field.value}/>
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
            />
         </div>

         <div className="flex flex-col gap-5 md:flex-row">
         <FormField
             control={form.control}
             name="description"
             render={({ field }) => (
               <FormItem className="w-full">
                 <FormControl className="h-60">
                   <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
            />
         </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default CreateEventForm