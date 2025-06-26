import React, { useState } from 'react'
import { useStateContext } from '../context/index';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
    const [username, setUsername] = useState('')
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    
// ============ Destruct the create user function from the state context ============
    const { createUser } = useStateContext();

    // ============ Destruct the user object from the privy auth ============
    const { user } = usePrivy();
    const navigate = useNavigate();

    console.log(user);
    const handleOnboardingSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Create a new user object
            const userData = {
                name: username,
                email: user.email.address,
                age: parseInt(age, 10),
                location,
                // Because we are using privy hook
                createdBy: user.email.address,
            };
            // const to hold the new user data
            const newUser = await createUser(userData);

            if (newUser) {
                navigate('/profile');
                console.log('User created successfully', newUser);
            } else {
                console.error('Error creating user');
            }
        } catch (error) {
            console.error('Error during onboarding:', error);
        } finally {
            setIsLoading(false);
        }
    };


  return (
    <div className='flex min-h-screen items-center justify-center bg-[#13131a]'>
        <div className='w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg'>
            <h2 className='mb-2 text-center text-5xl font-bold'>👋</h2>
            <h2 className='mb-6 text-center text-2xl font-bold text-white'>Welcome!, Let's get started</h2>

            <form onSubmit={handleOnboardingSubmit}>
                {/* Username */}
                <div className='mb-4'>
                    <label htmlFor="username"
                    className='mb-2 block text-sm text-gray-300'>
                        Username
                    </label>
                    <input type="text" id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className='w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400
                    focus:outline-none' />
                </div>

                {/* Age */}
                <div className='mb-4'>
                    <label htmlFor="age"
                    className='mb-2 block text-sm text-gray-300'>
                        Age
                    </label>
                    <input type="number" id='age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className='w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400
                    focus:outline-none' />
                </div>

                {/* Location */}
                <div className='mb-4'>
                    <label htmlFor="location"
                    className='mb-2 block text-sm text-gray-300'>
                        Location
                    </label>
                    <input type="text" id='location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className='w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400
                    focus:outline-none' />
                </div>

                {/* Submit Button */}
                <div className='mb-4'>
                    <button type="submit" 
                    disabled={isLoading}
                    className='w-full rounded-lg bg-blue-500 text-white px-4 py-3 font-bold hover:bg-blue-600
                    focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50'>
                        {isLoading ? 'Creating Account...' : 'Get Started'}
                    </button>
                </div>

            </form>
        </div>
    </div>
  )
}

export default Onboarding;