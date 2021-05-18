import React from 'react';
import testImage1 from '../Resources/test-better.jpg';
import testImage2 from '../Resources/test_2.png';
import '../Styles/ExamSample.css';
export default class ExamSample extends React.Component {
    constructor(props) {
        super(props);
        this.base64Converter = this.base64Converter.bind(this);
    }
    base64Converter(imgBase, answer_key) {
        var c = document.createElement('canvas');
        var img = document.createElement('img');
        img.src = imgBase;
        c.height = img.naturalHeight;
        c.width = img.naturalWidth;
        var ctx = c.getContext('2d');

        ctx.drawImage(img, 0, 0, c.width, c.height);
        var base64string = c.toDataURL()
        this.props.imageChanger(base64string, answer_key, 4)
    }
    render() {
        return (
            <div className='exam-sample'>
                <h6>Sử dụng đề mẫu</h6>
                <div className='exam-sample-flex'>
                    {/* <img src={testImage1} alt="" onClick={() => this.base64Converter(testImage1, "DACBACCADCAC")}></img> */}
                    <img src={testImage2} alt="" onClick={() => this.base64Converter(testImage2, "ABCDABCDABCDA")}></img>
                </div>
            </div>
        )
    }
}

