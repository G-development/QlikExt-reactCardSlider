import React, { Component } from "react";
import Card from "./card";
import GlideBullets from "./glideBullets";

class Glide extends React.Component {
  render() {
    // console.log("Glide props", this.props);
    const { dataToPass, glideWidth} = this.props.scope;

    const styleGlide = { width: glideWidth + "px"};

    return (
      <div className="glide" style={styleGlide}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {dataToPass.map((e, i) => (
              <Card
                key={i}
                cardSlider={this.props.cardSlider}
                scope={this.props.scope}
                card={e}
              />
            ))}
          </ul>
        </div>
        <GlideBullets dataToPass={dataToPass}/>
      </div>
    );
  }
}

export default Glide;
