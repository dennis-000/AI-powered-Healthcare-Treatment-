import React, { useState } from 'react'
import {navLinks} from '../constants'
import {Link, useNavigate} from 'react-router-dom'
import {sun } from '../assets'
import { IconHeartHandshake } from '@tabler/icons-react'

const Icon = ({styles, name, imageUrl, isActive, disable, handleClick}) => {
    return (
        // if a link is active
        <div className={` h-[48px] w-[48px] rounded-[10px] 
            ${isActive && isActive === name && 'bg-[#2c2f32]'} flex items-center justify-center ${styles}`}
            onClick={handleClick}
            >
                {/* if a class is not active */}
                {!isActive ? (
                    <img src={imageUrl} alt='Nkosuologo' 
                    className='h-6 w-6' />
                ): (
                    <img src={imageUrl} alt='Nkosuologo'
                    className={`h-6 w-6 ${isActive !== name ? 'grayscale' : ''}`}
                    />
                )}

        </div>
    )
}

const Sidebar = () => {
    /**
     * The hook that allows us to navigate to other routes
     */
    const navigate = useNavigate();

    /**
     * The state variable that manages the active navigation item
     */
    const [isActive, setIsActive] = useState('dashboard')
    
    /**
     * The function that handles the click event on a navigation item
     */
    const handleClick = (name) => {
        setIsActive(name)
        navigate(`/${name}`)
    }

  return (
    <div className='sticky top-5 flex h-[93vh] flex-col items-center justify-between'>
        <Link
        to='/'
        >
            <div className='rounded-[10px] bg-[#2c2f36] p-2'>
                <IconHeartHandshake size={40} color='#1ec070'/>
                {/* <img src={sun} alt='Nkosuo logo' className='h-6 w-6' /> */}
            </div>
        </Link>

        <div className='mt-12 flex w-[76px] flex-1 flex-col items-center
        justify-between rounded-[20px] bg-[#1c1c24] py-4'>
            <div className='flex flex-col items-center justify-between gap-3'>
                {
                    navLinks.map((link) => (
                        <Icon
                            key={link.name}
                            {...link}
                            isActive={isActive}
                            // when user clicks on the icons then navigates
                            handleClick={
                                () => {
                                setIsActive(link.name);
                                navigate (link.link);
                            }}
                        />
                    ))
                }

            </div>
            <Icon styles='bg-[#1c1c24] shadow-secondary' imageUrl={sun}/>
        </div>

    </div>
  )
}

export default Sidebar;