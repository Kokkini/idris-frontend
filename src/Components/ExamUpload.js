import React, { Component } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

export default class ExamDisplay extends Component {
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

    dragEnter(e){
        e.preventDefault();
    }

    dragLeave(e){
        e.preventDefault();
    }

    fileDrop(e){
        e.preventDefault();
        const files = e.dataTransfer.files;
        const reader = new FileReader();
        reader.onload = () => {
            this.props.switchFile(reader.result)
        };
        reader.readAsDataURL(files[0]);
    }

    onClickReload(){
        //if infrastructure increase, may consider using redux
        //this is just shortcut since app is too small to implement redux
        if (document.getElementById("upload").value !== "") {
            document.getElementById("upload").value = ""
        }
    }

    loadFile(e){
        this.props.switchFileProcess(null)
        const reader = new FileReader();
        reader.onload = () => {
            this.props.switchFile(reader.result)
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    render() {
        const { file} = this.props

        return (
            <div className="exam-upload" style={{/*borderRight: "1px dotted black", height: '100vh'*/}}>
                <form style={{ display: "flex", flexDirection: "column", width: "50vw"  }}>
                    {/*need to resize to match image size latter on*/}
                    <div className="dottedBorder" id="selectDiv"
                        role="button"
                        tabIndex={0}
                        onDragOver={this.dragOver}
                        onDragEnter={this.dragEnter}
                        onDragLeave={this.dragLeave}
                        onDrop={this.fileDrop}
                        style={{
                            border: "1.5px #666666 dashed",
                            marginLeft: "10px",
                            height: "500px",
                            width: "350px",
                            maxWidth: "500px",
                            color: "black",
                            padding: "235px 50px 0 55px",
                            textAlign: "center",
                            position: "relative",
                        }}>
                            <AddPhotoAlternateIcon style={{
                            opacity:"0.2",
                            color: "rgb(24,202,153)",
                            position: "absolute",
                            top: "0",
                            left: "0",
                            bottom: "0",
                            right: "0",
                            width: "100%",
                            height: "100%",
                            zIndex:"2"}}/>
                        
                        {file && <img alt="Output" src={file} style={{
                            zIndex: "6",
                            position: "absolute",
                            bottom: "0",
                            right: "0",
                            width: "100%",
                            height: "100%"
                        }} />}
                        <span style={{ opacity: "1", zIndex: "3", position: "relative", fontWeight: "lighter", top: "100px" }}>Upload hình ảnh đề thi</span>

                        <input type="file"
                            onClick={this.onClickReload}
                            onChange={this.loadFile}
                            id="upload"
                            style={{
                                opacity: "0.0",
                                position: "absolute",
                                top: "0",
                                left: "0",
                                bottom: "0",
                                right: "0",
                                width: "100%",
                                height: "100%",
                                zIndex: "7",
                            }} />
                    </div>
                </form>
            </div>
        )
    }
}