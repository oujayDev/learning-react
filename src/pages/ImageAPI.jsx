import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import './search.css';

const API = axios.create({
    baseURL: `https://api.unsplash.com/`,
    headers: { "Authorization": `Client-ID qEYyshnzxKtf8-q-Vpb06cPfm56Al5vAk4dmk15p8hg` }
    
});

const ImageAPI = () => {
    const [displayedImages, setDisplayedImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchImages = () => {
        API
            .get('/photos', {
                params: {per_page: 30}
            })
            .then((res) => {
                console.log(res.data)
                setDisplayedImages(res.data)
            })
            .catch((err) => console.log(err))
    };

    useEffect(() => {
        fetchImages();
    }, [])

    const handleInput = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        API
        .get('/search/photos', {
            params: {
                query: searchTerm,
                per_page: 30
            }
        })
        .then((res) => {
            console.log(res);
            setDisplayedImages(res.data.results);
        })
        .catch((err) => console.log(err))
    }



    return (
        <div className='w-full'>
            <div 
                className='w-full' 
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL + "img/hero-bg.jpg"})`,
                    backgroundSize: 'cover',
                    height: '50vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center bottom',
                }}
            >
                <form className='w-full h-full backdrop-blur-sm' onSubmit={handleSubmit}>
                    <div className=' w-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <div className='mb-5'>
                            <h1 className='font-bold text-5xl text-white mb-1 drop-shadow-2xlxl'>Imag.io</h1>
                            <p className='text-lg font-light text-white drop-shadow-xl'>Beautiful images is right around the corner.</p>
                        </div>
                        <div className='flex gap-1 border bg-white p-1 rounded-md hover:ring-4 hover:ring-white/10 transition'>
                            <input type="search" className='w-full p-2 text-inherit text-lg font-normal text-gray-900 focus:outline-none search' placeholder='Search images' value={searchTerm} onChange={handleInput}/>
                            <button className='text-3xl text-gray-400 hover:text-gray-800 transition p-2' type='submit'><HiSearch /></button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='px-24 pt-10 columns-2 md:columns-3 lg:columns-3'>
                {displayedImages.map((image) => (
                    <div key={image.id} className="mb-4 relative group">
                        <img src={image.urls.regular} alt="images"/>
                        <div className='absolute top-0 left-0 hidden group-hover:block group-hover:bg-black/30 w-full h-full'>
                            <div className='flex items-center gap-2 text-sm text-white absolute bottom-2 left-2'>
                                <img src={image.user.profile_image.small} alt="profile" className='rounded-full'/>
                                <p className='font-medium'><a href={image.user.links.html}>{`${image.user.first_name} ${image.user.last_name || ""}`}</a></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageAPI;