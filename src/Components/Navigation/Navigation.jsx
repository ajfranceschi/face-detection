import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return(
            <nav className='flex justify-end'>
                <p className='pa3 f3 link pointer underline dark-gray dim' onClick={() => onRouteChange('signout')}>Sign Out</p>
            </nav>
        )
    } else {
        return(
            <nav className='flex justify-end'>
                <p className='pa3 f3 link pointer underline dark-gray dim' onClick={() => onRouteChange('signin')}>Sign In</p>
                <p className='pa3 f3 link pointer underline dark-gray dim' onClick={() => onRouteChange('register')}>Register</p>
            </nav>
        )
    }

};

export default Navigation;