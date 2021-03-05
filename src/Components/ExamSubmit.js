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
        this.setState({
          [stater]: evt.target.value
        });
    };
        

    render() {
        //const { submitFile, clearFile } = this.props

        return (
            <div className="exam-submit">
                <div className="exam-submit-flex">
                    <div className="left-adjust"> 
                        <span>Số đề trộn:</span>
                        <input onChange={(e)=>this.updateInputValue("num_out", e)}/>
                    </div>
                    <div>
                        <span>Đáp án đề gốc:</span>
                        <input onChange={(e)=>this.updateInputValue("answer_key", e)}/>
                    </div >
                        <button onClick={()=>this.props.submitFile(this.state.answer_key, this.state.num_out)} className="submit">Trộn</button>
                        {this.props.loader? <Loader />:<div/>}
                    </div>
            </div>
        )
    }
}