import '../Styles/App.css';
const Tutorial = () => {
    return (
        <div
        style={{
            'margin': '50px auto auto auto',
            width: '50%'
        }}>
            <div>
                <h2 className="regular-text" style={{textAlign: "center"}}>Trộn đề</h2>
                <iframe className="shadow" title="trộn đề" width="800px" height="500px" src="https://www.youtube.com/embed/tgbNymZ7vqY">
                </iframe>
            </div>
        </div>
    )
}

export default Tutorial
