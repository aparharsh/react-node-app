import './App.css';
import axios from 'axios';
import React, { Component } from 'react';

export class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      input : "",
      data : []
    }
  }
  
  getapi = async(url) =>{
    return fetch(url)
          .then( ( response ) => response.json() )
          .then( ( responseJson ) => { return responseJson } )
          .catch( (err) => {
            console.log(err);
            alert("Something went wrong in retrieving data.");
          } );
  }

  async componentDidMount(){

    let error = true;
    let res = await axios.get("http://localhost:8000/items").then(function (response){
      error = false;
      return response.data;
    }).catch(function (error) {
      console.log(error);
      alert("Some error occured.")
    });

    if( !error ) this.setState({ data: res });

  }

  async componentDidUpdate(){

    let error = true;
    let res = await axios.get("http://localhost:8000/items").then(function (response){
      error = false;
      return response.data;
    }).catch(function (error) {
      console.log(error);
      alert("Some error occured.")
    });

    if( !error ) this.setState({ data: res });
    
  }

  change = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  submit = async (e) =>{
    e.preventDefault();

    console.log(this.state.input);

    let error = true;
    await axios.post("http://localhost:8000/itemsPost", {
      'name' : this.state.input
    }).then(function (response){
      console.log("Success");
      error = false;
    }).catch(function (error) {
      console.log(error);
      alert("Some error occured in sending data.")
    });

    console.log(error)
    if( !error ) this.setState( { input:"" } )
  }
  
  delete = async (e) =>{
    console.log(e);

    await axios.delete("http://localhost:8000/items/"+e.target.id, {
      'name' : this.state.input
    }).then(function (response){
      console.log("Success");
    }).catch(function (error) {
      console.log(error);
      alert("Some error occured in sending data.")
    });
  }

  render() {
    let p;
    p = this.state.data.map(item => {
      return(
      <div className="item" key={item._id} >{item.name} <button className="deleteBtn" id={item._id} onClick={this.delete}>Delete</button></div>
      )
    })

    return (
      
      <div>
        <div className="main">
          <h1>
            Tanya's To-do list App
          </h1>
          <br></br>
          <br></br>
          <form onSubmit={this.submit}>
            <input type="text" name="input" onChange={this.change} value={this.state.input} placeholder="Type some activity to add" required />
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