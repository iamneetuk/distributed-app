import React, { Component } from 'react';
import Axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            isLoggedIn: false
        };
    }


    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value
        });
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    handlePassChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmitClick = async () => {
        let params = {};
        params['email'] = this.state.email;
        params['password'] = this.state.password;
        let userId = await this.registerNewAccount(params);
        this.setUserLoggedIn(userId);
    }

    registerNewAccount = async (params) => {
        var response = await Axios.post('http://localhost:49160/register', params);
        console.log(response.data.message);
        return response.data.userId;
    }

    getUserInfo = async (id) => {
        console.log('user id', id);
        var response = await Axios.get(`http://localhost:49160/user/${id}`, {});
        return response;
    }

    setUserLoggedIn = async (userId) => {
        var response = await this.getUserInfo(userId);
        console.log(' setUserLoggedIn response', response);
        if (response.data !== undefined && response.data.isActiveUser) {
            this.setState({
                isLoggedIn: true
            });
        }
    }

    render() {
        if (this.state.isLoggedIn) {
            alert('You are logged in! ');
        }

        return (
            <div>
                <h1>SignUp Page</h1>
                <br />
                <div>
                    <label>Email</label>
                    <input type='email' value={this.state.email} onChange={this.handleEmailChange} />
                </div>
                <br />
                <div>
                    <label>Password</label>
                    <input type='text' value={this.state.password} onChange={this.handlePassChange} />
                </div>
                <br />
                <button type='submit' onClick={this.handleSubmitClick}>SignIn</button>
                <br />
            </div>
        );
    }
}

export default SignUp;