import * as React from 'react';
import { Fragment, Component } from 'react';

import * as Actions from './actions';
import { connect } from 'react-redux';

// There's definitely a better way to do this but I totally forgot
// Any way we can get access to the GH code from web dev last year @molotsky
class RegisterForm extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            email: ''
        };

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);        
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeFirstName(event) {
        this.setState({firstName: event.target.value});
    }

    onChangeLastName(event) {
        this.setState({lastName: event.target.value});
    }

    onChangeUsername(event) {
        this.setState({username: event.target.value});
    }

    onChangePassword(event) {
        this.setState({password: event.target.value});
    }

    onChangeEmail(event) {
        this.setState({email: event.target.value});
    }

    onSubmit(event) {
        console.log(this.state.firstName);
        console.log(this.state.lastName);
        console.log(this.state.username);
        console.log(this.state.password);
        console.log(this.state.email);
        event.preventDefault();
    }

    render() {
        return (
               <form onSubmit={this.onSubmit}>
                    <label>
                      First Name:
                      <input type="text" value={this.state.firstName} onChange={this.onChangeFirstName} />
                    </label>
                    <br/>
                    <label>
                      Last Name:
                      <input type="text" value={this.state.lastName} onChange={this.onChangeLastName} />
                    </label>
                    <br/>                    
                    <label>
                      Username:
                      <input type="text" value={this.state.username} onChange={this.onChangeUsername} />
                    </label>
                    <br/>
                    <label>
                      Password:
                      <input type="text" value={this.state.password} onChange={this.onChangePassword} />
                    </label>
                    <br/>
                    <label>
                      Email:
                      <input type="text" value={this.state.email} onChange={this.onChangeEmail} />
                    </label>
                    <br/>
                    <input type="submit" value="Submit" />
              </form>
        )
    }
}


// This gives the component access to the store (state)
const mapStateToProps = state => {
    return {
        store: {
            ...state
        }
    };
}

// This gives the component access to dispatch / the actions
const mapDispatchToProps = dispatch => {
    return {
        initializeApplication: () => { dispatch(Actions.initializeApplication()); }
    }
}

// This method wraps the component with the store and dispatch!!!
export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);