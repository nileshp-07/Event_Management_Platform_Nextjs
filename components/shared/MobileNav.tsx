import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import Image from 'next/image'
import menuIcon from "../../public/assets/icons/menu.svg"
import logo from "../../public/assets/images/logo.svg"
import { Separator } from '../ui/separator'
import NavItem from './NavItem'
const MobileNav = () => {
  return (
    <div className='md:hidden'>
        <Sheet>
         <SheetTrigger>
            <Image
            src={menuIcon}
            alt='menuIcon'
            className='cursor-pointer'/>
         </SheetTrigger>
         <SheetContent className='flex flex-col bg-white gap-6'>
            <Image
            src={logo}
            alt='logo'
            width={128}
            height={38}/>

            <Separator className="border border-gray-50"/>

            <NavItem/>
             
         </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileNav