import React, { Component } from 'react';
import Loader from './Loader';

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
                <div style={{ display: "flex", width: "50vw", alignItems:"center", flexDirection:"column"}}>
                    <div style={{ marginTop: "20px", marginLeft: "10px"}}> 
                        <span style={{ paddingRight: "10px"}}>Số đề:</span>
                        <input onChange={(e)=>this.updateInputValue("num_out", e)}/>
                    </div>
                    <div style={{ marginTop: "20px"}}>
                        <span style={{ paddingRight: "10px"}}>Đáp án:</span>
                        <input onChange={(e)=>this.updateInputValue("answer_key", e)}/>
                    </div >
                    
                        <button style={{ margin: '1.5rem' }} onClick={()=>this.props.submitFile(this.state.answer_key, this.state.num_out)} id="submit">Trộn</button>
                        {this.props.loader? <Loader />:<div/>}
                    </div>
            </div>
        )
    }
}