import React from 'react'
import ReactDOM from "react-dom";

class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { genre: this.props.song.genre, description: this.props.song.description, title: this.props.song.title, track: this.props.song.track, hidden: 'hiddenfornow', customGenre: 'noshowCustom'}
  }

  // componentDidUpdate() {
  //   if (this.state.genre === 'Custom') {
  //     this.setstate({customGenre: 'showCustom'})
  //   }
  // }

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
    debugger
    e.preventDefault();
    const createdSong = {title: this.state.title, genre: this.state.genre, description: this.state.description, track: this.state.track}
    this.props.createSong(createdSong)
  }

  update(field){
    debugger
    return e => this.setState=({[field]: e.currentTarget.value})
  }

  render() {
    let { hidden, title, customGenre } = this.state
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
                  value={title}
                  onChange={this.update('title')}
                  />
                  </div>
                  <div className='GenreSection'>
                  <label className='genreLabel'>Genre</label>
                    <select onChange={this.update('genre')} className='genreInput'>
                      <option>None</option>
                      <option>Custom</option>
                      <option>Rock</option>
                      <option>Pop</option>
                      <option>Hip-hop & Rap</option>
                      <option>Country</option>
                    </select>
                    <input className={customGenre} type='text'/>
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
        </>
      )
    }
    

  }
}

export default UploadForm