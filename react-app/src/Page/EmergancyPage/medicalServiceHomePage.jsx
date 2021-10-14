import React, {Component} from 'react';
import './static/medicalService.css'
import image1 from "../EmergancyPage/static/m1.png";
import image2 from "../EmergancyPage/static/m2.png";
import image3 from "../EmergancyPage/static/m3.png";
import image4 from "../EmergancyPage/static/m4.png";
import image5 from "../EmergancyPage/static/m5.png";
import image6 from "../EmergancyPage/static/m6.png";






class medicalServiceHomePage extends Component {
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
                        <div className="front-background-wrapper">
                            <div className="front-background-box">
                                <div className="header-content-wrapper">
                                    <h2>5</h2>
                                </div>
                                <div className="header-content-wrapper" id="text-along-bigger">
                                    <p>Main place to<br/>offer medical<br/>care for you!</p>
                                    <br/>
                                </div>
                            </div>
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
                                            <div className="gp-hover">
                                                <div className="title-image">
                                                    <img src={image6} width="69px" height="60px" id="title-image1"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. Doctor who finish the general practice training
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. Doctor help with general health issue and manage your health
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. First person you should see if feel un well
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick="window.location.href='#';">
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
                                            <div className="ed-hover">
                                                <div className="title-image">
                                                    <img src={image4} width="69px" height="60px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. Provide help for people in emergency for 24/7
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. If have urgent issue, call 000 to get emergency service
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. Also you can go to ED of one hospital directly under urgent case
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick="window.location.href='#';">
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
                                            <div className="ed-hover">
                                                <div className="title-image">
                                                    <img src={image1} width="69px" height="60px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. Doctor who are good at a specific area of medicine, such as heart disease
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. You need referral from your GP before you wo see a specific
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. Specialist normal work in hospital
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick="window.location.href='#';">
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
                                            <div className="gp-hover">
                                                <div className="title-image">
                                                    <img src={image3} width="80px" height="69px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. Provide help for people in emergency for 24/7
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. If have urgent issue, call 000 to get emergency service
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. Also you can go to ED of one hospital directly under urgent case
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick="window.location.href='#';">
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
                                            <div className="gp-hover">
                                                <div className="title-image">
                                                    <img src={image2} width="60px" height="52px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. Help with minor illness and injures
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. Sell health product
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. Sell medicine and can provide vaccines
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick="window.location.href='#';">
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
                                            <div className="ed-hover">
                                                <div className="title-image">
                                                    <img src={image5} width="60px" height="52px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. You can get help when during after hour time
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. Provide help 24/7
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. May give you a call back from a GP
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick="window.location.href='#';">
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