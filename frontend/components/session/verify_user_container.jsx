import React from 'react';
import { connect } from 'react-redux';
import { verifyUser } from '../../actions/session_actions'

class verifyUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.verifyUsername(this.state)
  }

  update(field) {
    return e => this.setState({[field]: e.currentTarget.value})
  }

  render() {
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <input type="text"
                value={this.state.email}
                placeholder='Your email address or profile URL'
                onChange={this.update('email')}
                className="login-input"
              />
          <input className="session-submit" type="submit" value='Continue' />
        </form>
      </>
    )
  }
}

const mSTP = state => ({

})

const mDTP = state => ({
  verifyUsername: (username) => dispatch(verifyUser(username))
})

// basically once we submit this we want to go dispatch to see if a user exists 

export default connect(mSTP, mDTP)(verifyUserForm)