import React from 'react'
import image from "../../../public/assets/images/hero.png"
import Image from 'next/image'
import { Button } from "../../ui/button"
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className='bg-primary-50'>
        <div className='wrapper bg-contain py-5 md:py-10 flex justify-between flex-col md:flex-row gap-5'>

            <div className='flex flex-col gap-8 md:w-[50vw] py-5'>
                <h2 className='h1-bold'>Host, Connect, Celebrate: Your Events, Our Platform!</h2>
                <p  className='p-regular-20 md:p-regular-24'>Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community.</p>
                <Button size="lg" className='w-fit rounded-full' >
                    <Link href="#events">
                    Explore Now
                    </Link>   
                </Button>
            </div>
            <Image
            src={image}
            alt="heroSection"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] hidden md:flex"
            />

        </div>
    </section>
    
  )
}

export default HeroSection