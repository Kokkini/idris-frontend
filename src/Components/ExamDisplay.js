import React from 'react';
import "../Styles/ExamDisplay.module.css";
import JSZip from "jszip";
import { saveAs } from 'file-saver';

export default class ExamDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultItem: [],
            answer_key: "",
            imageArray: []
        };
        this.changeAnswerByClick = this.changeAnswerByClick.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.download = this.download.bind(this);
    }
    download(e) {
        var zip = new JSZip();
        var folder = zip.folder("exams");
        for(var i=0; i<this.state.imageArray.length; i++){
            var imgData=this.state.imageArray[i].replace("data:image/jpeg;base64,", "");
            folder.file(`md-00${i}.png`, imgData, { base64: true });
        }
        var answerKeys = ["ma de\tdap an"]
        var results = this.props.results
        // console.log("results", results)
        var sortedCodes = Object.keys(results).sort();
        // console.log("sortedCodes", sortedCodes)

        for(var answerCode of sortedCodes){
            answerKeys.push(`${answerCode}\t${results[answerCode].keys.join('')}`)
        }
        folder.file('dap an.txt', answerKeys.join('\n'))
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "exams.zip");
            });
    };

    changeAnswerByClick(answerCode, results) {
        var StringConverer = "";
        for (var i = 0; i < results[answerCode].keys.length; i++) {
            StringConverer += results[answerCode].keys[i];
        }
        // console.log(StringConverer)
        this.setAnswer(StringConverer);
        this.props.imageChanger("data:image/jpeg;base64," + results[answerCode].img)
    }
    setAnswer(ak) {
        this.setState({
            answer_key: ak
        })
    }
    componentDidMount() {
        const item = [];
        const imageArray_component = [];
        const results = this.props.results;
        // console.log("results", results)
        const num_outputs = this.props.num_outputs;
        const sortedCodes = Object.keys(results).sort();
        for (var i = 0; i < num_outputs; i++) {
            const answerCode = sortedCodes[i]
            // console.log(answerCode)
            item.push((<button key={answerCode} className="btn-lite" onClick={() => this.changeAnswerByClick(answerCode, results)}>{answerCode==="000" ? `000 (${"gốc"})` : answerCode}</button>))
            imageArray_component.push("data:image/jpeg;base64," + results[answerCode].img)
            if (i === 0) {
                this.changeAnswerByClick(answerCode, results);
            }
        }
        setTimeout(this.setState({ resultItem: [...item], imageArray: [...imageArray_component] }), 3000);
    }

    render() {



        return (
            <div className="exam-display">
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "100px" }}>
                    <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                        <div className="regular-text">Đáp án:</div>
                        <input className='text-input' disabled value={this.state.answer_key} />
                    </div>
                    <div style={{ marginTop: "80px" }}>
                        <span className="regular-text">Mã đề</span>
                        {/* <input style={{ visibility: "hidden" }} /> */}
                    </div >
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignContent: "center", flexWrap: "wrap" }}>
                        {this.state.resultItem}
                    </div>
                    <button style={{ margin: '1.5rem' }} onClick={(e)=>this.download(e)} className="submit">Lưu</button>
                </div>
            </div>
        )
    }
}