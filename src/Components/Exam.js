import React, { Component } from "react"
import ExamDisplay from "./ExamDisplay";
import ExamUpload from "./ExamUpload";
import ExamSubmit from "./ExamSubmit";
import ExamSample from "./ExamSample";
import "../Styles/Exam.css";
class Exam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            display: false,
            num_outputs: 0,
            keys: [],
            results: null,
            loader: false
        };
        this.switchFile = this.switchFile.bind(this);
        this.switchFileProcess = this.switchFileProcess.bind(this);
        this.submitFile = this.submitFile.bind(this);
        this.clearFile = this.clearFile.bind(this);
        this.displayToggle = this.displayToggle.bind(this);
        this.imageChanger = this.imageChanger.bind(this);

    }

    switchFile(file) {
        this.setState({
            file: file
        })
    }
    switchFileProcess(fileProcess) {
        this.setState({
            fileProcess: fileProcess
        })
    }
    displayToggle() {
        this.setState({
            display: !this.state.display
        })
    }

    imageChanger(imgURL) {
        this.setState({
            file: imgURL
        })
    }

    async submitFile(answerKey, outputNum) {
        if (answerKey === null || outputNum === null) {
            console.log("Please insert answer key or output num")
        }
        else {
            var answerArray = []
            for (var i = 0; i < answerKey.length; i++) {
                if (answerKey[i] !== " " && answerKey[i] !== "," && answerKey[i] !== ", ") {
                    answerArray.push(answerKey[i].toUpperCase())
                }
            }
            this.setState({
                keys: answerKey,
                num_outputs: parseInt(outputNum),
                loader: true
            });
            var preProcessImgURL=JSON.stringify(this.state.file);
            var properImgURL=preProcessImgURL.slice(preProcessImgURL.indexOf(",")).replace(",", "")
            const payload = {
                "image": properImgURL,
                "keys": answerArray,
                "num_outputs": parseInt(outputNum)
            }
            //TODO: check individual fields of payload instead of the whole object
            if (payload.image !== null && payload.keys !== null && payload.num_outputs !== null) {
                
                const response = await fetch("http://ec2-34-222-194-221.us-west-2.compute.amazonaws.com/mix-multi-outputs", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });
                const data = await (response.json());

                const resultObject = data;
                console.log(resultObject);

                this.setState({
                    results: resultObject
                })
            }
            console.log(this.state.num_outputs)
            this.setState({ loader: false })
            this.displayToggle();
        }
    }

    clearFile() {
        this.switchFile(null)
        this.setState({
            file: null,
            fileProcess: null,
        })
        //fail safe
        document.getElementById("submit").disabled = false;
    }

    render() {
        const file = this.state.file
        const display = this.state.display
        const num_outputs = this.state.num_outputs
        const results = this.state.results
        const loader = this.state.loader
        return (
            <div>
                <div className="exam">
                    <div className="exam-left">
                    <ExamUpload file={file} switchFile={this.switchFile} switchFileProcess={this.switchFileProcess} />
                    {display ?null:<ExamSample imageChanger={this.imageChanger}/>}
                    </div>
                    <div className="exam-right">
                        {display ?
                            <ExamDisplay file={this.state.file} imageChanger={this.imageChanger} num_outputs={num_outputs} results={results} /> :
                            <ExamSubmit submitFile={this.submitFile} clearFile={this.clearFile} loader={loader} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default Exam