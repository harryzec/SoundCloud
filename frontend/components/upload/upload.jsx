import React from 'react'
import ReactDOM from "react-dom";

class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handlePhoto = this.handlePhoto.bind(this)
    this.state = { titleError: 'noshowTitleError', photo: null, hyperlink: null, user_id: this.props.song.user_id, genre: this.props.song.genre, description: this.props.song.description, title: this.props.song.title, track: this.props.song.track, hidden: 'hiddenfornow', 
                  customGenre: 'noshowCustom',
                  TitleInput: 'titleInput',
                  hypererror: 'cloneInput',
                  samePerma: 'nosamePerma'}
  }

  componentDidMount(){
    this.props.fetchSongsByArtist(this.props.username)
  }

  handleCancel(e){
    e.preventDefault();
    this.setState({track: null, photo:null})
  }

  handleFile(e) {
    e.preventDefault();
    debugger
    const filetypes = ['WAV', 'FLAC', 'AIFF', 'ALAC', 'MP3', 'AAC', 'OGG', 'VORBIS', 'MP4', 'MP2', 'M4A', '3GP', '3G2', 'MJ2', 'AMR', 'WMA'] 
    let filebroken = e.currentTarget.files[0].name.split('.')
    let extension = filebroken[filebroken.length-1]
    if (filetypes.includes(extension.toUpperCase())){
      const file = e.currentTarget.files[0]
      this.setState({track: file, hyperlink: file.name.split('.')[0].split(' ').slice(1, file.name.split('.')[0].split(' ').length).join('-'), title: file.name.split('.')[0].split(' ').slice(1, file.name.split('.')[0].split(' ').length).join(' ')})
    } else {
      this.setState({hidden: 'showme'})
    }
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

  handleSubmit(e) {
    e.preventDefault();
    debugger

    if (this.state.samePerma === 'samePerma',this.state.TitleInput === 'titleInputred' || this.state.titleError === 'showTitleError' || this.state.hypererror === 'hyperErrorshow'){
    } else {
    debugger
    const createdSong = new FormData();
    createdSong.append('song[title]', this.state.title);
    createdSong.append('song[genre]', this.state.genre);
    createdSong.append('song[description]', this.state.description);
    createdSong.append('song[track]', this.state.track);
    createdSong.append('song[user_id]', this.state.user_id);
    createdSong.append('song[hyperlink]', this.state.hyperlink);
    createdSong.append('song[photo]', this.state.photo);
    // debugger
    this.props.createSong(createdSong)
    this.setState({user_id: this.props.song.user_id, genre: this.props.song.genre, description: this.props.song.description, title: this.props.song.title, track: this.props.song.track})
    }
  }



  update(field){
    debugger
    if (field === 'title'){
      return e => {
        if (e.currentTarget.value === '') {
          this.setState({ TitleInput: 'titleInputred', titleError: 'showTitleError', [field]: e.currentTarget.value})
        } else {
          this.setState({ titleError: 'noshowTitleError', [field]: e.currentTarget.value, TitleInput: 'titleInput'})
        }
      }
    } else if (field === 'hyperlink'){
      return e => {
        if (e.currentTarget.value === '') {
          this.setState({ hypererror: 'hyperErrorshow', [field]: e.currentTarget.value})
        } else if (this.props.artistSongs.some(ele => ele.hyperlink === e.currentTarget.value)){
          this.setState({ samePerma: 'samePerma', hypererror: 'hyperErrorshow', [field]: e.currentTarget.value})
        }
          else {
          this.setState({ samePerma: 'nosamePerma', hypererror: 'cloneInput', [field]: e.currentTarget.value})
        }
      }
    }
    else if (field === 'genre') {
      return e => {
        if (e.currentTarget.value === 'Custom') {
          this.setState({customGenre: 'showCustom', [field]: e.currentTarget.value})
        } else {
          this.setState({customGenre: 'noshowCustom', [field]: e.currentTarget.value})
        }
      }
    } else {
      return e => this.setState({[field]: e.currentTarget.value})
    }
  }

  updateGenre(field) {
    return e => this.setState({[field]: e.currentTarget.value})
  }

  render() {
    const { hidden, samePerma, title, customGenre, photo, hyperlink, titleError, TitleInput, hypererror } = this.state
    const link = Object.assign({}, {hyper: title})
    if (this.state.track === null) {
      return (
        <>

          <div className='uploadSong' onDrop={this.handleFile.bind(this)}>
            <input 
            id='selectedFile'
            type='file'
            onChange={this.handleFile.bind(this)}
            />
            <h2 className='drag'>Drag and drop your tracks & albums here</h2>
            <button className='UploadButton' onClick={()=>document.getElementById('selectedFile').click()}>
             or choose files to upload
            </button>
            <p className='subNotes'>Provide FLAC, WAV, ALAC, or AIFF for highest audio quality. <strong className='blue'>Learn more about lossless HD.</strong></p>
          </div>
        <div className={hidden}>
          <div className='errorpic'>
            <div className='errorBord'>
            &#33; 
            </div> 
          </div>
          <h2 className='errorMessage'>1 of your files is not supported. <strong className='blueE'>Read about our supported file types.</strong></h2>
        </div>


        {this.props.newSong.title}
        </>
      )
    } else {
      return(
        <>
        <div className='uploadingForm'>
            <div className='uploadContent'>
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
                  value={this.state.title}
                  onChange={this.update('title')}
                  />
                  <p className={titleError}>Enter a title.</p>
                  </div>
                  
                  <div className='hyperlink'>
                  <p className='clonelink'>clonecloud.com/{this.props.username.split(' ').join('-')}/</p>
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
                    <select onChange={this.update('genre')} className='genreInput'>
                      <option>None</option>
                      <option>Custom</option>
                      <option>Rock</option>
                      <option>Pop</option>
                      <option>Hip-hop & Rap</option>
                      <option>Country</option>
                    </select>
                    <input className={customGenre} type='text' onChange={this.updateGenre('genre')}/>
                  </div >
                  
                  <div className='DescriptionUpload'>
                    <label className='descriptionLabel'>Description</label>
                    <textarea onChange={this.update('description')} className='descriptionArea' placeholder='Describe your track'/>
                  </div>

              </form>
              </div>
          </div>
            <div className='footStuffU'>
              <p className='requireField'><strong className='orange'>*</strong> Required fields</p>
              <div className='uploadButtons'>
              <button className='CancelUpload' onClick={this.handleCancel}>Cancel</button>
              <button className='saveUploadUp' onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          
          <br>
          </br>
          <br>
          </br>
          <br></br>
        </>
      )
    }
    

  }
}

export default UploadForm