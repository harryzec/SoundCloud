import React from 'react'
import { withRouter } from "react-router";

class EditPlaylistForm extends React.Component {
  constructor(props){
    super(props)
    this.handlePhoto = this.handlePhoto.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDeleteTrack = this.handleDeleteTrack.bind(this)
    this.state = { title: this.props.playlist.title, genre: this.props.playlist.genre, 
      hyperlink: this.props.playlist.permalink, form: 'basic',
      id: this.props.playlist.id,
      description: this.props.playlist.description || '',
      customGenre: 'noshowCustom',
      imageUrl: this.props.playlist.imageUrl,
      submitB: 'nosaveEdit',
      noSave: 'noSave',
      photo: this.props.playlist.imgUrl,
      customGenre: 'noshowCustom',
      TitleInput: 'titleInput',
      hypererror: 'cloneInput',
      samePerma: 'nosamePerma',
      titleError: 'noshowTitleError',
      tracks: this.props.playlist.tracks,
      deleteTracks: []}
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
    
      
    if (this.state.deleteTracks.length > 0) {
      this.state.deleteTracks.forEach(track => {
        const newPlaylistTrack = new FormData();
        newPlaylistTrack.append('PlaylistTrack[track_id]', track[0])
        newPlaylistTrack.append('PlaylistTrack[playlist_id]', track[1])
        this.props.deletePlaylistTrack(newPlaylistTrack)
      })
    }


    const updatedSong = new FormData();
    if (!(this.state.photo instanceof String)&& this.state.photo !== undefined) {
      updatedSong.append('playlist[photo]', this.state.photo);
    }
    updatedSong.append('playlist[title]', this.state.title);
    updatedSong.append('playlist[genre]', this.state.genre);
    updatedSong.append('playlist[permalink]', this.state.hyperlink);
    updatedSong.append('playlist[description]', this.state.description);
    updatedSong.append('playlist[id]', this.state.id)
    // const song = {photo: this.state.photo, id: this.state.id, title: this.state.title, genre: this.state.genre, hyperlink: this.state.hyperlink, description: this.state.description}
    this.props.updatePlaylist(updatedSong, this.state.id)
    this.props.fetchPlaylistByArtist(this.props.match.params.username)
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
        } else if (this.props.currentUser.playlists.some(ele => ele.permalink === e.currentTarget.value)){
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

  handleDeleteTrack(e, track_id, playlist_id, i) {
    e.preventDefault()

    let deletepart = this.state.deleteTracks;
    let newDelete = deletepart.concat([[track_id, playlist_id]])
    

    let part1 = this.state.tracks.slice(0, i)
    if (part1 === undefined) {
      part1 = []
    }
    let part2 = this.state.tracks.slice(i+1)
    if (part2 === undefined) {
      part2 = []
    }
    let newTracks = part1.concat(part2)

    this.setState({tracks: newTracks, deleteTracks: newDelete, submitB: 'saveEdit', noSave: 'nosaveEdit'})
  }

  
  render() {
    const { samePerma, hyperlink, titleError, TitleInput, hypererror, customGenre, title, description, genre, submitB, noSave } = this.state
    
    let tracklist = this.state.tracks.map((track, index) => {

      return(
        <>
          <div className='trackdelete'>
            <div className='picandtitle'>
              <div className='playtrackpic'></div>
              <p className='trktit'>{track.title}</p>
            </div>

            <div className='playtrackfacts'>
              <div onClick={(e) => this.handleDeleteTrack(e, track.id, this.props.playlist.id, index) } className='deletetrack'><p className='xout'>X</p></div>
            </div>

          </div>
        </>
      )
    })
    
    if (this.state.form === 'basic') {
    
      return(
        <>
            <div className='uploadingMarg'>
              <div className='uploadOptions'>
                <h1 className='basicInfo'>Basic Info</h1>
                <h1 className='Metadata' onClick={() =>this.setState({form: 'tracks'})}>Tracks</h1>
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
                      defaultValue={hyperlink}
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
                <button className='CancelUpload' onClick={()=>this.props.closeEditPlaylistModal()}>Cancel</button>
                <button className={noSave}>Save Changes</button>
                <button className={submitB} onClick={this.handleEdit}>Save Changes</button>
                </div>
              </div>
        </>
      )
  } else {
    return(
    <>
    <div className='uploadingMarg'>
      <div className='uploadOptions'>
          <h1 className='Metadata' onClick={() =>this.setState({form: 'basic'})}>Basic Info</h1>
          <h1 className='basicInfo'>Tracks</h1>
      </div>
      {tracklist}

      <div className='footEdit2'>
                <p className='requireField2'><strong className='orange'>*</strong> Required fields</p>
                <div className='uploadButtons2'>
                <button className='CancelUpload' onClick={()=>this.props.closeEditPlaylistModal()}>Cancel</button>
                <button className={noSave}>Save Changes</button>
                <button className={submitB} onClick={this.handleEdit}>Save Changes</button>
                </div>
              </div>
    </div>

    
    </>
    )
  }
  }
}

export default withRouter(EditPlaylistForm)