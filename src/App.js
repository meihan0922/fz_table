import React, { Component } from 'react';
import GoDateForm from './component/GoDateForm';
import BackDateForm from './component/BackDateForm';
import Price from './component/Price';
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
  }
  

  render() {
    const {slide, show} = this.props.count;
    const {speed} = this.props.speed;
    const {whenClick} = this.props.whenClick;
    return (
      <div className="calendar">
        <BackDateForm show={show} speed={speed}/>
        <GoDateForm/>
        <Price slide={slide} show={show} speed={speed} whenClick={whenClick}/>
      </div>
    );
  }
}

export default App;
