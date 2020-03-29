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
      description: this.props.song.description || '',
      customGenre: 'noshowCustom',
      imageUrl: this.props.song.imgUrl,
      submitB: 'nosaveEdit',
      noSave: 'noSave',
      photo: this.props.song.imgUrl,
      customGenre: 'noshowCustom',
      TitleInput: 'titleInput',
      hypererror: 'cloneInput',
      samePerma: 'nosamePerma',
      titleError: 'noshowTitleError'}
  }

  handlePhoto(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onloadend = () =>
      this.setState({ imageUrl: reader.result, photo: file, submitB: 'saveEdit', noSave: 'nosaveEdit' });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ imageUrl: "", photo: null });
    }
  }

  handleEdit(e) {
    e.preventDefault();
    if (this.state.samePerma === 'samePerma',this.state.TitleInput === 'titleInputred' || this.state.titleError === 'showTitleError' || this.state.hypererror === 'hyperErrorshow'){
    // } else if (this.props.song.imgUrl === this.state.photo){
    //   let newsong ={song: {photo: this.state.photo, title: this.state.title, genre: this.state.genre, hyperlink: this.state.hyperlink, description: this.state.description}}
    //   this.props.editSong(newsong, this.state.id).then(()=> this.props.closeEditModal()).then(() => this.props.location.reload())
    } else {
    const updatedSong = new FormData();
    if (!(this.state.photo instanceof String)&&this.state.photo !== undefined) {
      updatedSong.append('song[photo]', this.state.photo);
    }
    updatedSong.append('song[title]', this.state.title);
    updatedSong.append('song[genre]', this.state.genre);
    updatedSong.append('song[hyperlink]', this.state.hyperlink);
    updatedSong.append('song[description]', this.state.description);
    updatedSong.append('song[id]', this.state.id)
    // const song = {photo: this.state.photo, id: this.state.id, title: this.state.title, genre: this.state.genre, hyperlink: this.state.hyperlink, description: this.state.description}
    this.props.editSong(updatedSong, this.state.id).then(()=> this.props.closeEditModal())
    }
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
    
    if (field === 'title'){
      return e => {
        if (e.currentTarget.value === '') {
          this.setState({ TitleInput: 'titleInputred', titleError: 'showTitleError', [field]: e.currentTarget.value, submitB: 'saveEdit', noSave: 'nosaveEdit'})
        } else {
          this.setState({ titleError: 'noshowTitleError', [field]: e.currentTarget.value, TitleInput: 'titleInput', submitB: 'saveEdit', noSave: 'nosaveEdit'})
        }
      }
    } else if (field === 'hyperlink'){
      return e => {
        if (e.currentTarget.value === '') {
          this.setState({ hypererror: 'hyperErrorshow', [field]: e.currentTarget.value, submitB: 'saveEdit', noSave: 'nosaveEdit'})
        } else if (this.props.artistSongs.some(ele => ele.hyperlink === e.currentTarget.value)){
          this.setState({ samePerma: 'samePerma', hypererror: 'hyperErrorshow', [field]: e.currentTarget.value, submitB: 'saveEdit', noSave: 'nosaveEdit'})
        }
          else {
          this.setState({ samePerma: 'nosamePerma', hypererror: 'cloneInput', [field]: e.currentTarget.value, submitB: 'saveEdit', noSave: 'nosaveEdit'})
        }
      }
    }
    else if (field === 'genre') {
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
    const { samePerma, hyperlink, titleError, TitleInput, hypererror, customGenre, title, description, genre, submitB, noSave } = this.state
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
                  className={TitleInput}
                  type="text"
                  value={title}
                  onChange={this.update('title')}
                  />
                  <p className={titleError}>Enter a title.</p>
                  </div>
                  
                  <div className='hyperlink'>
                  <p className='clonelink'>clonecloud.com/{this.props.current_user.split(' ').join('-')}/</p>
                  <input
                    type='text'
                    className={hypererror}
                    value={hyperlink}
                    onChange={this.update('hyperlink')}
                  />
                  </div>
                  <p className={samePerma}>This permalink is already in use. Enter another one.</p>

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