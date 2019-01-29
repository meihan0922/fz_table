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
        this.status = ["show1", "show2", "show3", "show4"];//預設值class
        this.state = { 
            cross:[], //儲存十字顯示的陣列
            active: -1 //是否加上active這個class
        }
    }
    
    init = () => {
        if(Number(this.props.show)>0 && Number(this.props.show)<5){
            var classStatus = this.status[this.props.show-1];
            return  classStatus;
        }
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
        let data = ticketInfo.data[0];
        let right = this.props.rightMove;
        let arrowRight = !!(this.props.displayRight) ? "" : "displayNone";
        let arrowLeft = !!(this.props.displayLeft) ? "" : "displayNone";
        let speed = 'right ' + this.props.speed;

        return(
            <div className="price">
                <div className={`arrowRight ${arrowRight}`} onClick={this.props.onClickRight}>
                    <i className="fas fa-angle-right"></i>
                </div>
                <div className={`arrowLeft ${arrowLeft}`} onClick={this.props.onClickLeft}>
                    <i className="fas fa-angle-left"></i>
                </div>
                <div className="priceForm positionAbsolute" style={{transition: speed + 's' ,right: right + '%'}}>
                    {data.data.map((arr1, index1)=>{
                            return(
                            <div className="priceRow" key={index1}>
                                {arr1.detail.map((arr2, index2)=>{
                                    let id = index1*7+index2;
                                    let cross = (this.state.cross.indexOf(id)===-1) ? "" : "cross";
                                    let active = (String(id)===this.state.active) ? "active" : "";
                                    let pricedata ="priceData " + this.init();
                                    let changeSymbol = (String((arr2.price))==="--" ? <span>查看</span> : '--')

                                    return(
                                        <div className={`${cross} ${pricedata} ${active}`} id={id}
                                            key={id} onClick={this.onClick}>
                                            <span className={arr2.cheapest ? "addSaleClass box" : "box"} >
                                                {Number(arr2.price) ? "$" : ""}
                                                {Number(arr2.price) ? this.toThousands(arr2.price) : changeSymbol}
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
