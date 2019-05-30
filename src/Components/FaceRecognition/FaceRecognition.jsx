import React, {Component} from 'react';
import './FaceRecognition.css';

class FaceRecognition extends Component {
    render() {
        const box = this.props.box;

        if (this.props.imageUrl === '') {
            return(
                <div className='center'>

                </div>
            )
        } else {
            return(

                <div className='center'>
                    <div className='absolute mt2'>
                        <img id='input-image' src={this.props.imageUrl} alt="Result" width='500px' height={'auto'}/>
                        <div className='bounding-box absolute' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                    </div>
                </div>
            )
        }
    }
}

export default FaceRecognition;