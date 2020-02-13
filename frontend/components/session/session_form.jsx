import React from 'react';
import { withRouter } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    this.props.user.email = this.props.email
    

    this.state={username: this.props.user.username, 
            email: this.props.user.email, 
            password: this.props.user.password, 
            loginInput: 'loginInput',
            emailError: 'emailError',
            startPos: 'startPos',
            takenUser: 'takenUserNo',
            validUser: 'takenUserNo',
            usernameEnter: 'usernameEnter',
            passwordShow: 'takenUserNo',
            passwordEnter: 'passwordEnter',
            movePassword: 'movePassword',
            lowTerms: 'startTerms'
          }
    this.handleSubmit = this.handleSubmit.bind(this);
    debugger;
  }

  update(field) {
    debugger
    return e => this.setState({[field]: e.currentTarget.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    let user = {username: this.state.username, email: this.state.email, password: this.state.password}
    this.props.processForm(user).then(() =>this.props.history.push('/discover'), ()=> this.renderErrors());

  }


  // Email can't be blank
  // Email is invalid
  // Username can't be blank
  // Username has already been taken
  // Password is too short (minimum is 6 characters)


  renderErrors() {
    debugger
    if (this.props.errors.includes("Email can't be blank") || this.props.errors.includes('Email is invalid')) {
      this.setState({loginInput: 'errorLogin', 
                    emailError: 'emailErrorShow',
                    startPos: 'endPos'
                    })
    }
    if (!this.props.errors.includes("Email can't be blank") && !this.props.errors.includes('Email is invalid')) {
      this.setState({loginInput: 'loginInput', 
                    emailError: 'emailError',
                    startPos: 'startPos'
                    })
    }
    if (this.props.errors.includes('Username has already been taken')){
      this.setState({takenUser: 'takenUser', validUser: 'takenUserNo', usernameEnter: 'usernameEnterError', movePassword:'movePasswordDown'})
    }
    if (this.props.errors.includes("Username can't be blank")){
      this.setState({validUser: 'validUser', takenUser: 'takenUserNo', usernameEnter: 'usernameEnterError', movePassword:'movePasswordDown'})
    }

    if (!this.props.errors.includes('Username has already been taken') && !this.props.errors.includes("Username can't be blank")) {
      this.setState({validUser: 'takenUserNo', takenUser: 'takenUserNo', usernameEnter: 'usernameEnter', movePassword:'movePassword'})
    }

    if (this.props.errors.includes('Password is too short (minimum is 6 characters)')){
      this.setState({passwordShow: 'passwordShow', passwordEnter: 'passwordEnterError', lowTerms: 'endTerms'})
    }
    if (!this.props.errors.includes('Password is too short (minimum is 6 characters)')){
      this.setState({passwordShow: 'takenUserNo', passwordEnter: 'passwordEnter', lowTerms: 'startTerms'})
    }

    // return(
    //   <ul>
    //     {this.props.errors.map((error, i) => (
    //       <li key={`error-${i}`}>
    //         {error}
    //       </li>
    //     ))}
    //   </ul>
    // );
  }

  render() {

    const { username, email, password, 
          loginInput, emailError, startPos, 
          takenUser, validUser, usernameEnter,
          passwordShow, passwordEnter, movePassword,
          lowTerms} = this.state
  
    return (
      

      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <br/>
          <h2 className='createAccount'>Create your SoundCloud account</h2>
          <div className="login-form">
            <br/>
              <input type="text"
                value={email}
                onChange={this.update('email')}
                className={loginInput}
              />
            <p className={emailError}>Enter a valid email address or profile url.</p>
            
            <div className={startPos}>
            <p className="usernameLabel">Choose a Username</p>  
              <input type="text"
                value={username}
                onChange={this.update('username')}
                className={usernameEnter}
              />
            
            <p className={takenUser}>Username has already been taken</p>
            <p className={validUser}>Enter a valid Username</p>
            
            <br/>

            <div className={movePassword}>
            <p className='passwordLabel'>Choose a Password <strong className='red'>*</strong></p>
              
              <input type="password"
                value={password}
                onChange={this.update('password')}
                className={passwordEnter}
              />
            <p className={passwordShow}>Use at least 6 characters</p>
            <div className={lowTerms}>
            <p className='subtext'>By signing up I accept the Terms of Use. I have read and understood the Privacy Policy and Cookies Policy.</p>
            </div>
            <br/>
            
            <input className="accept" type="submit" value='Accept & continue' />
            </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);