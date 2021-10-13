import Glide from "@glidejs/glide";

import React from "react";
import { render } from "react-dom";
import App from "../react/App";

import "../files/glide.core.css";
import "../css/fonts.css";
import "../css/style.css";
import "../css/card.css";
import "../css/bullets.css";

var qlik = window.require("qlik");

export default function paint($element, layout) {
  // console.log("layout", layout);
  var cS = layout.cardSlider;

  var allTypes = ['cluster', 'img', 'link', 'linkName'], types = [];
  layout.qHyperCube.qDimensionInfo.map((x) => types.push(x.type));

  async function createData(scope) {
    var hc = layout.qHyperCube,
      mat = hc.qDataPages[0].qMatrix;

    var clusterNames = [],
      images = [],
      temp = [];
    scope.dataToPass = [];
    for (var i = 0; i < mat.length; i++) {
      var test = {};
      for (var j = 0; j < mat[i].length; j++) {
        switch (hc.qDimensionInfo[j].type) {
          case "cluster":
            var cluster = hc.qDimensionInfo[j].qFallbackTitle;
            test[hc.qDimensionInfo[j].qFallbackTitle] = mat[i][j].qText;
            clusterNames.push(mat[i][j].qText);
            break;
          case "img":
            if (mat[i][j].qText != "-") {
              images.push(mat[i][j].qText);
            }
            break;
          case "link":
            test["Link"] = mat[i][j].qText;
            break;
          case "linkName":
            test["LinkName"] = mat[i][j].qText;
            break;
          default:
            test[hc.qDimensionInfo[j].qFallbackTitle] = mat[i][j].qText;
            break;
        }
      }
      scope.dataToPass.push(test);
      temp.push(test);
    }

    var clNamesDistinct = [...new Set(clusterNames)];

    scope.dataToPass = [];
    var nuovoObj = {};
    for (var i = 0; i < clNamesDistinct.length; i++) {
      nuovoObj = {};
      nuovoObj["ClusterName"] = clNamesDistinct[i];
      nuovoObj["Image"] = images[i];
      nuovoObj["Props"] = [];

      for (var j = 0; j < temp.length; j++)
        if (temp[j][cluster] == clNamesDistinct[i]) {
          nuovoObj["Props"].push(temp[j]);
        }
      scope.dataToPass.push(nuovoObj);
    }
  }

  async function setHeightAndWidth(scope) {
    // set width and height depending on edit/analysis mode
    switch (qlik.navigation.getMode()) {
      case "edit":
        $("#root_" + layout.qInfo.qId).prependTo($element.parent());
        $("#grid").show();
        if ($element.width() > 800) {
          // if not mobile
          scope.containerWidth = $element.width();
          scope.height = $element.height();
          scope.glideWidth =
            $element.width() - cS.arrow.arrowMaxWidth.replace(/\D/g, "") * 2;
        } // no else because edit on mobile is not supported
        break;

      case "analysis":
        $("#root_" + layout.qInfo.qId).appendTo("#grid-wrap");
        $("#grid").hide();

        if ($("#grid-wrap").width() > 800) {
          // if not mobile
          scope.containerWidth = $("#grid-wrap").width();
          scope.height = $("#grid-wrap").height();
          scope.glideWidth =
            $("#grid-wrap").width() -
            cS.arrow.arrowMaxWidth.replace(/\D/g, "") * 2;
        } else {
          // if mobile
          scope.containerWidth = $("#grid-wrap").width();
          scope.height = $("#grid-wrap").height();
          scope.glideWidth = $("#grid-wrap").width();
        }
        break;
    }

    scope.maxHeightCardLinks = (scope.height / 2);
  }

  async function createGli() {
    const config = {
      type: "slider",
      perView: cS.card.minCardPerView != "" ? cS.card.minCardPerView : 4,
      focusAt: 0,
      bound: true,
      breakpoints: {
        1000: {
          perView:
            cS.card.minCardPerView1000 != "" ? cS.card.minCardPerView1000 : 3,
          peek: 10,
        },
        800: {
          perView:
            cS.card.minCardPerView800 != "" ? cS.card.minCardPerView800 : 2,
          peek: 10,
        },
        500: {
          perView:
            cS.card.minCardPerView500 != "" ? cS.card.minCardPerView500 : 1,
          peek: 10,
        },
      },
    };

    var glide = new Glide(".glide", config).mount();
    $(".buttonArrow:first-child").on("click", () => {
      glide.go("<");
    });

    $(".buttonArrow:nth-child(1)").on("click", () => {
      glide.go(">");
    });
  }

  async function getCardBlockHeight() {
    let cardBlocks = document.querySelectorAll(".card-block"),
      cardLinks = document.querySelectorAll(".card-links"),
      x =
        getFullHeight(".link-wrapper") *
        (cS.card.minLinkShowed != "" ? cS.card.minLinkShowed : 4), //repeat 4 times the height of a single .link-wrapper
      y = getFullHeight(".showMoreBTN");

    cardLinks.forEach((cLinks) => {
      cLinks.style.minHeight = x + "px";
      cLinks.style.maxHeight = x + "px";
    });
    cardBlocks.forEach((cBlock) => {
      cBlock.style.minHeight = x + y + "px";
      cBlock.style.maxHeight = x + y + "px";
    });
  }

  function getFullHeight(selector) {
    var el = document.querySelector(selector);
    var elHeight = el.clientHeight;

    elHeight +=
      parseInt(window.getComputedStyle(el).getPropertyValue("margin-top")) / 2;
    elHeight +=
      parseInt(window.getComputedStyle(el).getPropertyValue("margin-bottom")) /
      2;
    return elHeight + 1;
  }

  function containsAll(needles, haystack) {
    for (var i = 0; i < needles.length; i++) {
      if ($.inArray(needles[i], haystack) == -1) return false;
    }
    return true;
  }

  async function callThisFunction(scope) {
    await setHeightAndWidth(scope);
    await createData(scope);

    render(
      <App cardSlider={cS} scope={scope} types={types}/>,
      document.getElementById("root_" + layout.qInfo.qId)
    );

    if (containsAll(allTypes, types)) {
      await createGli();
      await getCardBlockHeight();
    }
  }
  callThisFunction(this.$scope);
}
