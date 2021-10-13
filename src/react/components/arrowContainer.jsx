import React, { Component } from "react";

class ArrowContainer extends React.Component {
  renderSwitch = (param, custom, style, link) => {
    switch (param) {
      case "none":
        return <img src="" />;
      case "custom":
        return <img src={custom} style={style} />;
      default:
        // (param.includes(".svg") ?  console.log('svg') : console.log('not svg'))
        return <img src={link.default} style={style} />;
    }
  };

  importImages = (r) => {
    let images = {};
      r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
      return images;
  }

  render() {  
    // console.log("ArrowContainer props", this.props);    
    const {
      arrowMaxWidth,
      arrowDistanceLR,
      arrowDistanceUp,
      arrowLeftImg,
      arrowLeftCustom,
      arrowRightImg,
      arrowRightCustom,
    } = this.props.cS_Arrow;
    const { height } = this.props.scope;

    const stylesDiv = { width: arrowMaxWidth, height: height + "px" };
    const stylesBtn = { width: arrowMaxWidth, top: arrowDistanceUp };
    stylesBtn[this.props.position] = arrowDistanceLR;
    const stylesImg = { maxWidth: arrowMaxWidth, color: "blue", fill: "currentColor"};

    const images = this.importImages(require.context('../../img/', false, /\.(png|jpe?g|svg)$/));
    
    return (
      <div className="arrowContainer" style={stylesDiv}>
        <button className="buttonArrow" style={stylesBtn}>
          {this.props.position === "left"
            ? this.renderSwitch(arrowLeftImg, arrowLeftCustom, stylesImg, images[arrowLeftImg])
            : this.renderSwitch(arrowRightImg, arrowRightCustom, stylesImg, images[arrowRightImg])}
        </button>
      </div>
    );
  }
}

export default ArrowContainer;
