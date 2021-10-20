import React, {Component} from 'react';
import './static/card.css'
import {Image} from "antd";

class Card extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="card-style"
                style={{height: "240px", width: "400px"}}>
                <div style={{height: "120px"}}>
                    <Image preview={false}  height="120px"
                        alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                </div>
                <div style={{height: "100px", padding: "20px"}}>
                    <p children={this.props.firstName + " " + this.props.lastName}/>
                    <p>De</p>
                </div>
            </div>
        );
    }
}

export default Card;