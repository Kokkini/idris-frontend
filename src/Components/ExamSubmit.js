import React, { Component } from 'react';
import Loader from './Loader';
import "../Styles/Exam.css";

export default class ExamDisplay extends Component {
    constructor(props) {
        super(props);
        this.state={
            num_out: null,
            answer_key: null,
        };
        this.updateInputValue=this.updateInputValue.bind(this)
    };

    updateInputValue(stater, evt) {
        console.log(document.getElementById("exam-submit-input-answer").value)
        this.setState({
          [stater]: evt.target.value
        });
    };

 

    render() {
        //const { submitFile, clearFile } = this.props
        return (
            <div className="exam-submit">
                <div className="exam-submit-flex">
                    <div> 
                        <div>Số đề trộn:</div>
                        <input className='text-input' onChange={(e)=>this.updateInputValue("num_out", e)} id="exam-submit-input-num-output"/>
                    </div>
                    <div>
                        <div>Đáp án đề gốc:</div>
                        <input className='text-input' onChange={(e)=>this.updateInputValue("answer_key", e)} id="exam-submit-input-answer"/>
                    </div >
                    {this.props.submitMode==="format" && <button onClick={() => this.props.submitFormat()} className="submit">Định dạng</button>}
                    {this.props.submitMode==="mix" && <button onClick={()=>this.props.submitMix(document.getElementById("exam-submit-input-answer").value, document.getElementById("exam-submit-input-num-output").value )} className="submit">Trộn</button>}
                    {/* <button onClick={()=>this.props.submitFile(document.getElementById("exam-submit-input-answer").value, this.state.num_out )} className="submit">Trộn</button> */}
                    {this.props.loader? <Loader />:<div/>}
                </div>
            </div>
        )
    }
}