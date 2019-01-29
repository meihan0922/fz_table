import React, { Component } from 'react';
import GoDateForm from './component/GoDateForm';
import BackDateForm from './component/BackDateForm';
import Price from './component/Price';
import './App.scss';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      rightMove: 0, //移動%數
      time: 1, //儲存左右點擊次數
      displayRight: 1, //箭頭右 0:displayNone, 1:displayBlock
      displayLeft: 0, //箭頭左 0:displayNone, 1:displayBlock
  }
  }
  
  onClickRight = () => {
    var slideSet = this.props.count.slide;
    var showSet = this.props.count.show;
    var right;
    var settiming = this.state.time-1;
    var showDisplayR;
    var clickTimes = Math.floor((7-showSet)/slideSet);
    
    if(this.state.time<=clickTimes){
      settiming = this.state.time+1;
      right = this.state.rightMove + (100/showSet)*slideSet;
      showDisplayR = 1;
    }else if(this.state.time>clickTimes){
      settiming = clickTimes + 1;
      right = (100 / showSet) * (7-showSet);
      showDisplayR = 1;
    }
    if(this.state.time===clickTimes){
        showDisplayR = 0;
    }
    
    this.setState({
      displayRight : showDisplayR,
      displayLeft : 1,
      rightMove : right,
      time :settiming
  })
  }

  onClickLeft = () => {
    var slideSet = this.props.count.slide;
    var showSet = this.props.count.show;
    var right;
    var settiming = this.state.time-1;
    var showDisplayL;
    
    if(this.state.time>2){
        showDisplayL = 1;
        settiming = this.state.time-1;
        right = this.state.rightMove -(100/showSet)*slideSet;
    }else if(this.state.time===2){
        showDisplayL = 1;
        right =  0;
        settiming = 1;
    }
    if(settiming===1){
        showDisplayL = 0;
    }
    this.setState({
        displayLeft : showDisplayL,
        displayRight : 1,
        rightMove : right,
        time :settiming
    })
  }

  render() {
    const {slide, show} = this.props.count;
    const {speed} = this.props.speed;
    const {whenClick} = this.props.whenClick;
    
    return (
      <div className="calendar">
        <BackDateForm show={show} speed={speed} {...this.state}/>
        <GoDateForm/>
        <Price slide={slide} show={show} speed={speed} whenClick={whenClick} 
        onClickRight={this.onClickRight}
        onClickLeft={this.onClickLeft}
         {...this.state}/>
      </div>
    );
  }
}

export default App;
