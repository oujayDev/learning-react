import React, { useState } from 'react';
import axios from 'axios';
import Meme from '../images/laugh.png';
import background from '../images/dadjokes-bg.jpg';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';
import { FiShuffle } from 'react-icons/fi';
import { FaTwitter } from 'react-icons/fa';
import Laugh1 from '../images/laugh-1.gif';
import Laugh2 from '../images/laugh-2.gif';
import Laugh3 from '../images/laugh-3.gif';
import Laugh4 from '../images/laugh-4.gif';
import Laugh5 from '../images/laugh-5.gif';
import Laugh6 from '../images/laugh-6.gif';
import Laugh7 from '../images/laugh-7.gif';
import Laugh8 from '../images/laugh-8.gif';
import Laugh9 from '../images/laugh-9.gif';
import Laugh10 from '../images/laugh-10.gif';

const gif = [
  Laugh1,
  Laugh2,
  Laugh3,
  Laugh4,
  Laugh5,
  Laugh6,
  Laugh7,
  Laugh8,
  Laugh9,
  Laugh10
]


const DadJokes = () => {
  const url = 'https://icanhazdadjoke.com/';
  const [jokes, setJokes] = useState();
  const [isHeart, setIsHeart] = useState(false);
  const [currentGif, setCurrentGif] = useState(Laugh1);

  const getJokes = () => {
    axios.get(url, { headers: { Accept: 'application/json' } })
      .then((res) => setJokes(res.data))
      .catch((err) => console.log(err))
      .then(() => {
        setIsHeart(false);
        setCurrentGif(gif[Math.floor(Math.random() * gif.length)]);
      })
  }

  const heartHandler = () => {
    isHeart ? setIsHeart(false) : setIsHeart(true)
  }


  return (
    <div className='w-full h-screen relative' style={{backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 w-1/2'>
        <div className='p-5 mt-5 rounded-sm relative'>
          {jokes ?
          (
            <div className='grid justify-items-center gap-5 p-10'>
              <img src={currentGif} alt="meme gif"  className='h-52'/>
              <p className='font-semibold text-4xl text-center'>{jokes.joke}</p>
              <div className='flex justify-center items-center'>
                <div className='p-5 relative'>
                  <button className={`text-4xl rounded-full p-3 peer ${isHeart ? 'bg-red-700 text-white' : 'text-red-700 outline outline-red-700'}`} onClick={heartHandler}>{isHeart ? <HiHeart /> : <HiOutlineHeart />}</button>
                  <span className='absolute left-1/2 -top-2 -translate-x-1/2 text-xs bg-black rounded-md py-1 px-2 text-white text-center invisible peer-hover:visible ease-linear transition-opacity opacity-90 w-20'>Love it!</span>
                </div>
                <div className='p-5 relative'>
                  <button className='text-4xl text-white rounded-full bg-blue-600 p-3 peer'><FaTwitter /></button>
                  <span className='absolute left-1/2 -top-2 -translate-x-1/2 text-xs bg-black rounded-md py-1 px-2 text-white text-center invisible peer-hover:visible ease-linear transition-opacity opacity-90 w-20'>Tweet it!</span>
                </div>
                <div className='p-5 relative'>
                  <button onClick={getJokes} className=" bg-emerald-600 rounded-full text-white text-4xl p-3 peer"><FiShuffle /></button>
                  <span className='absolute left-1/2 -top-2 -translate-x-1/2 text-xs bg-black rounded-md py-1 px-2 text-white text-center invisible peer-hover:visible ease-linear transition-opacity opacity-90 w-20'>New joke!</span>
                </div>
              </div>
            </div>
          ) : (
            <div className='grid justify-items-center gap-5'>
              <img src={Meme} alt='El Risitas Laughter Meme' className='w-72' />
              <p className='font-semibold text-5xl'>Do you wanna laugh today? </p>
              <button onClick={getJokes} className=" bg-black text-white py-2 px-3 rounded-md">Generate Random Joke</button>
            </div>
          )}
        </div>
      </div>
    </div>

  )
}

export default DadJokes