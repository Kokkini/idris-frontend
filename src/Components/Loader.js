import React from 'react';
import '../Styles/Loader.css';
const Loader = () => {
    return (
        <div id="loader" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", flexDirection: 'column'  }} >
            <span style={{marginTop: '30px', marginBottom: '30px'}}>Chờ một chút</span> 
            <div className="load-3 load-wrapp">
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
        </div>
    )
}
export default Loader;