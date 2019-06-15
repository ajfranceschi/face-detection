import React, {Component} from 'react';

class Rank extends Component {
    render() {
        return(
            <div className='white'>
                <p className='f3 ma0 pa0'>
                    {`${this.props.name}, your current entry count is...`}
                </p>
                <p className='f1 ma0 pa0'>
                    {this.props.entries}
                </p>
            </div>
        );
    };
}

export default Rank;