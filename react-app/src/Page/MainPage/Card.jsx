import React, {Component} from 'react';
import './static/card.css'
import {Image} from "antd";

class Card extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="card-style"
                style={{height: "400px", width: "240px"}}>
                <div style={{height: "300px"}}>
                    <Image preview={false}  height="300px"
                        alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                </div>
                <div style={{height: "100px", padding: "20px"}}>
                    <p children={this.props.firstName + " " + this.props.lastName} style={{}}/>
                    <p>De</p>
                </div>
            </div>
        );
    }
}

export default Card;