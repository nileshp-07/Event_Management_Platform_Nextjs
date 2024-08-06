import React from 'react'
import logo  from "../../../public/assets/images/logo.svg"
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className='border-t'>
       <div className='flex justify-between p-5 flex-col md:flex-row gap-4 items-center '>
          <Link href="/">
            <Image
            src={logo}
            alt='logo'
            width={128}
            height={38}/>
          </Link>

          <p>2023 Evently. All Rights reserved.</p>
       </div>
    </footer>
  )
}

export default Footer