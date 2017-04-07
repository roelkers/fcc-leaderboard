import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Leaderboard extends React.Component {
  constructor(props){
    super(props);
    console.log("hi");
  }
  render(){
    let items =[];

    let campers = (this.props.displayed==="recent") ?
    this.props.topCampersRecent :
    this.props.topCampersAllTime;
    items = campers.map(
      (camper,i)=>{
        return(
          <div className="row" key={i}>
          <span className="itemNumber cell">{i}</span>
          <span className="userName cell"><img src={camper.img} />{camper.username}</span>
          <span className="pointsRecent cell">{camper.recent}</span>
          <span className="pointsAllTime cell">{camper.alltime}</span>
          </div>)
        }
      );
      return(
        <div>
        <div className="leaderboard">
        <div className="row">
        <span className="itemNumber headcell">#</span>
        <span className="userName headcell">Camper</span>
        <span onClick={this.props.onClickRecent} className="pointsRecent headcell">This Month <i className="fa fa-sort" aria-hidden="true"></i></span>
        <span onClick={this.props.onClickAllTime} className="pointsAllTime headcell">All Time <i className="fa fa-sort" aria-hidden="true"></i></span>
        </div>
        {items}
        </div>
        </div>);
      }
    }

    class App extends React.Component {
      constructor(props){
        super(props);
        this.state={
          topCampersRecent : [],
          topCampersAllTime : [],
          displayed : "recent"
        };
        this.handleClickRecent = this.handleClickRecent.bind(this);
        this.handleClickAllTime = this.handleClickAllTime.bind(this);
      }
      componentDidMount(){
        fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
        .then((response)=>response.json())
        .then((json)=>{
          this.setState({
            topCampersRecent : json
          })
        })
        .catch((e)=>console.log(e));
        fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
        .then((response)=>response.json())
        .then((json)=>{
          this.setState({
            topCampersAllTime : json
          })
        })
        .catch((e)=>console.log(e));

      }
      handleClickRecent(){
        this.setState({
          displayed: "recent"
        });
      }
      handleClickAllTime(){
        this.setState({
          displayed: "alltime"
        });
      }
      render(){
        return(
          <div className="container">
          <h1 style={{fontFamily:"Ubuntu"}}>Camper Leaderboard</h1>
          <Leaderboard
          topCampersRecent={this.state.topCampersRecent}
          topCampersAllTime={this.state.topCampersAllTime}
          displayed={this.state.displayed}
          onClickRecent={this.handleClickRecent}
          onClickAllTime={this.handleClickAllTime}
          />
          <span><p>made by roelkers</p></span>
          </div>);
        }
      }

export default App;
