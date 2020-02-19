import React from 'react'
import { withRouter } from "react-router";

class EditForm extends React.Component {
  constructor(props) {
    super(props)
    this.handlePhoto = this.handlePhoto.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = { title: this.props.song.title, genre: this.props.song.genre, 
      hyperlink: this.props.song.hyperlink, 
      id: this.props.song.id,
      description: this.props.song.description,
      customGenre: 'noshowCustom',
      imageUrl: this.props.song.imgUrl,
      submitB: 'nosaveEdit',
      noSave: 'noSave',
      photo: this.props.song.imgUrl}
  }

  handlePhoto(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, photo: file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", photo: null });
    }
  }

  handleEdit(e) {
    debugger
    e.preventDefault();
    const updatedSong = new FormData();
    updatedSong.append('song[photo]', this.state.photo);
    updatedSong.append('song[title]', this.state.title);
    updatedSong.append('song[genre]', this.state.genre);
    updatedSong.append('song[hyperlink]', this.state.hyperlink);
    updatedSong.append('song[description]', this.state.description);
    // const song = {photo: this.state.photo, id: this.state.id, title: this.state.title, genre: this.state.genre, hyperlink: this.state.hyperlink, description: this.state.description}
    this.props.editSong(updatedSong, this.state.id).then(()=> this.props.closeEditModal()).then(() => this.props.location.reload())
  }

  componentDidMount(){
    if ( ['Rock', 'Pop', 'Hip-hop & Rap', 'Country', 'None'].includes(this.state.genre)){
      document.getElementById('genreInput').value = this.state.genre
    }
    else {
      document.getElementById('genreInput').value = 'Custom'
      this.setState({customGenre: 'showCustom'})
      document.getElementById(this.state.customGenre).value = this.state.genre
    }
  }

  update(field){ 

    if (field === 'genre') {
      return e => {
        if (e.currentTarget.value === 'Custom') {
          this.setState({customGenre: 'showCustom', [field]: e.currentTarget.value, submitB: 'saveEdit', noSave: 'nosaveEdit'})
        } else {
          this.setState({customGenre: 'noshowCustom', [field]: e.currentTarget.value, submitB: 'saveEdit', noSave: 'nosaveEdit'})
        }
      }
    } else {
      return e => this.setState({[field]: e.currentTarget.value, submitB: 'saveEdit', noSave: 'nosaveEdit'})
    }
  }

  updateGenre(field) {
    return e => this.setState({[field]: e.currentTarget.value})
  }

  render(){
    const { customGenre, title, hyperlink, description, genre, submitB, noSave } = this.state
    return(
      <>
          <div className='uploadingMarg'>
            <div className='uploadOptions'>
              <h1 className='basicInfo'>Basic Info</h1>
              <h1 className='Metadata'>Metadata</h1>
              <h1 className='Permissions'>Permissions</h1>
            </div>

            <div className='songImgIn'>
                <input type='file' id='uploadPicture' onChange={this.handlePhoto}/>
                <img src={this.state.imageUrl} className='choosePic'></img>
                <button className='selectImgB'onClick={()=>document.getElementById('uploadPicture').click() }>&#128247; Select Image</button>
            </div>

              <form className='almostthere'>
                <div className='titleSection'>
                <label className='titleTitle'>Title<strong className='red'>*</strong></label>
                  <input
                  className='titleInput'
                  type="text"
                  value={title}
                  onChange={this.update('title')}
                  />
                  </div>
                  
                  <div className='hyperlink'>
                  <p className='clonelink'>clonecloud.com/{this.props.current_user.split(' ').join('-')}/</p>
                  <input
                    type='text'
                    className='cloneInput'
                    value={hyperlink}
                    onChange={this.update('hyperlink')}
                  />
                  </div>

                  <label className='genreLabel'>Genre</label>
                  <div className='GenreSection'>
                    <select onChange={this.update('genre')} id='genreInput'>
                      <option value='None'>None</option>
                      <option value='Custom' id='CustomInput'>Custom</option>
                      <option value='Rock'>Rock</option>
                      <option value='Pop'>Pop</option>
                      <option value='Hip-hop & Rap'>Hip-hop & Rap</option>
                      <option value='Country'>Country</option>
                    </select>
                    <input id={customGenre} type='text' onChange={this.updateGenre('genre')}/>
                  </div >
                  
                  <div className='DescriptionUpload'>
                    <label className='descriptionLabel'>Description</label>
                    <textarea onChange={this.update('description')} className='descriptionArea' value={description}/>
                  </div>

                  
                
              </form>
          </div>
            <div className='footEdit'>
              <p className='requireField'><strong className='orange'>*</strong> Required fields</p>
              <div className='uploadButtons'>
              <button className='CancelUpload' onClick={()=>this.props.closeEditModal()}>Cancel</button>
              <button className={noSave}>Save Changes</button>
              <button className={submitB} onClick={this.handleEdit}>Save Changes</button>
              </div>
            </div>
      </>
    )
  }
}

export default withRouter(EditForm)