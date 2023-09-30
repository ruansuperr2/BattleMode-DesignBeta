import React, { useState, useEffect } from "react";
import "./index.css";
import text from "../../version.json";

// This component displays a loading screen with a progress bar and text.
function Loading(props) {
  // The current value of the progress bar.
  const [barValue, setBarValue] = useState(0);

  // The current text displayed on the loading screen.
  const [textValue, setTextValue] = useState("Olá");

  // A boolean value indicating whether the loading screen is currently displayed.
  const [isLoading, setIsLoading] = useState(false);

  // This function simulates the loading process by incrementing the progress bar
  // and updating the text at regular intervals.
  function func() {
    // Scroll to the top of the page.
    window.scrollTo(0, 0);

    // Prevent the user from scrolling while the loading screen is displayed.
    document.body.style.overflow = "hidden";

    // Set a timeout to increment the progress bar to 12% and update the text to
    // "Pensando".
    setTimeout(() => {
      window.scrollTo(0, 0);
      setBarValue(12);
      setTextValue("Pensando");
    }, 400);

    // Set a timeout to increment the progress bar to 35% and update the text to
    // "Fazendo a lógica".
    setTimeout(() => {
      window.scrollTo(0, 0);
      setBarValue(35);
      setTextValue("Fazendo a lógica");
    }, 900);

    // Set a timeout to increment the progress bar to 66% and update the text to
    // "Esperando resposta do servidor".
    setTimeout(() => {
      window.scrollTo(0, 0);
      setBarValue(66);
      setTextValue("Esperando resposta do servidor");
    }, 2600);

    // Set a timeout to increment the progress bar to 100% and update the text to
    // "Resposta recebida, finalizando".
    setTimeout(() => {
      setBarValue(100);
      setTextValue("Resposta recebida, finalizando");
    }, 3100);

    // Set a timeout to hide the loading screen after 3800 milliseconds.
    setTimeout(() => {
      document.querySelector(".loadingMainDiv").classList.add("desaparecer");
      window.scrollTo(0, 0);
    }, 3800);

    // Set a timeout to reset the progress bar to 101%, hide the loading screen, and
    // restore the user's ability to scroll after 4000 milliseconds.
    setTimeout(() => {
      setBarValue(101);
      window.scrollTo(0, 0);
      document.body.style.overflow = "visible";
      document
        .querySelector(".loadingMainDiv")
        .classList.remove("desaparecer");
      document.querySelector(".loadingMainDiv").style.display = "none";
    }, 4000);
  }

  // This useEffect hook is used to start the loading process when the component is
  // first mounted.
  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      func();
    }
  }, [isLoading]);

  // This useEffect hook is used to hide the loading screen when the progress bar
  // reaches 101%.
  useEffect(() => {
    if (barValue === 101) {
      document.querySelector(".loadingMainDiv").style.display = "none";
    }
  }, [barValue]);

  return (
    <div className="paddingLeft loadingMainDiv">
      <div className="LoadingPageMainContainer">
        <img src={require("./logo.png")}></img>
        <label>{textValue}</label>
        <div className="barLoadingFull">
          <div
            className="barInsideGenerating"
            style={{ backgroundColor: props.cor, width: `${barValue}%` }}
          ></div>
        </div>
        <label>{text.version}</label>
        <p>Erros podem & irão ocorrer</p>
      </div>
    </div>
  )
};

export default Loading