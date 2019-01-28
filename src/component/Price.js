import React, { Component } from 'react';
import ticketInfo from '../ticketInfo.json';
import PropTypes from 'prop-types';


export default class Price extends Component {

    static propTypes = {
        show: PropTypes.number,
        slide: PropTypes.number,
        speed: PropTypes.number,
        whenClick: PropTypes.func,
    };
    static defaultProps = {
        show: 4,
        slide: 1,
        speed: .3,
        whenClick: function($element) {
            console.log($element);
          }
    };


    constructor(props){
        super(props);
        // this.onClick = this.onClick.bind(this);
        this.state = {
            status: ["show1", "show2", "show3", "show4"],
            rightMove: 0,
            time: 1,
            display: ["none", "block"],
        }
    }
    
    init = () => {
        if(Number(this.props.show)>0 && Number(this.props.show)<5){
            var classStatus = this.state.status[this.props.show-1];
            return  classStatus;
        }
        console.log(this.props.show);
    }

    onClickRight = () => {
        var slideSet = this.props.slide;
        var showSet = this.props.show;
        var right;
        var settiming;
        var showDisplay;
        var clickTimes = Math.floor((7-showSet)/slideSet);
        //clickTimes可以按的次數
        //settiming目前在第幾次
        //right右移多少
        //showDisplay切換display的block和none
        if(this.state.time<=clickTimes){
            settiming = this.state.time+1;
            right = this.state.rightMove + (100/showSet)*slideSet;
            showDisplay = 1;
        }else if(this.state.time>clickTimes){
            settiming = clickTimes + 1;
            right = (100 / showSet) * (7-showSet);
            showDisplay = 1;
        }
        if(settiming>clickTimes){
            showDisplay = 1;
            document.querySelector(".arrowRight").style.display = "none";
        }
        
        document.querySelector(".arrowLeft").style.display = this.state.display[showDisplay];
        document.querySelector(".priceForm").style.right = right + "%";
        document.querySelector(".backDataForm").style.right = right + "%";

        this.setState({
            rightMove : right,
            time :settiming
        })

    }

    onClickLeft = () => {
        // time>=Mathfloor(7/show)
        var slideSet = this.props.slide;
        var showSet = this.props.show;
        var right;
        var settiming;
        var showDisplay;

        if(this.state.time>2){
            showDisplay = 1;
            settiming = this.state.time-1;
            right = this.state.rightMove -(100/showSet)*slideSet;
            document.querySelector(".arrowRight").style.display = "block";
        }else if(this.state.time===2){
            showDisplay = 1;
            right =  0;
            settiming = 1;
        }
        if(settiming===1){
            showDisplay = 0;
        }

        document.querySelector(".arrowLeft").style.display = this.state.display[showDisplay];
        document.querySelector(".priceForm").style.right = right + "%";
        document.querySelector(".backDataForm").style.right = right + "%";

        this.setState({
            rightMove : right,
            time :settiming
        })
    }

    toThousands = (num) => {  
        var result = [ ], 
            counter = 0;  
        num = (num || 0).toString().split('');  
        for (var a = num.length - 1; a >= 0; a--) {  
            counter++;  
            result.unshift(num[a]);  
            if (!(counter % 3) && a !== 0) { result.unshift(','); }  
        }  
        return result.join('');  
    }


    onClick = (e) => {
        var boxAll = document.querySelectorAll(".priceData");
        var currentClick = e.target;
        var dataId = currentClick.getAttribute("id");
        var dataIdRow = Math.floor(dataId/7);
        var dataIdCol = dataId % 7 ;
        var row = [];
        var col = [];
        
        this.props.whenClick(e.target);

        for(var i=0; i<boxAll.length; i++){
            boxAll[i].classList.remove("cross");
            boxAll[i].classList.remove("active");
        }

        for(var x = 0; x < 7; x++){
            row.push(dataIdRow*7 + x );
            col.push(7*x + dataIdCol );
        }
    
        row.map((item) => 
            document.getElementById(item).classList.add("cross")
        )

        col.map((item)=>
            document.getElementById(item).classList.add("cross")
        )
       
        currentClick.classList.add('active');
    }
    componentDidMount = () => {
        var speed = this.props.speed;
        // console.log(speed);
        var priceForm = document.querySelector(".priceForm");
        var backDataForm = document.querySelector(".backDataForm");
        var arrowLeft = document.querySelector(".arrowLeft");
        var arrowRight = document.querySelector(".arrowRight");
        var priceFormFunc = function(){
            priceForm.style.transition = ("right " + speed + "s");
        }
        var backDataFormFunc = function(){
            backDataForm.style.transition = ("right " + speed + "s");
        }

        priceFormFunc();
        backDataFormFunc();

        window.addEventListener("resize",function(){
            var width = document.documentElement.clientWidth;
            if(width>765){
                priceForm.style.right = 0;
                priceForm.style.transition =  ("right " + 0 + "s");
                backDataForm.style.transition = ("right " + 0 + "s");
                backDataForm.style.right = 0;
                arrowLeft.style.display = "none";
                arrowRight.style.display = "none";
            }else{
                priceFormFunc();
                backDataFormFunc();
                arrowLeft.style.display = "none";
                arrowRight.style.display = "block";
            }
    })
    }
    render(){
        console.log(this.props.slide);
        let data = ticketInfo.data[0];
        return(
            <div className="price">
                <div className="arrowRight displayBlock" onClick={this.onClickRight}>
                    <i className="fas fa-angle-right"></i>
                </div>
                <div className={this.state.time===1 ? "displayNone arrowLeft" : "arrowLeft displayBlock"} onClick={this.onClickLeft}>
                    <i className="fas fa-angle-left"></i>
                </div>
                <div className="priceForm">
                    {data.data.map((arr1, index1)=>{
                            // console.log(arr1);
                            return(
                            <div className="priceRow" key={index1}>
                                {arr1.detail.map((arr2, index2)=>{
                                    // console.log(arr2.price)
                                    return(
                                        <div className={"priceData " + this.init()} id={index1*7+index2}
                                            key={index1*7+index2} onClick={this.onClick}>
                                            <span className={arr2.cheapest ? "addSaleClass box" : "box"} >
                                                    {Number(arr2.price) ? "$" : ""}{this.toThousands(arr2.price)}
                                                    {Number(arr2.price) ? <span>起</span> : ""}     
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            )
                        })}
                </div>  
            </div>
        )
    }
}