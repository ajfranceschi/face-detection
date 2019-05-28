import React from 'react';
import Particles from 'react-particles-js';
import particleOptions from './Resources/particleOptions';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';

import './App.css';

function App() {
    return (
        <div className="App">
            <Particles params={particleOptions} className='particles'/>
            <Navigation />
            <Logo />
            <Rank />
            <ImageLinkForm />
        </div>
    );
}

export default App;
