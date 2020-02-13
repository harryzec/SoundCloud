import React from 'react';

class Discover extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    debugger
    e.preventDefault();
    this.props.logout().then(()=> this.props.history.push('/'))
  }
  render() {
    return(
      <>
      <h1>sup boi</h1>
        <form onSubmit={this.handleSubmit}>
        <button className="header-button">Log Out</button>
        </form>
      
      </>
    )
  }
}

export default Discover;