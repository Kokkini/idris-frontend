import React, { Component } from "react"
import ExamDisplay from "./ExamDisplay";
import ExamUpload from "./ExamUpload";
import ExamSubmit from "./ExamSubmit";
import ExamSample from "./ExamSample";
import ExamEdit from "./ExamEdit";
import { fabric } from "fabric";
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
            loader: false,
            answer_submit: "",
            displayEditor: false,
            rawAnno: null,
            getUserAnno: null,
            submitMode: "format"
        };
        this.switchFile = this.switchFile.bind(this);
        this.switchFileProcess = this.switchFileProcess.bind(this);
        this.submitFile = this.submitFile.bind(this);
        this.submitFormat = this.submitFormat.bind(this);
        this.submitMix = this.submitMix.bind(this);
        this.clearFile = this.clearFile.bind(this);
        this.displayToggle = this.displayToggle.bind(this);
        this.imageChanger = this.imageChanger.bind(this);
        this.drawRec = this.drawRec.bind(this);
        this.setGetUserAnno = this.setGetUserAnno.bind(this);
    }

    setGetUserAnno(getUserAnno){
        this.setState({
            getUserAnno: getUserAnno
        })
    }

    drawRec(coordArray) {
        const canvas = new fabric.Canvas('wic',
            {
                height: 600,
                width: 410
            });
            coordArray.forEach((item)=>{
            var square = new fabric.Rect({
                fill: 'green',
                id: "someid",
            });

            let x1s = item[0];
            let y1s = item[1];
            let x2s = item[2];
            let y2s = item[3];

            square.set("top", y1s);
            square.set("left", x1s);
            square.set("width", (x2s - x1s));
            square.set("height", (y2s - y1s));
            console.log(square)
            canvas.add(square);
        })
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

    imageChanger(imgURL, answerKey) {
        this.setState({
            file: imgURL
        })
        if (answerKey !== undefined && answerKey !== null && answerKey !== "") {
            document.getElementById("exam-submit-input-answer").value = answerKey;
        }
    }

    async submitFormat() {
        console.log("formatting...")
        console.log(this)
        this.setState({
            loader: true
        });
        var preProcessImgURL = JSON.stringify(this.state.file);
        var properImgURL = preProcessImgURL.slice(preProcessImgURL.indexOf(",")).replace(",", "") //remove png and jpeg header
        const payload = {
            "image": properImgURL
        }
        try {
            //TODO: check individual fields of payload instead of the whole object
            if (payload.image !== null) {
                const response = await fetch("https://backend.idris-edu.com/raw-pred", {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                const data = await (response.json());
                const resultObject = data;
                this.setState({
                    results: resultObject,
                    displayEditor: true,
                    file: "data:image/jpeg;base64," + resultObject["img"],
                    rawAnno: resultObject["anno"],
                    submitMode: "mix"
                })
            }
        }
        catch (err) {
            console.log(err)
        }
        this.setState({ 
            loader: false,
        })
        // this.displayToggle();
    }

    async submitMix(answerKey, outputNum) {
        console.log()
        if (answerKey === null || outputNum === null) {
            alert("Điền thiếu đáp án hoặc số lượng đề")
        }
        else {
            var answerArray = []
            for (var i = 0; i < answerKey.length; i++) {
                if (answerKey[i] !== " " && answerKey[i] !== "," && answerKey[i] !== ", ") {
                    answerArray.push(answerKey[i].toUpperCase())
                }
            }

            const userAnno = this.state.getUserAnno()
            const numAnnotatedQuestions = Object.keys(userAnno["question-answers"]).length + userAnno["user_anno"]["question_labels"].length
            if(numAnnotatedQuestions !== answerArray.length){
                alert(`Số câu hỏi được khoanh trên hình (${numAnnotatedQuestions} câu) khác số đáp án đúng của đề gốc (${answerArray.length} đáp án). Vui lòng kiểm tra lại.`)
                return
            }
            this.setState({
                keys: answerKey,
                num_outputs: parseInt(outputNum),
                loader: true
            });
            var preProcessImgURL = JSON.stringify(this.state.file);
            var properImgURL = preProcessImgURL.slice(preProcessImgURL.indexOf(",")).replace(",", "") //remove png and jpeg header
            const payload = {
                "image": properImgURL,
                "keys": answerArray,
                "num_outputs": parseInt(outputNum),
                "anno": userAnno
            }
            console.log("payload",payload)
            try {
                //TODO: check individual fields of payload instead of the whole object
                if (payload.image !== null && payload.keys !== null && payload.num_outputs !== null && payload.anno !== null) {
                    const response = await fetch("https://backend.idris-edu.com/mix-annotated-multi-outputs", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                    if(!response.ok){
                        alert("Xảy ra lỗi, vui lòng thử lại")
                        throw new Error("response not ok")
                    }
                    const data = await (response.json());
                    const resultObject = data;
                    // console.log("resultObject", resultObject)
                    this.setState({
                        results: resultObject, displayEditor: false
                    })
                    this.displayToggle();
                }
            }
            catch (err) {
                console.log(err)
            }
            this.setState({
                loader: false
            })
            
        }
    }

    async submitFile(answerKey, outputNum) {
        console.log()
        if (answerKey === null || outputNum === null) {
            alert("Điền thiếu đáp án hoặc số lượng đề")
        }
        else {
            var answerArray = []
            for (var i = 0; i < answerKey.length; i++) {
                if (answerKey[i] !== " " && answerKey[i] !== "," && answerKey[i] !== ", ") {
                    answerArray.push(answerKey[i].toUpperCase())
                }
            }
            console.log(this)
            this.setState({
                keys: answerKey,
                num_outputs: parseInt(outputNum),
                loader: true
            });
            var preProcessImgURL = JSON.stringify(this.state.file);
            var properImgURL = preProcessImgURL.slice(preProcessImgURL.indexOf(",")).replace(",", "") //remove png and jpeg header
            const payload = {
                "image": properImgURL,
                "keys": answerArray,
                "num_outputs": parseInt(outputNum)
            }
            try {
                //TODO: check individual fields of payload instead of the whole object
                if (payload.image !== null && payload.keys !== null && payload.num_outputs !== null) {
                    const response = await fetch("https://backend.idris-edu.com/mix-multi-outputs", {
                        method: 'POST',
                        mode: 'cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    })
                    const data = await (response.json());


                    const resultObject = data;
                    this.setState({
                        results: resultObject
                    })
                }
            }
            catch (err) {

            }
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
        const rawAnno = this.state.rawAnno
        const display = this.state.display
        const num_outputs = this.state.num_outputs
        const results = this.state.results
        const loader = this.state.loader
        const displayEditor = this.state.displayEditor
        const submitMode = this.state.submitMode
        return (
            <div>
                <div className="exam">
                    <div className="exam-left">
                        {/* <button onClick={() => { this.drawRec([[39, 307, 64, 32], [520, 311, 544, 331]]) }}>Draw Rec</button>
                        <button>Save Rec</button> */}
                        {displayEditor ? <ExamEdit base64={file} anno={rawAnno} setGetUserAnno={this.setGetUserAnno}/> : <ExamUpload file={file} switchFile={this.switchFile} switchFileProcess={this.switchFileProcess} />}
                        {/* <ExamUpload file={file} switchFile={this.switchFile} switchFileProcess={this.switchFileProcess} /> */}
                        {display ? null : <ExamSample imageChanger={this.imageChanger} />}

                    </div>
                    <div className="exam-right">
                        {display ?
                            <ExamDisplay file={this.state.file} imageChanger={this.imageChanger} num_outputs={num_outputs} results={results} /> :
                            <ExamSubmit answer={this.state.answer_submit} submitMode={submitMode} submitFile={this.submitFile} submitFormat={this.submitFormat} submitMix={this.submitMix} clearFile={this.clearFile} loader={loader} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default Exam