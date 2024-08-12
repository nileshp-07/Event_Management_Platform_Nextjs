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
import { useState } from "react"
import FileUploader from "./FileUploader"
import locationIcon from "../../../public/assets/icons/location-grey.svg"
import calendarIcon from "../../../public/assets/icons/calendar.svg"
import priceIcon from "../../../public/assets/icons/price.png"
import urlIcon from "../../../public/assets/icons/link.svg"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "@/components/ui/checkbox"
import { useUploadThing } from "@/lib/uploadthings"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
 
type EventFormType = {
    userId : string,
    type : "Create" | "Update",
    event? : any,
    eventId? : string
}

const CreateEventForm = ({userId , type, event, eventId}: EventFormType) => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([])

  const initailValues = event && type==="Update" ? {
    ...event,
    startDateTime : new Date(event.startDateTime),
    endDateTime : new Date(event.endDateTime)
  } : eventDefaultValues;

  const {startUpload} = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initailValues
  })
 
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
     let uploadedImageUrl = values.imageUrl;

     console.log(values);

     if(files.length > 0)
     {
        const uploadedImages = await startUpload(files);

        if(!uploadedImages) {
          return;
        }

        uploadedImageUrl = uploadedImages[0].url
     }

     if(type == "Create")
     {
       try{
          const newEvent = await createEvent({
            event: {...values, imageUrl: uploadedImageUrl},
            userId,
            path: '/profile'
          });

          if(newEvent)
          {
             form.reset();
             router.push(`/event/${newEvent.id}`)
          }
       }
       catch(err)
       {
        console.log(err);
       }
     }

     if(type == "Update")
      {
         console.log(event);
        if(!eventId) {
          router.back() // to go to the prev page
          return;
        }
        try{
           const updatedEvent = await updateEvent({
             event: {...values, imageUrl: uploadedImageUrl, id: eventId},
             userId,
             path: `/event/${eventId}`
           });
 
           if(updatedEvent)
           {
              form.reset();
              router.push(`/event/${updatedEvent.id}`)
           }
        }
        catch(err)
        {
         console.log(err);
        }
      }
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
                   <Textarea placeholder="description" {...field} className="textarea rounded-2xl" />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
            />
           <FormField
             control={form.control}
             name="imageUrl"
             render={({ field }) => (
               <FormItem className="w-full">
                 <FormControl className="h-60">
                    <FileUploader 
                        imageUrl={field.value}
                        setFiles= {setFiles}
                        onFileChange = {field.onChange}
                     />
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
            />
         </div>


         <div className="flex flex-row md:flex-col gap-5">
           <FormField
             control={form.control}
             name="location"
             render={({ field }) => (
               <FormItem className="w-full">
                 <FormControl>
                   <div  className="flex items-center h-[54px] w-full rounded-full bg-grey-50 px-4 py-2">
                     <Image
                       src={locationIcon}
                       alt="location"
                       width={24}
                       height={24}
                     />
                     <Input placeholder="Event location or Online" {...field} className="input-field" /> 
                   </div>
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
            />
         </div>

         <div className="flex md:flex-row flex-col gap-5">
           <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src={calendarIcon}
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">Start Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src={calendarIcon}
                        alt="calendar"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <p className="ml-3 whitespace-nowrap text-grey-600">End Date:</p>
                      <DatePicker 
                        selected={field.value} 
                        onChange={(date) => field.onChange(date)} 
                        showTimeSelect
                        timeInputLabel="Time:"
                        dateFormat="MM/dd/yyyy h:mm aa"
                        wrapperClassName="datePicker"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
         </div>

         <div className="flex flex-col md:flex-row gap-5">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src={priceIcon}
                        alt="price"
                        width={24}
                        height={24}
                        className="filter-grey"
                      />
                      <Input type="number" placeholder="Price" {...field} className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"/>
                      <FormField
                      control={form.control}
                      name="isFree"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center">
                               <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none">Free Ticket</label>

                               <Checkbox
                                 onCheckedChange={field.onChange}
                                 checked={field.value}
                                 id="isFree"
                                 className="mr-2 h-5 w-5 border-2 border-primary-500"
                                 />
                              
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
             control={form.control}
             name="url"
             render={({ field }) => (
               <FormItem className="w-full">
                 <FormControl>
                   <div  className="flex items-center h-[54px] w-full rounded-full bg-grey-50 px-4 py-2">
                     <Image
                       src={urlIcon}
                       alt="url"
                       width={24}
                       height={24}
                     />
                     <Input placeholder="URL" {...field} className="input-field" /> 
                   </div>
                 </FormControl>
                 <FormMessage />
               </FormItem>
             )}
            />

            </div>
            <Button 
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
              className="button w-full"
            >
              {form.formState.isSubmitting ? (
                'Submitting...'
              ): `${type} Event `}</Button>
      </form>
    </Form>
  )
}

export default CreateEventForm