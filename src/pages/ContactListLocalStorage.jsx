import React, { useState, useEffect } from 'react';
import { HiTrash, HiExclamationCircle } from 'react-icons/hi';

const ContactListLocalStorage = () => {
  const [contactList, setContactList] = useState(() => JSON.parse(localStorage.getItem('contacts') || []));
  const [contactInfo, setContactInfo] = useState({name: '', contact: ''});
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;

    setContactInfo({
      ...contactInfo,
      [name]: e.target.value
    });  
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactInfo.name && contactInfo.contact) {
      setError(false);
      let uniqueId = new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
      let data = {id: uniqueId, name: contactInfo.name, contact: contactInfo.contact}
      setContactList([...contactList, data]);
    } else {
      setError(true);
    }
    setContactInfo({name: '', contact: ''});
  }

  const deleteContact = (id) => {
    let newContactList = contactList.filter((item) => item.id !== id);
    setContactList([...newContactList]);
  }
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contactList));
  }, [contactList]);

  useEffect(() => {
    const enableErr = setTimeout(() => {
      setError(false);
    }, 1000);

    return () => {
      clearTimeout(enableErr);
    }
  }, [error])
  

  return (
    <div className='w-[700px] h-screen mx-auto'>
      <h1 className='mb-3 pt-8 font-bold text-3xl'>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label htmlFor="name" className='font-medium'>Name</label>
          <div className='flex items-center gap-1'>
            <input type="text" id='name' name='name' value={contactInfo.name} className={`block bg-slate-300 rounded-md focus:outline-gray-400 p-2 text-black w-1/2 ${error ? 'border-2 border-red-600' : ''}`} onChange={handleChange}/>
            <div className={error ? 'block text-red-600 text-lg' : 'hidden'}>
              <HiExclamationCircle />
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <label htmlFor="contact" className='font-medium'>Contact Number</label>
          <div className='flex items-center gap-1'>
            <input type="text" id='contact' name='contact' value={contactInfo.contact} className={`block bg-slate-300 rounded-md focus:outline-gray-400 p-2 text-black w-1/2 ${error ? 'border-2 border-red-600' : ''}`} onChange={handleChange}/>
            <div className={error ? 'block text-red-600 text-lg' : 'hidden'}>
              <HiExclamationCircle />
            </div>
          </div>
        </div>
        <button type='submit' className='bg-black text-white py-2 px-3 font-medium rounded-md active:bg-slate-800'>Add Contact</button>
      </form>
      <div className='mt-10'>
        {contactList.map(item => {
          return (
            <div key={item.id} className="my-5 border border-gray-400 rounded-md hover:shadow-lg hover:shadow-black w-1/3 p-5 relative group">
              <div>
                <p className='text-2xl font-semibold'>{item.name}</p>
                <p className='text-xl font-medium'>{item.contact}</p>
              </div>
              <div className='text-2xl text-transparent  absolute top-1/2 right-5 -translate-y-1/2 group-hover:text-red-600'>
                <button role="button" onClick={() => {deleteContact(item.id)}}><HiTrash /></button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ContactListLocalStorage;