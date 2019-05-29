import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import particleOptions from './Resources/particleOptions';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';

const app = new Clarifai.App({
    apiKey: '9b21623083d34be8a4a578486c11241a'
});

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            imageUrl: ''
        }
    }

    onInputChange = (event) => {
        this.setState({
            input : event.target.value
        });

    };

    onButtonSubmit =() => {
        this.setState({
            imageUrl: this.state.input
        });

        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
            function(response) {
                // do something with response
                for (let region of response.outputs[0].data.regions) {
                    console.log(region.region_info.bounding_box);
                }
            },
            function(err) {
                // there was an error
            }
        );
    };

    render() {
        return (
            <div className="App">
                <Particles params={particleOptions} className='particles'/>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognition imageUrl={this.state.imageUrl}/>

            </div>
        );
    }
}

export default App;
