import { useRef } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import { Home, MyPet, ContactListLocalStorage, DadJokes, ImageAPI } from './pages';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { HiMenu, HiX } from 'react-icons/hi';
import SidebarHelper from './helper/SidebarHelper';

function App() {
  const { collapsed, collapseSidebar, toggleSidebar, toggled } = useProSidebar();
  const boxRef = useRef(null);
  const outsideSidebarClick = SidebarHelper(boxRef);

  return (
    <div>
      <Router>
        <div className='absolute z-20' ref={boxRef}>
          <Sidebar defaultCollapsed="false" collapsedWidth='0' className='relative h-screen w-[270px] bg-black'>
            <Menu className='mt-16'>
              <Link to="/"><MenuItem>Home</MenuItem></Link>
              <Link to="/mypet"><MenuItem>My Pet</MenuItem></Link>
              <Link to="/contactlistlocalstorage"><MenuItem><span className='truncate'>Contact List w/ Local Storage</span></MenuItem></Link>
              <Link to="/dadjokes"><MenuItem>Dad Jokes</MenuItem></Link>
              <Link to="/imageapi"><MenuItem>Imag.io</MenuItem></Link>
            </Menu>
            <div className='absolute top-5 right-5 text-2xl'>
              <button onClick={() => collapseSidebar()} className="border border-black rounded-full"><HiX /></button>
            </div>
          </Sidebar>
        </div>
        <div className='relative'>
          <div className='absolute top-0 left-0 m-5 text-3xl z-10'>
              <button onClick={() => collapseSidebar()}><HiMenu /></button>
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mypet' element={<MyPet />} />
            <Route path='/contactlistlocalstorage' element={<ContactListLocalStorage />} />
            <Route path='/dadjokes' element={<DadJokes />} />
            <Route path='/imageapi' element={<ImageAPI />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
