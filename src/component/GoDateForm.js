import React, { Component } from 'react';
import ticketInfo from '../ticketInfo.json';

export default class GoDateForm extends Component {
    render(){
        let data = ticketInfo.data[0].data;
        return(
            <div className="go-date-header">
                {
                    data.map((info, index)=>{
                        return(
                            <div className = "goDate" key={index}>
                                <span className = "box">
                                    {info.goDate==="01/01(一)" ? <p className="green">2018</p> : ""}
                                    {info.goDate}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}