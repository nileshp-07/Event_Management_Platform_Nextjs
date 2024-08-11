import Image from 'next/image'
import React from 'react'
import logo from "../../../public/assets/images/logo.svg"
import Link from 'next/link'
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import { Button } from '../../ui/button'
import NavItem from './NavItem'
import MobileNav from '../common/MobileNav'

const Header = () => {
  return (
    <header>
       <div className="wrapper flex items-center justify-between">
          <Link href="/">
            <Image
                src={logo}
                alt='Logo'
                width={128} height={38}/>
          </Link>

          <div className='hidden md:flex'>
            <NavItem/>
          </div>

          <div className='flex gap-3'>
            <SignedOut>
               <Button className='rounded-full' size="lg">
                  <Link href='sign-in'>
                     Login
                  </Link>
               </Button>
            </SignedOut>
            <SignedIn>
               <UserButton />
               <MobileNav/>
            </SignedIn>
          </div>
       </div>
    </header>
  )
}

export default Header