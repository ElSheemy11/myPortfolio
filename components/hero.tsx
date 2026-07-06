import { Spotlight } from './ui/spotlight'
import { cn } from "@/lib/utils";
import { TextGenerateEffect } from './ui/text-generate-effect';
import MagicButton from './ui/magic-button';
import { FaLocationArrow } from 'react-icons/fa6';

const words = "Transforming Concepts into Seamless User Experiences"

const hero = () => {
  return (
    <div className='pb-16 pt-18 relative h-screen'>
      <div className=''>
        <Spotlight className='-top-40 -left-10 md:-top-32 md:-left-20 h-screen' fill='white'/>
        <Spotlight className='top-10 left-[70%] h-[80vh] w-[50vw]' fill='purple'/>
        <Spotlight className='top-28 left-80 h-[80vh] w-[50vw]' fill='blue'/>
      </div>
       <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center bg-white dark:bg-[#000319] z-0">
        <div
          className={cn(
            "absolute inset-0",
            "bg-size-[80px_80px]",
            "bg-[linear-gradient(to_right,#e4e4e780_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
            "dark:bg-[linear-gradient(to_right,#26262680_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]",
          )}
        />
        {/* Radial gradient for the container to give a faded look */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-[#000319]"></div>
        {/* <p className="relative z-20 bg-linear-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
          Backgrounds
        </p> */}
      </div>
      <div className="relative flex justify-center my-20 z-10 ">
          <div className='max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center'>
            <h2 className='uppercase tracking-widest text-xs text-center text-blue-100 max-w-80'>
              Dynamic Web Magic with Next.js
            </h2>
            <TextGenerateEffect 
              className='text-center text-[40px] md:text-4xl lg:text-5xl'
              words = {words}
              duration={2}
            />
            <p className='text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl'>
              Hi, I&apos;m  Sheemy, a passionate web developer specializing in Next.js.
            </p>
            <a href="#about" className='mt-4'>
            <MagicButton
              title = "Explore My Work"
              icon = {<FaLocationArrow />}
              position = "right"
              otherClasses='gap-2'
            />
            </a>
          </div>
      </div>
      </div>
    
  )
}

export default hero
