import React from 'react';
import { withRouter } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: this.props.user };
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
    // this.handleEntry = this.handleEntry.bind(this);
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() =>this.props.history.push('/discover'));
  }

//   handleDemoSubmit(e) {
//     e.preventDefault();
//     const user = Object.assign({
//         username: "derek",
//         email: 'harryzec@gmail.com', 
//         password: "123456",
//         gender: 'male',
//         age: 18
//     });
//     this.props.login(user).then(this.props.closeModal);
// }

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
    const firstStep = (
      <div className="login-form-container">
        <input className="demo-button" type="submit" value="Demo User" onClick={this.handleDemoSubmit}/>
        <form onSubmit={this.handleEntry} className='login-form-box'>
          <p>or</p>
          <input type="text"
                value={this.state.email}
                placeholder='Your email address or profile URL'
                onChange={this.update('email')}
                className="login-input"
              />
          <input className="session-submit-button" type="submit" value="Continue" />
        </form>
        {this.renderErrors()}
      </div>
    )

 
    return (

      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <br/>
          {this.props.formType} 
          <br/>
          {this.renderErrors()}
          <div className="login-form">
            <br/>
              <input type="text"
                value={this.state.email}
                placeholder='Your email address or profile URL'
                onChange={this.update('email')}
                className="login-input"
              />

            <label>Username:
              <input type="text"
                value={this.state.username}
                onChange={this.update('username')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            <p className='subtext'>We may use your email and devices for updates and tips on SoundCloud's products and services, and for activities notifications. You can unsubscribe for free at any time in your notification settings. We may use information you provide us in order to show you targeted ads as described in our</p>
            <br/>
            
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SessionForm);