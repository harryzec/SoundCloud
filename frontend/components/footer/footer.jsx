import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class footer extends React.Component {
  render() {
    return(
      <>
      <div class='footerLine'>
         {/* <a href='https://www.linkedin.com/in/harry-zec-7157a4a8/' className='Linkedin'>Linkedin</a>
          <a href='https://github.com/harryzec' className='Github'>Github</a> */}
      </div>
      </>
    )
  }
}

export default connect(null, null)(footer)