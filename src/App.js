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
            imageUrl: '',
            image: '',
            box: {}
        }
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
            imageUrl: this.state.input
        });

        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then( response => this.displayFaceBox(this.calculateFaceBox(response)))
            .catch(error => console.log(error));
    };

    render() {
        return (
            <div className="App">
                <Particles params={particleOptions} className='particles'/>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onEnterPressed={this.onEnterPressed}/>
                <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>

            </div>
        );
    }
}

export default App;
