import React, { Component } from 'react';

class Carosuel extends Component {

    render(){
    const fullHeight = {
        height: '-webkit-fill-available'
    };
        // This is the carousel which is played in the LOGIN page 
        // The one with the 3 building images slideshowing
        return(
            <div className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img 
                            className="d-block w-100" 
                            style={fullHeight} 
                            src='http://www.psdgraphics.com/file/abstract-glass-building.jpg' 
                            alt="First slide" 
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                            className="d-block w-100" 
                            style={fullHeight} 
                            src='http://www.astoninsurance.com.au/wp-content/uploads/2017/04/corporate-building-glass-blue-skies.jpg' 
                            alt="Second slide" 
                        />
                    </div>
                    <div className="carousel-item">
                        <img 
                             className="d-block w-100" 
                             style={fullHeight} 
                             src='http://nocamels-nocamels.netdna-ssl.com/wp-content/uploads/2013/08/gauzy1.jpg' 
                             alt="Third slide" 
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Carosuel;
