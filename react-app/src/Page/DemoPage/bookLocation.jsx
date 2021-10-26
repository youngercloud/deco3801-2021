import React, {Component} from "react";
import "./static/bookLocation.css";
import {Button, Card, Col, Input, Popover, Row, Select} from 'antd';
import {InfoCircleOutlined, SearchOutlined} from '@ant-design/icons';
import axios from "axios";
import MapboxGl from "mapbox-gl/dist/mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const distanceOptions = [
    {value: '0,1', label: '1km'},
    {value: '1,3', label: '1km-3km'},
    {value: '3,9999', label: 'more than 3Km'},
];

const languageOptions = [
    {value: 'English', label: 'English'},
    {value: 'Chinese', label: 'Chinese'},
    {value: 'Japanese', label: 'Japanese'},
];

const {Meta} = Card;

export default class bookLocation extends Component {
    info;
    state = {
        input: '',
        distanceMin: '0',
        distanceMax: '99999',
        language: '',
        distanceSelect: undefined,
        getInfo: 'false',
        CurrentDisX: 0,
        CurrentDisY: 0,
    }

    //get the position information of input postcode
    handleGetInputValue = (event) => {
        this.setState({
            "input": event.target.value,
        })
        //demo
        MapboxGl.accessToken =
            'pk.eyJ1IjoiZGFya3R0dDA1MTMiLCJhIjoiY2t1eG94cTR0MjdvdzJ1cTljOTlzM2gweCJ9.1sTUwqyhLz_qTgrk3tkGgg';
        const geocoder = new MapboxGeocoder({
            accessToken: MapboxGl.accessToken,
            // types: 'place,postcode,locality,neighborhood'
            types: 'country,region,place,postcode,locality,neighborhood'
        });
        geocoder.addTo('#geocoder');
        geocoder.query("Australia " + event.target.value);
        geocoder.on('result', (e) => {
            const x = e.result.bbox[0];
            const y = e.result.bbox[1];
            this.setState({
                CurrentDisX: e.result.bbox[1],
                CurrentDisY: e.result.bbox[0],
            })
            console.log("SATE:", this.state)
        });
    };

    ////fix page to top when enter
    handleDistanceValue = distanceSelect => {
        this.setState({
            distanceMin: distanceSelect.replace(",", "")[0],
        })
        if (distanceSelect.replace(",", "")[1] !== "9") {
            this.setState({
                distanceMax: distanceSelect.replace(",", "")[1],
            })
        }
    };

    //get language selected
    handleLanguageValue = languageSelect => {
        this.setState({
            language: languageSelect,
        })

    };

    //send information to demo component
    gpSelected(info) {
        this.props.gpSelected(info, "GpSelected")
    }

    //send response to end-back
    submit = (e) => {
        let api;
        api = "/api/booking/searchGp"
        axios.post(api, e).then((response) => {

            const json = response.data;
            const arr = [];

            let arr2 = [];
            Object.keys(json).forEach(function (key) {
                arr.push(json[key]);
            });

            arr2 = arr[0];
            this.info = arr2.map((d) =>
                <Col span={10}>
                    <Card>
                        <div>
                            <img alt="example" style={{width: "55%", height: "200px"}}
                                 src={require('../../Images/' + d.Images.Path).default}/>
                        </div>

                        <div>
                            <h1>{d.Gp.GpName}</h1>
                            <h3>Distance: {d.Distance}KM</h3>
                            <h3>Language:</h3>
                            <Row>
                                {d.Language.map(item => (
                                    <Col><p>{item} &nbsp;</p></Col>
                                ))}
                            </Row>

                            <Button onClick={() => {
                                this.gpSelected(d)
                            }}><p>$65 - Consultation</p></Button>
                        </div>
                    </Card>
                </Col>
            );
            this.setState({getInfo: 'true'});
        }).catch(function (error) {
            console.log(error);
        });
    };

    //fix page to top when enter and get all gp inforamtion from back-end
    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, 0);
        }

        let api;
        api = "/api/booking/searchGp"
        axios.post(api, this.state).then((response) => {

            const json = response.data;
            const arr = [];

            let arr2 = [];
            Object.keys(json).forEach(function (key) {
                arr.push(json[key]);
            });

            arr2 = arr[0];
            this.info = arr2.map((d) =>
                <Col span={10}>
                    <Card>
                        <div>
                            <img alt="example" style={{width: "55%", height: "200px"}}
                                 src={require('../../Images/' + d.Images.Path).default}/>
                        </div>

                        <div>
                            <h1>{d.Gp.GpName}</h1>
                            <h3>Distance: {d.Distance}KM</h3>
                            <h3>Language:</h3>
                            <Row>
                                {
                                    d.Language.map(item => (
                                            <Col><p>{item} &nbsp;</p></Col>
                                        )
                                    )
                                }
                            </Row>

                            <Button onClick={() => {
                                this.gpSelected(d)
                            }}><p>$65 - Consultation</p></Button>
                        </div>
                    </Card>
                </Col>
            );
            this.forceUpdate()
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="location">

                <div className="inputData">
                    <Input.Group compact>
                        <Popover placement="top"  content={"Your location information is used"} trigger="click">
                            <InfoCircleOutlined style={{fontSize:"25px",marginRight:"10px",marginTop:"6px"}}/></Popover>
                        <Input size="large" style={{width: '50%'}} placeholder="Type Clinic name or Post Code"
                               onChange={this.handleGetInputValue}
                        />
                        <div id="geocoder" style={{display: "none"}}></div>
                        <pre id="result"></pre>
                        <Select size="large" placeholder="Distance" style={{width: 120}}
                                value={this.state.distanceSelect}
                                onChange={this.handleDistanceValue} options={distanceOptions}>
                        </Select>

                        <Select size="large" placeholder="Language" style={{width: 120}}
                                value={this.state.languageSelect}
                                onChange={this.handleLanguageValue} options={languageOptions}>
                        </Select>
                        <Button type="primary" icon={<SearchOutlined style={{fontSize: 20, paddingLeft: 8}}/>}
                                size="large" onClick={() => this.submit(this.state)}/>
                    </Input.Group>
                </div>
                <div className="cards">
                    <Row gutter={[48, 48]}>
                        {this.info}
                    </Row>
                </div>
            </div>
        );
    }
}
