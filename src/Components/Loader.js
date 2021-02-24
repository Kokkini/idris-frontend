import React from 'react';
import '../Styles/Loader.css';
const Loader = () => {
    return (
        <div id="loader" style={{ display: "flex", justifyContent: 'flex-end' , alignContent: 'end'}} >
            <h6 style={{ marginRight: '10px' }}>Chờ một chút</h6> 
            <div className="load-3 load-wrapp">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
        </div>
    )
}
export default Loader;