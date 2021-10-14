import React, {Component} from 'react';
import './static/medicalService.css'
import image1 from "../EmergancyPage/static/m1.png";
import image2 from "../EmergancyPage/static/m2.png";
import image3 from "../EmergancyPage/static/m3.png";
import image4 from "../EmergancyPage/static/m4.png";
import image5 from "../EmergancyPage/static/m5.png";
import image6 from "../EmergancyPage/static/m6.png";




class medicalServiceHomePage extends Component {
    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }
    }
    serviceSelected(info){
        this.props.serviceSelected(info)
    }

    render(){
        return(
            <div>
                <div className="body-class">
                    <div className="header-m">
                        <h1>Medical Service</h1>
                        <h1>IN Australia</h1>
                        <div id="FirstP"><p>The medical system in Australia have many<br/>
                            different types and times to provide health<br/>
                            care for you</p></div>
                        <br/>
                        <div className="header-content-wrapper">
                            <h2>5</h2>
                        </div>
                        <div className="header-content-wrapper" id="text-along-bigger">
                            <p>Main place to<br/>offer medical<br/>care for you!</p>
                            <br/>
                        </div>
                    </div>
                    <div className="content_container">
                        <div className="information-wrapper">
                            <div className="information-box">
                                <div className="information-title-box">
                                    <h1>More detail <br/>Here</h1>
                                </div>
                                <div className="information-content-box">
                                    <p id="SecondP">In Australia, in the first place, people usually go to <br/>GP when they need medical care.</p>
                                </div>
                            </div>
                        </div>
                        <div className="primary-wrapper">
                            <div className="primary-box">
                                <div className="primary-title-box">
                                    <h1 id="margin-fixed">Primary</h1>
                                </div>
                                <div className="primary-content-box">
                                    <div className="primary-information-box">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="gp">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                GP
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                Help with general health issue
                                            </p>
                                            <img src={image6} width="115px" height="100px"/>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("gp")}>
                                                <strong>Learn more</strong>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="primary-information-box" id="separate-second">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="ed">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                Emergency Department
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                Help with urgent issue
                                            </p>
                                            <img src={image4} width="115px" height="100px"/>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                     onClick={() => this.serviceSelected("emergency")}>
                                                <strong>Learn more</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="primary-wrapper">
                            <div className="primary-box">
                                <div className="primary-title-box">
                                    <h1 id="margin-fixed">Advanced</h1>
                                </div>
                                <div className="primary-content-box">
                                    <div className="primary-information-box">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="ed">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                Specialist Service
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                Provide help in specific area of medicine
                                            </p>
                                            <img src={image1} width="115px" height="100px"/>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("specialist")}>
                                                <strong>Learn more</strong>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="primary-information-box" id="separate-second">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="gp">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                Hospitals
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                Offer surgery, deal with serious diseases
                                            </p>
                                            <img src={image3} width="150px" height="140px"/>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("hospital")}>
                                                <strong>Learn more</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="primary-wrapper">
                            <div className="primary-box">
                                <div className="primary-title-box">
                                    <h1 id="margin-fixed">Other</h1>
                                </div>
                                <div className="primary-content-box">
                                    <div className="primary-information-box">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="gp">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                Pharmacy
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                Provide medicine for minor illness
                                            </p>
                                            <img src={image2} width="115px" height="100px"/>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("pharmacy")}>
                                                <strong>Learn more</strong>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="primary-information-box" id="separate-second">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="ed">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                Helpline
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                Help from Registered nurse on phone
                                            </p>
                                            <img src={image5} width="115px" height="100px"/>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("helpline")}>
                                                <strong>Learn more</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default medicalServiceHomePage;