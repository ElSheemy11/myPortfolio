import { projects } from '@/data'
import { div } from 'motion/react-client'
import React from 'react'
import { PinContainer } from './ui/3d-pin'
import { FaLocationArrow } from 'react-icons/fa6'

const RecentProjects = () => {
  return (
    <div className='py-20' id='projects'>
      <h1 className='heading'>
        A small selection of {" "}
        <span className='text-purple-500'>recent projects</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-24 gap-y-8 mt-40 ">
        {projects.map(({id, title, des, img, iconLists, link})=>(
            <div key={id} className='sm:h-164 lg:min-h-130 h-[32rem]flex justify-center items-center sm:w-142.5 w-[80vw]'>
                <PinContainer title={link} href={link}>
                    <div className='relative flex items-center justify-center sm:w-142.5 w-[80vw] overflow-hidden sm:h-[40vh] h-[30vh] mb-10] '>
                        <div className='relative size-full overflow-hidden lg:rounded-3xl bg-[#13162d]'>
                            <img src="/bg.png" alt="bg-img" />
                        </div>
                        <img src={img} alt={title} className='z-10 absolute bottom-0' />
                    </div>
                    
                    <h1 className='font-bold lg:text-2xl md:text-xl text-base line-clamp-1'>
                        {title}
                    </h1>
                    
                    <p className='lg:text-xl lg-font-normal font-light text-sm line-clamp-2'>
                        {des}
                    </p>

                    <div className="flex items-center justify-between mt-7 mb-3">
                      <div className="flex items-center gap-3">
                        {iconLists.map((icon, idx)=> (
                          <div 
                            key={idx} 
                            className="border border-white/20 rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex items-center justify-center mx-1"
                            style={{transform: `translateX(-${5 * idx * 2}px)`}}
                          >
                            <img src={icon} alt={icon} 
                            className="w-8 h-8 lg:w-10 lg:h-10 object-contain p-2"
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-center text-sm lg:text-base font-semibold text-purple-500">
                        <p className="flex lg:text-xl md:text-xs text-sm text-purple">Check out my work!</p>
                        <FaLocationArrow className="ms-3"
                          color="#CBACF9"
                        />
                      </div>

                    </div>

                </PinContainer>
            </div>
        ))}
      </div>
    </div>
  )
}

export default RecentProjects
