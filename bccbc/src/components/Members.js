import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import members from './memberlist';
import Member from './Member';
import base from './../base';

class Members extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.login = this.login.bind(this);
    this.showPasswordReset = this.showPasswordReset.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showCreateAccount = this.showCreateAccount.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.state = {
      step : 1
    }
  }

  renderMembers(value, i) {
    return <Member value={value} key={i} />
  }

  handleChange(e) {
    let member = e.target.value;
    browserHistory.push('/user/' + member);
  }

  showCreateAccount() {
    this.setState({ step : 2 });
  }

  showPasswordReset() {
    this.setState({ step : 3 });
  }

  showLogin() {
    this.setState({ step : 1 });
  }

  createAccount(e) {
    e.preventDefault();
    base.auth().createUserWithEmailAndPassword(this.email1.value, this.password1.value).catch(function(error) {
      if (error) {
        console.error(error.message);
        const message = document.querySelector('.message');
        message.innerHTML = `<div class="error">${error.message}</div>`;
        return;
      };
    });
    this.handleAuth(this.name.value);
  }

  login(e) {
    e.preventDefault();
    base.auth().signInWithEmailAndPassword(this.email.value, this.password.value).catch(function(error) {
      if(error) {
        console.error(error.message);
        const message = document.querySelector('.message');
        message.innerHTML = `<div class="error">${error.message}</div>`;
        return;
      }
    });
    this.handleAuth();
  }

  resetPassword(e) {
    e.preventDefault();
    const auth = base.auth();
    const emailAddress = this.email2.value;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
      console.log('Password Reset Email Sent');
      const message = document.querySelector('.message');
      message.innerHTML = `<div class="success">A password reset email has been sent to ${emailAddress}. Please check your email.</div>`;
    }, function(error) {
      if (error) {
        console.error(error.message);
        const message = document.querySelector('.message');
        message.innerHTML = `<div class="error">${error.message}</div>`;
        return;
      }
    });
  }

  handleAuth(name) {
    base.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (name) {
          user.updateProfile({
            displayName: name
          }).then(function() {
            // Update successful.
          }, function(error) {
            console.error(error.message);
            const message = document.querySelector('.message');
            message.innerHTML = `<div class="error">${error.message}</div>`;
            return;
          });
        }
      } else {
        console.error('No User Signed In');
      }
      browserHistory.push('/');
    });
  }

  render() {
    let form;
    const renderLogin = (
      <div key="login">
      <img src="bcc-logo-small.png" alt="bcc-logo" />
        <h3>Please Login</h3>
        <div className="message"></div>
        <form ref="login" onSubmit={this.login}>
          <input type="email" required placeholder="Your Email" ref={(input) => this.email = input}/>
          <input type="password" required placeholder="Your Password" ref={(input) => this.password = input}/>
          <div className="button--highlight">
            <button type="submit">Log In</button>
          </div>
          <div className="other-options"><a href="#" onClick={this.showCreateAccount}>Create Account</a></div>
          <p><a href="#" onClick={this.showPasswordReset}>Forgot Your Password?</a></p>
        </form>
      </div>
    );

    const renderCreateAccount = (
      <div key="createAccount">
      <img src="bcc-logo-small.png" alt="bcc-logo" />
        <h3>Create A New Account</h3>
        <div className="message"></div>
        <form ref="login" onSubmit={this.createAccount}>
          <input type="text" name="name" required placeholder="Your First Name" ref={(input) => this.name = input}/>
          <input type="email" name="email" required placeholder="Your Email" ref={(input) => this.email1 = input}/>
          <input type="password" name="password1" required placeholder="Your Password" ref={(input) => this.password1 = input}/>
          <input type="password" name="password2" required placeholder="Confirm Your Password" ref={(input) => this.password2 = input}/>
          <div className="button--highlight">
            <button type="submit">Create Account</button>
          </div>
          <div className="other-options"><a href="#" onClick={this.showLogin}>Already have an account? Log In</a></div>
          <p><a href="#" onClick={this.showPasswordReset}>Forgot Your Password?</a></p>
        </form>
      </div>
    );

    const renderPasswordReset = (
      <div key="passwordReset">
      <img src="bcc-logo-small.png" alt="bcc-logo" />
        <h3>Enter Your Email To Reset Your Password</h3>
        <div className="message"></div>
        <form ref="login" onSubmit={this.resetPassword}>
          <input type="email" required placeholder="Your Email" ref={(input) => this.email2 = input}/>
          <div className="button--highlight">
            <button type="submit">Send Password Reset</button>
          </div>
          <div className="other-options"><a href="#" onClick={this.showLogin}>Already have an account? Log In</a></div>
          <p><a href="#" onClick={this.showCreateAccount}>Create Account</a></p>
        </form>
      </div>
    );

    switch (this.state.step) {
      case 1:
        form = renderLogin;
        break;

      case 2:
        form = renderCreateAccount;
        break;

      case 3:
        form = renderPasswordReset;
        break;
    }
    return (
      <div className="App login">
        <h1>Welcome to the BCC Buyer's Club</h1>
        <div className="card">
        <div className="card-inner">
        <ReactCSSTransitionGroup
          transitionName="form-step"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {form}
          </ReactCSSTransitionGroup>
          </div>
        </div>
      </div>
    )
  }
}

export default Members;
