import React, {Component} from 'react';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        }

    }

    nameTxtFieldChanged = (event) =>{
        this.setState({
            name: event.target.value
        });
    };

    emailTxtFieldChanged = (event) =>{
        this.setState({
            email: event.target.value
        });
    };

    passwordTxtFieldChanged = (event) =>{
        this.setState({
            password: event.target.value
        });
    };

    registerBtnPressed = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.email === this.state.email) {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                } else {
                    console.log("couldn't register user");
                }
            });
    };

    render() {
        return(
            <div>
                <article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                    <main className="pa4 black-80">
                        <div className="measure">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f1 fw6 ph0 mh0">Register</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="text" name="name" id="name" onChange={this.nameTxtFieldChanged}/>
                                </div>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email" name="email-address" id="email-address" onChange={this.emailTxtFieldChanged}/>
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password" name="password" id="password" onChange={this.passwordTxtFieldChanged}/>
                                </div>
                            </fieldset>
                            <div className="">
                                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                       type="submit" value="Register" onClick={this.registerBtnPressed}/>
                            </div>
                            <div className="lh-copy mt3">
                                <p className="f6 link dim black db pointer" onClick={() => this.props.onRouteChange('signin')}>Back to Sign In</p>
                            </div>
                        </div>
                    </main>
                </article>
            </div>
        )
    }
}

export default Register;