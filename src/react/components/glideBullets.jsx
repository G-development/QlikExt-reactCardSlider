import React, { Component } from "react";

class GlideBullets extends React.Component {
  render() {
    // console.log("glideBullets props", this.props);
    const styleDiv = {
      top: "100%"
    };

    return (
      <div className=" glide__bullets" data-glide-el="controls[nav]" style={styleDiv}>
        {this.props.dataToPass.map((card, i) => (
          <button key={i} className="glide__bullet" data-glide-dir={"=" + i}></button>
        ))}
      </div>
    );
  }
}

export default GlideBullets;
