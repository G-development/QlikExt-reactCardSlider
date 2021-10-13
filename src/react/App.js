import React, { Component } from "react";
import ArrowContainer from "./components/arrowContainer";
import Glide from "./components/glide";

class App extends React.Component {
  render() {
    // console.log('App props', this.props);

    const { containerWidth, height } = this.props.scope;
    const styles = { width: containerWidth + "px", height: height + "px" };
    const types = this.props.types;

    return (
      <div className="container" style={styles}>

        {types.includes("cluster") && types.includes("img") &&
        types.includes("link") && types.includes("linkName")
        ? 
        <>
        <ArrowContainer cS_Arrow={this.props.cardSlider.arrow} scope={this.props.scope} position='left' />
        <Glide cardSlider={this.props.cardSlider} scope={this.props.scope} />
        <ArrowContainer cS_Arrow={this.props.cardSlider.arrow} scope={this.props.scope} position='right' />
        </>
        :
        <div>
          <h1> Something is missing! </h1>
          {(types.includes('cluster')) ? <h2>Cluster: <a className="green">Ok</a> </h2> : <h2>Cluster: <a className="red">Missing</a> </h2>}
          {(types.includes('img')) ? <h2>Image: <a className="green">Ok</a></h2> : <h2>Image: <a className="red">Missing</a> </h2>}
          {(types.includes('link')) ? <h2>Link: <a className="green">Ok</a></h2> : <h2>Link: <a className="red">Missing</a> </h2>}
          {(types.includes('linkName')) ? <h2>Link name: <a className="green">Ok</a></h2> : <h2>Link name: <a className="red">Missing</a> </h2>}
        </div>
        }
        
       
      </div>
    );
  }
}
export default App;
