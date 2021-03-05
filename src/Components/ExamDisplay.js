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
        /* var element = e.target;
         var contentType = "image/jpeg";
         console.log(typeof this.props.file)
     var sliceSize = 1024;
     var byteCharacters = atob(this.props.file);
     var bytesLength = byteCharacters.length;
     var slicesCount = Math.ceil(bytesLength / sliceSize);
     var byteArrays = new Array(slicesCount);
 
     for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
         var begin = sliceIndex * sliceSize;
         var end = Math.min(begin + sliceSize, bytesLength);
 
         var bytes = new Array(end - begin);
         for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
             bytes[i] = byteCharacters[offset].charCodeAt(0);
         }
         byteArrays[sliceIndex] = new Uint8Array(bytes);
     }
         
         var filez = new Blob(
             byteArrays
           ,
           { type: contentType}
         );
         element.href = URL.createObjectURL(filez);
         console.log(URL.createObjectURL(filez));
         element.download = "image.jpg";
         element.click();
         */
        /*var alink = document.createElement("a");
        alink.href=this.props.file;
        alink.download="trac-nghiem"
        alink.click();*/
        
        var zip = new JSZip();
        var img = zip.folder("images");
        for(var i=0; i<this.state.imageArray.length; i++){
            var imgData=this.state.imageArray[i].replace("data:image/jpeg;base64,", "");
            img.file(`md-00${i}.png`, imgData, { base64: true });
        }
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                // see FileSaver.js
                saveAs(content, "example.zip");
            });

    };
    changeAnswerByClick(answerCode, results) {
        var StringConverer = "";
        for (var i = 0; i < results[answerCode].keys.length; i++) {
            StringConverer += results[answerCode].keys[i];
        }
        console.log(StringConverer)
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
        const num_outputs = this.props.num_outputs;
        for (var i = 0; i < num_outputs; i++) {
            const answerCode = `00${i}`
            item.push((<button onClick={() => this.changeAnswerByClick(answerCode, results)}>{answerCode}</button>))
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
                {/*<img src={test} alt=""/>*/}
                <div style={{ display: "flex", width: "35vw", alignItems: "center", flexDirection: "column", marginTop: "100px" }}>
                    <div style={{ marginTop: "20px", marginLeft: "10px" }}>
                        <span style={{ paddingRight: "10px" }}>Đáp án:</span>
                        <input disabled value={this.state.answer_key} />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <span style={{ paddingRight: "10px" }}>Mã đề:</span>
                        <input style={{ visibility: "hidden" }} />
                    </div >
                    <div style={{ display: "flex", flexDirection: "row", marginTop: '20px', flexWrap: "wrap" }}>
                        {this.state.resultItem}
                    </div>
                    {/*this save button is very easy to debug 
                        
                         <a href='../' onClick={(e)=>this.download(e)}><button style={{ margin: '1.5rem', marginTop: '60px' }} className="submit">Lưu</button></a> 
*/}{/*this.props.file*/}
<button style={{ margin: '1.5rem' }} onClick={(e)=>this.download(e)} id="submit">Lưu</button>
                </div>
            </div>
        )
    }
}