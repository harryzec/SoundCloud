import React from 'react'
import { withRouter } from "react-router";

class EditForm extends React.Component {
  constructor(props) {
    super(props)
    this.update = this.update.bind(this)
    this.handlePhoto = this.handlePhoto.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = ({username: this.props.currentuser.username, profilepicture: this.props.currentuser.profileUrl, allowchange: 'nosaveuser'})
  }

  handleSubmit(e) {
    debugger
    e.preventDefault()
    if (this.state.allowchange === 'nosaveuser') {
      return null
    } else {
      let updatedUser = new FormData();
      if (this.state.photo !== undefined) {
        updatedUser.append('user[profile_picture]', this.state.photo);
      }
      updatedUser.append('user[id]', this.props.currentuser.id);
      updatedUser.append('user[username]', this.state.username);
      console.log(updatedUser)

      this.props.updateUser(updatedUser, this.props.currentuser.id).then(()=> this.props.closeUserModal())
    }
  }

  handlePhoto(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ profilepicture: reader.result, photo: file, allowchange: 'saveedituser'});

  if (file) {
    reader.readAsDataURL(file);
  } else {
    this.setState({ profilepicture: null, photo: null });
  }
  }

  update(e) {
    debugger
    e.preventDefault();
    this.setState({username: e.currentTarget.value, allowchange: 'saveedituser'})
  }
  render() {
    return (
      <>
        <div className='edituserform'>
          <h2 className='editprofileheader'>Edit your Profile</h2>
          <div className='editprofilecontent'>
            

            <div className='makeitflex'>
              <div className='flexedituser'>
                <div className='songImgIn2'>
                  <input type='file' id='uploadPicture' onChange={this.handlePhoto}/>
                  <img src={this.state.profilepicture} className='profilepicchange'></img>
                </div>
                <button className='selectImgB2'onClick={()=>document.getElementById('uploadPicture').click() }>&#128247; Select Image</button>
              </div>
              <div className='displayflexuser'>
                <p className='enteruser'>Username: </p>
                <input onChange={this.update} className='updateusername' value={this.state.username} />
              </div>
            </div>

            <div className='edituserbuttons'>
              <div onClick={()=>this.props.closeUserModal()} className='canceledituser'>Cancel</div>
              <div onClick={this.handleSubmit} className={this.state.allowchange}>Save Changes</div>
            </div>

          </div>
        </div>
      </>
    )
  }
}

export default withRouter(EditForm)