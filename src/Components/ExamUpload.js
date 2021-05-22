import React, { Component } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import '../Styles/ExamUpload.css';

export default class ExamUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileRender: null,

        };
        this.dragOver = this.dragOver.bind(this);
        this.dragEnter = this.dragOver.bind(this);
        this.dragLeave = this.dragLeave.bind(this);
        this.fileDrop = this.fileDrop.bind(this);
        this.onClickReload = this.onClickReload.bind(this);
        this.loadFile = this.loadFile.bind(this);

    }
    dragOver(e) {
        e.preventDefault();
    }

    dragEnter(e) {
        e.preventDefault();
    }

    dragLeave(e) {
        e.preventDefault();
    }

    fileDrop(e) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        const reader = new FileReader();
        reader.onload = () => {
            this.props.switchFile(reader.result)
        };
        reader.readAsDataURL(files[0]);
        
    }

    onClickReload() {
        //if infrastructure increase, may consider using redux
        //this is just shortcut since app is too small to implement redux
        if (document.getElementById("upload").value !== "") {
            document.getElementById("upload").value = ""
        }
    }

    loadFile(e) {
        this.props.switchFileProcess(null)
        const reader = new FileReader();
        reader.onload = () => {
            this.props.switchFile(reader.result)
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    render() {
        const { file } = this.props

        return (
            <div className="exam-upload">
                <form>
                    {/*need to resize to match image size latter on*/}
                    <div className="dottedBorder" 
                        role="button"
                        tabIndex={0}
                        onDragOver={this.dragOver}
                        onDragEnter={this.dragEnter}
                        onDragLeave={this.dragLeave}
                        onDrop={this.fileDrop}
                    >
                        <span className="regular-text">Upload hình ảnh đề thi</span>
                        <canvas id="wic" /> 
                        <AddPhotoAlternateIcon className="ft-awesome" />
                        {file && <img alt="Output" src={file} />}

                        <input type="file"
                            onClick={this.onClickReload}
                            onChange={this.loadFile}
                            id="upload" />
                    </div>
                </form>
            </div>
        )
    }
}