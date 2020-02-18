import React from 'react'
import ReactDOM from "react-dom";

class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.update = this.update.bind(this)
    this.state = { hyperlink: 'samplelink', user_id: this.props.song.user_id, genre: this.props.song.genre, description: this.props.song.description, title: this.props.song.title, track: this.props.song.track, hidden: 'hiddenfornow', customGenre: 'noshowCustom'}
  }

  handleFile(e) {
    e.preventDefault();
    debugger
    const filetypes = ['WAV', 'FLAC', 'AIFF', 'ALAC', 'MP3', 'AAC', 'OGG', 'VORBIS', 'MP4', 'MP2', 'M4A', '3GP', '3G2', 'MJ2', 'AMR', 'WMA'] 
    let filebroken = e.currentTarget.files[0].name.split('.')
    let extension = filebroken[filebroken.length-1]
    if (filetypes.includes(extension.toUpperCase())){
      const file = e.currentTarget.files[0]
      this.setState({track: file, title: file.name.split('.')[0].split(' ').slice(1, file.name.split('.')[0].split(' ').length).join(' ')})
    } else {
      this.setState({hidden: 'showme'})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    debugger
    const createdSong = new FormData();
    createdSong.append('song[title]', this.state.title);
    createdSong.append('song[genre]', this.state.genre);
    createdSong.append('song[description]', this.state.description);
    createdSong.append('song[track]', this.state.track);
    createdSong.append('song[user_id]', this.state.user_id);
    createdSong.append('song[hyperlink]', this.state.hyperlink);
    debugger
    this.props.createSong(createdSong)
    this.setState({user_id: this.props.song.user_id, genre: this.props.song.genre, description: this.props.song.description, title: this.props.song.title, track: this.props.song.track})
  }



  update(field){

    if (field === 'genre') {
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
    const { hidden, title, customGenre } = this.state
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
          <div className='uploadingMarg'>
            <div className='uploadOptions'>
              <h1 className='basicInfo'>Basic Info</h1>
              <h1 className='Metadata'>Metadata</h1>
              <h1 className='Permissions'>Permissions</h1>
            </div>
            <div className='songImg'>
                Here is your image
            </div>
              <form className='almostthere'>
                <div className='titleSection'>
                <label className='titleTitle'>Title<strong className='red'>*</strong></label>
                  <input
                  className='titleInput'
                  type="text"
                  value={this.state.title}
                  onChange={this.update('title')}
                  />
                  </div>
                  
                  <p>clonecloud.com/{this.props.username.split(' ').join('-')}/</p>
                  <input
                    type='text'
                    value={title.split(' ').join('-')}
                    onChange={this.update('hyperlink')}
                  />

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
            <div className='footStuff'>
              <p className='requireField'><strong className='orange'>*</strong> Required fields</p>
              <div className='uploadButtons'>
              <button className='CancelUpload'>Cancel</button>
              <button className='saveUpload' onClick={this.handleSubmit}>Submit</button>
              </div>
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