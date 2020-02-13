import React from 'react';
import { withRouter } from 'react-router-dom'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    debugger
    // let email=email: this.props.email
    this.props.user.email = this.props.email
    debugger
    this.state = { username: this.props.user.username, 
                  email: this.props.user.email, 
                  password:this.props.user.password, 
                  noMatch: 'takenUserNo',
                  LogInCurrent: 'LogInCurrent'};
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

    const user = {email: this.state.email, username: this.state.username, password: this.state.password}
    this.props.processForm(user).then(() =>this.props.history.push('/discover'), () => this.renderErrors());
  }


  renderErrors() {
    debugger
    if (this.props.errors.includes('Invalid username/password combination')) {
      this.setState({noMatch: 'invalidCreds', LogInCurrent: 'LogInDown'})
    }
  }

  render() {
    debugger;

    const {noMatch, email, LogInCurrent} =this.state
 
    return (

      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <br/>
          <br/>
          <div className="login-form">
            <br/>
              <input type="text"
                value={email}
                onChange={this.update('email')}
                className="loginInput"
              />
            <br/>
      
            <input type="password"
              placeholder='Your Password*'
              onChange={this.update('password')}
              className="loginInput"
            />

          <p className={noMatch}>Invalid username/password combination</p>
      
            <br/>
            
            <input className={LogInCurrent} type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);