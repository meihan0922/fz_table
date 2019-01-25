import React, { Component } from 'react';
import ticketInfo from '../ticketInfo.json';
import PropTypes from 'prop-types';
export default class BackDateForm extends Component {    

    static propTypes = {
        show: PropTypes.number,
    };
    static defaultProps = {
        show: 4,
    };
    
    constructor(props){
        super(props);
        this.state = {
            status:["show1", "show2", "show3", "show4"]
        }
    }
    init(){
        if(Number(this.props.show) && this.props.show<5){
            var classStatus = this.state.status[this.props.show-1];
            return  classStatus;
        }
    }
    render(){
        let data = ticketInfo.data[0].data[0].detail;
        // console.log(this.props)
        // console.log(ticketInfo.data[0].data)
        // const {go,back}=this.props;
        return(
            <div className="back-date-header">
                <div className = "date-text">
                    <div className = "back">回程</div>
                    <div className = "go">去程</div>
                </div>
                <div className="backDateData">
                    <div className="backDataForm">
                        {
                            data.map((info, index)=>{
                                return(
                                    <div className = {"backDate " + this.init()} key={index}>
                                        <span className = "box">
                                            {info.backDate==="01/01(一)" ? <p className="green">2018</p> : ""}
                                            {info.backDate}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}