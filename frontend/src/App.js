import './App.css';

import React, { Component } from 'react'

export class App extends Component {

  constructor(props){
    super(props);
    this.state={
      input : "",
      data : []
    }
  }

  async componentDidUpdate(){
    let res = await this.getapi("http://localhost:8000");
    console.log(res);
    // this.setState({ data: res });
  }

  change = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submit = (e) =>{
    e.preventDefault();
    console.log(this.state.input);
    fetch("http://localhost:8000/new", {
      method: "POST",
      headers: {"Content-Type": "text/plain"},
      body: this.state.input
    })
    .then( (response) => response.json())
    .then( (responseJson) => { console.log("Success") })
    .catch( (err) => { console.log(err) })
  }

  getapi = async(url) =>{
    return fetch(url)
          .then( ( response ) => response.json() )
          .then( ( responseJson ) => { return responseJson } )
          .catch( (err) => {
            console.log(err);
            alert("Something went wrong.");
          } );
  }

  // otherApi = async(e) =>{
  //   return 
  // }

  render() {
    console.log(this.state.data)
    let p;
    p = this.state.data.map(item => {
      return(
      <div key={item}>{item}</div>
      )
    })

    return (
      
      <div>
        <div className="main">
          <h1>
            To-do list App
          </h1>
          <br></br>
          <br></br>
          <form onSubmit={this.submit}>
            <input type="text" name="input" onChange={this.change} placeholder="Type some activity to add" required />
            <br></br>
            <br></br>
            <input type="submit"/>
          </form>
          <br></br>
          <br></br>
          
          {p}
        
        </div>
      </div>
    
    )
  }
}

export default App
