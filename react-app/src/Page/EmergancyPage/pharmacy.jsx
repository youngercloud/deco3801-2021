import React, {Component} from 'react';
import logo from "./static/pharmacy.png";



class pharmacy extends Component {
    render(){
        return(
            <div>
                <div className="mainDiv">
                    <h2 className="head1">Pharmacy</h2>

                    <br/>
                    <br/>
                    <br/><img className="imageRight2" src={logo}/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">What is pharmacy ?</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>

                        <p className="fontLeft2">In general, Australian pharmacies are similar to aggregators, not only selling prescription drugs but also groceries and health products. The main responsibility of pharmacies is to advise customers on products, however, the customers, who need to buy prescription drugs, need to find a pharmacist and have a prescription in order to buy the drugs they need.</p></div>
                        <br/>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">What can pharmacy do for you</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - Give advice of treatment and medicine for minor illness and injuries.
                        <br/><br/>
                        - Provide prescription medicines.
                        <br/><br/>
                        - Provide basic medicines
                        <br/><br/>
                        - provide some vaccine
                        <br/><br/>
                        - some pharmacists in pharmacy can write medical certificates for you if you can not go to work
                        <br/><br/>
                        - pharmacist can give you health advice and pharmacy also sell health product
                        <br/>

                    </p>
                    <br/>

                </div>
                <div className="nextPart">
                    <h2 className="head2">How to get prescription medicines</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - Step1 : Bring your prescription to pharmacy.
                        <br/><br/>
                        - Step2 : Give the prescription to pharmacist.
                        <br/><br/>
                        - Step3 : The pharmacist will check the prescription and provides medication</p>
                    <br/>
                </div>
            </div>
        );
    }

}

export default pharmacy;