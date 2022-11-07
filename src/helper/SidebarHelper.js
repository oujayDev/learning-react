import React, { useState, useEffect } from 'react'

const SidebarHelper = (ref) => {
    const [isClicked, setIsClicked] = useState();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsClicked(true);
            } else {
                setIsClicked(false);
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
      
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    return isClicked;
};

export default SidebarHelper;