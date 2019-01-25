import React, { Component } from 'react';
import GoDateForm from './component/GoDateForm';
import BackDateForm from './component/BackDateForm';
import Price from './component/Price';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.frzTable = {
      count: {
        slide: 1,
        show : 2
    },
      speed: 0.5,
      whenClick: function($element) {
        console.log($element);
      }
    }
  }
  

  render() {
    const {slide, show} = this.frzTable.count;
    const {speed} = this.frzTable.speed;
    return (
      <div className="calendar">
        <BackDateForm show={show}/>
        <GoDateForm/>
        <Price slide={slide} show={show} speed={speed} whenClick={this.frzTable.whenClick}/>
      </div>
    );
  }
}

export default App;
