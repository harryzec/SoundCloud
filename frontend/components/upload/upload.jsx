import React from 'react'
import ReactDOM from "react-dom";

class UploadForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {title: this.props.song.title, track: this.props.song.track, hidden: 'hiddenfornow'}
  }

  handleFile(e) {
    debugger
    e.preventDefault();
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

  update(field){
    return e => this.setState=({[field]: e.currentTarget.value})
  }

  render() {
    let { hidden, title } = this.state
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
        
        <h2 className={hidden}>This is not a valid filetype</h2>
        </>
      )
    } else {
      return(
        <>
        <div className='uploadingForm'>
        <h1 className='basicInfo'>Basic Info</h1>
          <div className='songImg'>
            Here is your image
          </div>
          <form>
            <label className='titleTitle'>Title<strong className='red'>*</strong>
              <input
              className='titleInput'
              type="text"
              value={title}
              onChange={this.update('title')}
              />
              <label>Genre
                <select>
                  <option>None</option>
                  <option>Rock</option>
                  <option>Pop</option>
                  <option>Hip-hop & Rap</option>
                  <option>Country</option>
                </select>
              </label>
              <textarea
              />
            </label>
            <div className='footStuff'>
            <p>*Required fields</p>
            <button>Cancel</button>
            <button>Submit</button>
            </div>
          </form>
          </div>
        </>
      )
    }
    

  }
}

export default UploadForm