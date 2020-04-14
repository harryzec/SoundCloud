import React from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../../actions/session_actions'
import { login } from '../../util/session_api_util';
import { withRouter } from 'react-router-dom'

class VerifyUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', emailBlank: 'noshowEmailBlank' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.email === '') {
      this.setState({ emailBlank: 'showEmailBlank'})
    } else {
      
    let oldState = Object.assign({}, this.state)
    delete oldState['emailBlank']
    this.props.verifyUsername(oldState)
    }
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value})
  }

  handleDemo(e) {
    // debugger
    e.preventDefault();
    const demoUser = {email: 'demo@user.com', username: 'demouser', password: 'abcdegf'};
    this.props.processForm(demoUser).then(() =>this.props.history.push('/discover'));
  }

  render() {
    return(
      <div class='verifyUserContainer'>
        <form onSubmit={this.handleDemo}>
          <button className='demoButton'>Demo User</button>
        </form>
        <div className='lineDivide1'></div><p className='divOr'>or</p><div className='lineDivide2'></div>
        
        <form onSubmit={this.handleSubmit}>
          <input type="email"
                value={this.state.email}
                placeholder='Your email address or profile URL*'
                onChange={this.update('email')}
                className="emailEnter"
              />
              <br></br>
            <p className={this.state.emailBlank}>Enter a valid email address or profile URL</p>
          <input className="email-submit" type="submit" value='Continue' />
        </form>
        <div className='terms'>
        <p className='firstP'>We may use your email and devices for updates and tips on SoundCloud's products and services, and for activities notifications. You can unsubscribe for free at any time in your notification settings.
        </p>
        <p>
      We may use information you provide us in order to show you targeted ads as described in our Privacy Policy.</p>
      </div>
      </div>
    )
  }
}

export default withRouter(VerifyUserForm);