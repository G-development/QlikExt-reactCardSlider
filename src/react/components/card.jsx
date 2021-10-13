import React, { Component } from "react";

class Card extends React.Component {
  state = { open: false }
  cardBlock = React.createRef();
  cardLinks = React.createRef();

  getFullHeight = (selector) => {
    var el = document.querySelector(selector);
    var elHeight = el.clientHeight; 

    elHeight += parseInt(window.getComputedStyle(el).getPropertyValue('margin-top')) / 2;
    elHeight += parseInt(window.getComputedStyle(el).getPropertyValue('margin-bottom')) / 2;
    return elHeight + 1;
  }

  handleExpand = (e) => {
    e.preventDefault();
    let x = this.getFullHeight('.link-wrapper'), // * 4,
        y = this.getFullHeight('.showMoreBTN'),
        mHcardLinks = this.props.scope.maxHeightCardLinks;
        
    if (this.state.open){
      // console.log('CLOSE');
      this.setState({ open: false });
      this.cardBlock.current.style.maxHeight = x + y + "px";
      this.cardLinks.current.style.maxHeight = x + "px";
      this.cardLinks.current.style.overflowY = 'hidden';
      this.cardLinks.current.scrollTo({top: 0, behavior: 'smooth'});
    } else { 
      // console.log('OPEN');
      this.setState({ open: true });
      this.cardBlock.current.style.maxHeight  = '999px';
      this.cardLinks.current.style.maxHeight  = mHcardLinks + 'px';
      this.cardLinks.current.style.overflowY = 'scroll';
    }
  }

  render() {
    // console.log("Card props", this.props);
    const { backgroundColor, borderRadius, borderColor, borderWidth, imgBorderRadius, minLinkShowed } = this.props.cardSlider.card;
    const { titleColor, titleSize, titleWeight, titleFontStyle } = this.props.cardSlider.title;
    const { linkColor, linkSize, linkWeight, linkFontStyle, linkMargin, linkArrowColor, linkShowmoreColor } = this.props.cardSlider.link;

    const card = this.props.card;

    var italicTitle, italicLink;
    if (titleFontStyle == true ) italicTitle = "italic"; else italicTitle = "normal"
    if (linkFontStyle == true ) italicLink = "italic"; else italicLink = "normal"
    
    const styleCard = { borderRadius: borderRadius, borderWidth: borderWidth, borderColor: borderColor, backgroundColor: backgroundColor };
    const styleTitle = { color: titleColor, fontSize: titleSize, fontWeight: titleWeight, fontStyle: italicTitle };
    const styleImg = { borderRadius: imgBorderRadius }
    const styleLink = { color: linkColor, fontSize: linkSize, fontWeight: linkWeight, fontStyle: italicLink };
    const styleLinkWrapper = {margin: linkMargin, padding: linkMargin};
    const styleShowMore = { color: linkShowmoreColor };

    return (
      <li className="glide__slide">
        <div className="cardContainer">
          <div className="card" style={styleCard}>
            <h4 className="card-title" style={styleTitle}>{card.ClusterName}</h4>
            <img className="card-img" src={card.Image} style={styleImg} alt="Card image cap"></img>
            <div className="card-block" ref={this.cardBlock}>
              <div className={"card-links " + (this.state.open ? "expand" : "")} ref={this.cardLinks}>
                {card.Props.map((link, i) => (
                  <div key={i} className="link-wrapper" style={styleLinkWrapper}>
                    <a className="link" href={link.Link} style={styleLink}>{link.LinkName}</a>
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="20" height="20" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z" fill={linkArrowColor}/></svg>
                  </div>
                ))}
              </div>
              {(card.Props.length > (minLinkShowed != "" ? minLinkShowed : 4)) ? 
              <p onClick={this.handleExpand} className="showMoreBTN" style={styleShowMore}>
              {(this.state.open) ? 'Show less' : 'Show more'}</p> : ""}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default Card;
