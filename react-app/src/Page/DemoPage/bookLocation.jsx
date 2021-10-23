
import React, {Component} from "react";
import "./static/bookLocation.css";
import {Input, Select, Space, Cascader, Button, Col, Row, Steps} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Card } from 'antd';


import axios from "axios";
import MapboxGl from "mapbox-gl/dist/mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

const distanceOptions=[
    { value: '0,1', label: '1km' },
    { value: '1,3', label: '1km-3km' },
    { value: '3,999999', label: 'more than 3Km' },
];

const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
];

const { Meta } = Card;

export default class bookLocation extends Component {
    info;
    languages;
    state={
        input: '',
        distanceMin:'0',
        distanceMax:'9999',
        language:'',
        distanceSelect: undefined,
        getInfo:'false',
        CurrentDisX:0,
        CurrentDisY:0,
    }
    handleGetInputValue = (event) => {
        this.setState({
            "input" : event.target.value,
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
        geocoder.query("Australia "+ event.target.value);
        geocoder.on('result', (e) => {

            const x = e.result.bbox[0];
            const y = e.result.bbox[1];

            this.setState({
                CurrentDisX : e.result.bbox[1],
                CurrentDisY : e.result.bbox[0],
            })

            console.log("SATE:",this.state)

        });
    };

    handleDistanceValue = distanceSelect => {
        this.setState({
            CurrentDisX : distanceSelect.replace(",","")[0],
            CurrentDisY : distanceSelect.replace(",","")[1],
        })

    };

    handleLanguageValue = languageSelect => {
        this.setState({
            language : languageSelect,
        })

    };

    gpSelected(info){
        this.props.gpSelected(info,"GpSelected")
    }

    submit = (e) => {
        console.log(e)
        let api;
        api = "/api/booking/searchGp"
        axios.post(api, e).then((response) => {
            console.log(response.data)
            const json = response.data;
            const arr = [];

            let arr2=[];
            Object.keys(json).forEach(function(key) {
                arr.push(json[key]);
            });

            arr2=arr[0];
            {console.log(arr2)}
            this.info = arr2.map((d) =>
                <Col span={10} >
                    <Card>
                        <div >
                            <img alt="example" style={{width:"55%",height:"100%"}} src={require('../../Images/'+d.Images.Path).default} />
                        </div>

                        <div>
                            <h1>{d.Gp.GpName}</h1>
                            <h3>Distance: {d.Distance} Kilometer</h3>
                            <h3>Language:</h3>
                       
                            {/*<Row>*/}
                            {/*    {d.Language.map(item=>(*/}
                            {/*        <Col><p>{item} &nbsp;</p></Col>*/}
                            {/*    ))}*/}
                            {/*</Row>*/}

                            <Button  onClick={() => {this.gpSelected(d)}}><p>$65 - Consultation</p></Button>
                        </div>
                    </Card>
                </Col>
            );
            this.setState({getInfo:'true'});
        }).catch(function (error) {
            console.log(error);
        });
    };

    componentDidMount() {

        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }

        let api;
        api = "/api/booking/searchGp"
        axios.post(api, this.state).then((response) => {
            console.log(response.data)
            const json = response.data;
            const arr = [];

            let arr2=[];
            Object.keys(json).forEach(function(key) {
                arr.push(json[key]);
            });

            arr2=arr[0];
            {console.log(arr2)}
            this.info = arr2.map((d) =>
                <Col span={10} >
                    <Card>
                        <div >
                            <img alt="example" style={{width:"55%",height:"200px"}} src={require('../../Images/'+d.Images.Path).default} />
                        </div>

                        <div>
                            <h1>{d.Gp.GpName}</h1>
                            <h3>Distance: {d.Distance} Kilometer</h3>
                            <h3>Language:</h3>

                            <Row>
                                {d.Language.map(item=>(
                                    <Col><p>{item} &nbsp;</p></Col>
                                ))}
                            </Row>

                            <Button  onClick={() => {this.gpSelected(d)}}><p>$65 - Consultation</p></Button>
                        </div>
                    </Card>
                </Col>
            );
            this.setState({getInfo:'true'});
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="location">

                <div className="inputData">
                    <Input.Group compact>
                        <Input  size="large" style={{ width: '50%' }} placeholder="Type Clinic name or Post Code"  onChange={this.handleGetInputValue}
                                />
                        <div id="geocoder" style={{display:"none"}}></div>
                        <pre id="result"></pre>
                        <Select size="large" placeholder="Distance" style={{ width: 120 }} value={this.state.distanceSelect}
                                onChange={this.handleDistanceValue} options={distanceOptions}>
                            {/*<Option value="1km">1km</Option>*/}
                            {/*<Option value="1km-3km">1km-3km</Option>*/}
                        </Select>

                        <Select size="large" placeholder="Language" style={{ width: 120 }} value={this.state.languageSelect}
                                onChange={this.handleLanguageValue} options={languageOptions}>
                            {/*<Option value="English">English</Option>*/}
                            {/*<Option value="Chinese">Chinese</Option>*/}
                            {/*<Option value="Japanese">Japanese</Option>*/}
                        </Select>
                        <Button type="primary" icon={<SearchOutlined style={{fontSize:20,paddingLeft:8}}/>}size="large" onClick={()=>this.submit(this.state)}/>
                    </Input.Group>
                </div>

                {/*<p>Input: {this.state.inputGP}</p>*/}
                {/*<p>Select1: {this.state.distanceSelect}</p>*/}
                {/*<p>Select2: {this.state.languageSelect}</p>*/}
                <div className="cards">

                    <Row gutter={[48, 48]} >

                        {/*<Col span={9}>*/}
                        {/*    <Card >*/}
                        {/*        <img alt="example" src={require('../../Images/gp1.png').default} style={{width:177,float:"left"}}/>*/}

                        {/*        <h1>AAAAA CLINIC</h1>*/}
                        {/*        <h2>distances:</h2>*/}
                        {/*        <h2>language:</h2>*/}
                        {/*        <Button  onClick={() => {this.gpSelected("AAAAA CLINIC")}}>$65 - Consultation</Button>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}
                        {/*<Col span={9}>*/}
                        {/*    <Card >*/}
                        {/*        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>*/}
                        {/*        <h1>AAAAA CLINIC</h1>*/}
                        {/*        <h2>distances:</h2>*/}
                        {/*        <h2>language:</h2>*/}
                        {/*        <Button>$65 - Consultation</Button>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}

                        {this.info}
                    </Row>
                    {/*<Row gutter={[48, 48]} justify="center">*/}
                    {/*    <Col span={9}>*/}
                    {/*        <Card >*/}
                    {/*            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>*/}
                    {/*            <h1>AAAAA CLINIC</h1>*/}
                    {/*            <h2>distances:</h2>*/}
                    {/*            <h2>language:</h2>*/}
                    {/*            <Button>$65 - Consultation</Button>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={9}>*/}
                    {/*        <Card >*/}
                    {/*            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>*/}
                    {/*            <h1>AAAAA CLINIC</h1>*/}
                    {/*            <h2>distances:</h2>*/}
                    {/*            <h2>language:</h2>*/}
                    {/*            <Button>$65 - Consultation</Button>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </div>
            </div>
        );
    }
}
