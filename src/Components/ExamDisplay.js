import React from 'react';
import "../Styles/ExamDisplay.module.css";

export default class ExamDisplay extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            resultItem:[],
            answer_key: null,
        };
        this.changeAnswerByClick=this.changeAnswerByClick.bind(this);
        this.setAnswer=this.setAnswer.bind(this);
    }
    changeAnswerByClick(answerCode, results){
        console.log(results[answerCode]);
        this.setAnswer(results[answerCode].keys);
    }
    setAnswer(ak){
        this.setState({
            answer_key:ak
        })
    }
    componentDidMount(){
        const item=[];
        const results = this.props.results;
        const num_outputs = this.props.num_outputs;
        for(var i=0; i<num_outputs; i++){
            const answerCode=`00${i}`
            item.push((<button onClick={()=>this.changeAnswerByClick(answerCode, results)}>{answerCode}</button>))
            if(i===0){
                this.setAnswer(results[answerCode].keys);
            }
        }
        console.log(item)
        setTimeout(this.setState({resultItem:item}), 2000);
        console.log(this.state.resultItem)
    }

    render(){
        
        
        
        return(
            <div className="exam-display">
                {/*<img src={test} alt=""/>*/}
                <div style={{ display: "flex", width: "50vw", alignItems:"center", flexDirection:"column"}}>
                    <div style={{ marginTop: "20px", marginLeft: "10px"}}> 
                        <span style={{ paddingRight: "10px"}}>Đáp án:</span>
                        <input disabled value={this.state.answer_key}/>
                    </div>
                    <div style={{ marginTop: "20px"}}>
                        <span style={{ paddingRight: "10px"}}>Mã đề:</span>
                        <input style={{visibility: "hidden"}}/>
                    </div >
                    <div style={{ display: "flex", flexDirection:"row", marginTop: '20px', flexWrap: "wrap"}}>
                    {this.state.resultItemm}
                    </div>
                        <button style={{ margin: '1.5rem' }} id="submit">Lưu</button>
                    </div>
            </div>
        )
    }
}