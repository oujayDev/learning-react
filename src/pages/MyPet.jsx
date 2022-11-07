import React, { useState } from 'react'
import PetGif from '../images/pet3.gif'

const MyPet = () => {
  const [petName, setPetName] = useState('');

  
  const handleInput = (e) => {
    setPetName(e.target.value);
    console.log(petName)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('petName', petName);
    setPetName('');
  }  

  return (
    <div className='w-full h-screen bg-[#327191] relative'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2'>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={petName} className='block mx-auto mt-5 rounded-md text-inherit text-lg font-medium text-center p-1 focus:outline-none' onChange={handleInput} />
                    <button type='submit' className='block bg-blue-600 text-xl font-medium rounded-md px-2 py-1 mx-auto mt-3'>Set Name</button>
                </div>
            </form>
            <div>
                <img src={PetGif} alt="cat" />
                <h1 className='text-center font-bold text-4xl'>Hi I'm {localStorage.getItem('petName')}!</h1>
            </div>
        </div>
    </div>
  )
}

export default MyPet