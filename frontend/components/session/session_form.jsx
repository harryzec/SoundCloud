import React from 'react';
import { withRouter } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    debugger
    // let email=email: this.props.email
    this.props.user.email = this.props.email
    debugger
    this.state = this.props.user;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(field) {
    debugger
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() =>this.props.history.push('/discover'));
  }


  renderErrors() {
    return(
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    debugger;
 
    return (

      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <br/>
          <h2 className='createAccount'>Create your SoundCloud account</h2>
          {this.renderErrors()}
          <div className="login-form">
            <br/>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            <p className="usernameLabel">Choose a Username</p>  
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="usernameEnter"
              />

            <br/>
            <label>Choose a Password <strong className='red'>*</strong>
              <br></br>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <p className='subtext'>By signing up I accept the Terms of Use. I have read and understood the Privacy Policy and Cookies Policy.</p>
            <br/>
            
            <input className="session-submit" type="submit" value='Accept & continue' />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);