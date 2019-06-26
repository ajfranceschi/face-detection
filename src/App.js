import React, {Component} from 'react';
import Particles from 'react-particles-js';
import particleOptions from './Resources/particleOptions';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';



const initialState = {
    input: '',
    imageUrl: '',
    image: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
};

const SMART_BRAIN_API_URL = 'https://dry-earth-63242.herokuapp.com';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    onInputChange = (event) => {
        this.setState({
            input : event.target.value
        });

    };

    onEnterPressed = (event) => {
        if (event.key === 'Enter') {
            this.onButtonSubmit();
        }
    };

    calculateFaceBox = (data) => {
        const clarifaiBox = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('input-image');
        const imageWidth = image.width;
        const imageHeight = image.height;

        return {
            topRow: Number(clarifaiBox.top_row * imageHeight),
            leftCol: Number(clarifaiBox.left_col * imageWidth),
            bottomRow: Number(imageHeight - (clarifaiBox.bottom_row * imageHeight)),
            rightCol: Number(imageWidth - (clarifaiBox.right_col * imageWidth))
        }
    };

    displayFaceBox = (box) => {
        this.setState({
            box: box
        })
    };

    onButtonSubmit =() => {
        this.setState({
            imageUrl: this.state.input,
        });

        fetch(`${SMART_BRAIN_API_URL}/imageurl`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(clarifai => clarifai.json())
            .then( response => {
                console.log(response);
                if (response) {
                    fetch(`${SMART_BRAIN_API_URL}/image`, {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(entries => {
                            this.setState(
                                Object.assign(this.state.user, {entries: entries})
                            );

                    }).catch(console.log);
                    this.displayFaceBox(this.calculateFaceBox(response))
                }
            })
            .catch(error => console.log(error));
    };

    loadUser = (user) => {
        this.setState({
            user: user
        });
    };

    onRouteChange = (route) => {
        let receivedRoute = route;

        if (receivedRoute === 'home') {
            this.setState({
                isSignedIn: true
            });
        } else if (receivedRoute === 'signout') {
            this.setState(initialState);
            receivedRoute = 'signin';
        }
        this.setState({
            route: receivedRoute
        });
    };

    render() {
        const {isSignedIn, route, imageUrl, box} = this.state;
        return (
            <div className="App">
                <Particles params={particleOptions} className='particles'/>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>

                {route === 'home'
                    ? <div>
                        <Logo />
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onEnterPressed={this.onEnterPressed}/>
                        <FaceRecognition imageUrl={imageUrl} box={box}/>
                    </div>
                    : (route === 'signin'
                            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                            : <Register onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} loadUser={this.loadUser}/>
                    )
                }
            </div>
        );
    }
}

export default App;
