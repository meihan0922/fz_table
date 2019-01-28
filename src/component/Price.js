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
            rightMove: 0, //移動%數
            time: 1, //儲存左右點擊次數
            displayRight: 1, //箭頭右 0:displayNone, 1:displayBlock
            displayLeft: 0, //箭頭左 0:displayNone, 1:displayBlock
            cross:[], //儲存十字顯示的陣列
            active: -1 //是否加上active這個class
        }
    }
    
    init = () => {
        if(Number(this.props.show)>0 && Number(this.props.show)<5){
            var classStatus = this.state.status[this.props.show-1];
            return  classStatus;
        }
        // console.log(this.props.show);
    }

    onClickRight = () => {
        var slideSet = this.props.slide;
        var showSet = this.props.show;
        var right;
        var settiming = this.state.time-1;
        var showDisplayR;
        // var showDisplayL;
        var clickTimes = Math.floor((7-showSet)/slideSet);
        //clickTimes可以按的次數
        //settiming目前在第幾次
        //right右移多少
        //showDisplay切換display的block和none
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

        document.querySelector(".priceForm").style.right = right + "%";
        document.querySelector(".backDataForm").style.right = right + "%";

        this.setState({
            displayRight : showDisplayR,
            displayLeft : 1,
            rightMove : right,
            time :settiming
        })

    }

    onClickLeft = () => {
        // time>=Mathfloor(7/show)
        var slideSet = this.props.slide;
        var showSet = this.props.show;
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
        document.querySelector(".priceForm").style.right = right + "%";
        document.querySelector(".backDataForm").style.right = right + "%";

        this.setState({
            displayLeft : showDisplayL,
            displayRight : 1,
            rightMove : right,
            time :settiming
        })
    }

    //數字三位數加逗號
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
        // var boxAll = document.querySelectorAll(".priceData");
        var currentClick = e.target;
        var dataId = currentClick.getAttribute("id");
        var dataIdRow = Math.floor(dataId/7);
        var dataIdCol = dataId % 7 ;
        var row = [];
        var col = [];
        var choose = [];
        this.props.whenClick(e.target);

        //找直行橫列的id值
        for(var x = 0; x < 7; x++){
            row.push(dataIdRow*7 + x );
            col.push(7*x + dataIdCol );
        }

        //合併兩個陣列
        choose = [...row, ...col];
      
        this.setState({
            cross : choose,
            active : dataId
        })
    }
    
    render(){
        // console.log(this.props.slide);
        let data = ticketInfo.data[0];
        let arrowRight = !!(this.state.displayRight) ? "displayBlock" : "displayNone";
        let arrowLeft = !!(this.state.displayLeft) ? "displayBlock" : "displayNone";
        let speed = this.props.speed;
        return(
            <div className="price">
                <div className={`arrowRight ${arrowRight}`} onClick={this.onClickRight}>
                    <i className="fas fa-angle-right"></i>
                </div>
                <div className={`arrowLeft ${arrowLeft}`} onClick={this.onClickLeft}>
                    <i className="fas fa-angle-left"></i>
                </div>
                <div className="priceForm positionAbsolute" style={{transition: speed + 's'}}>
                    {data.data.map((arr1, index1)=>{
                            return(
                            <div className="priceRow" key={index1}>
                                {arr1.detail.map((arr2, index2)=>{
                                    let id = index1*7+index2;
                                    let cross = (this.state.cross.indexOf(id)===-1) ? "" : "cross";
                                    let active = (String(id)===this.state.active) ? "active" : "";
                                    console.log(active);
                                    let pricedata ="priceData " + this.init();
                                    // let active = 
                                    return(
                                        <div className={`${cross} ${pricedata} ${active}`} id={id}
                                            key={id} onClick={this.onClick}>
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
