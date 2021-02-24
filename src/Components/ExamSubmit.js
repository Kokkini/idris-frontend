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
                <div style={{ display: "flex", width: "35vw", alignItems:"center", flexDirection:"column", marginTop: "100px"}}>
                    <div style={{ marginTop: "20px", marginLeft: "40px"}}> 
                        <span style={{ paddingRight: "10px"}}>Số đề trộn:</span>
                        <input onChange={(e)=>this.updateInputValue("num_out", e)}/>
                    </div>
                    <div style={{ marginTop: "20px"}}>
                        <span style={{ paddingRight: "10px"}}>Đáp án đề gốc:</span>
                        <input onChange={(e)=>this.updateInputValue("answer_key", e)}/>
                    </div >
                    
                        <button style={{ margin: '1.5rem', marginTop: "60px" }} onClick={()=>this.props.submitFile(this.state.answer_key, this.state.num_out)} className="submit">Trộn</button>
                        {this.props.loader? <Loader />:<div/>}
                    </div>
            </div>
        )
    }
}