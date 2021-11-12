import React, { useState } from "react";
import axios from "axios";
import "./UrlShortener.css";

export default function UrlShortener() {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [copyBtnText, setCopyBtnText] = useState("Copy");
  const [loadingMessage, setLoadingMessage] = useState("");

  const getShortUrl = async () => {
    try {
      if (!longUrl) {
        setErrorMessage("No Url Entered");
        return;
      }

      setLoadingMessage("Generating Short Link...");

      let res = await axios.post("https://myminurl.herokuapp.com/api/shorten", {
        longUrl,
      });

      setLoadingMessage("");

      if (res.data === "Invalid url") {
        setErrorMessage("Enter a valid url");
        setShortUrl("");
      } else {
        setShortUrl(res.data.shortUrl);
        setErrorMessage("");
        setLongUrl("");
        setCopyBtnText("Copy");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main">
      <h1>Link Shortener</h1>
      <div className="url-input">
        <input
          type="text"
          id="long-url"
          value={longUrl}
          onChange={(e) => {
            setLongUrl(e.target.value);
            e.target.value = "";
          }}
        />
      </div>
      <div className="generate-url btn">
        <button onClick={getShortUrl}>Shorten Link</button>
      </div>
      <div className="error">
        {errorMessage ? errorMessage : loadingMessage}
      </div>
      {shortUrl ? (
        <div className="short-url-div">
          <h2>Short Link</h2>
          <div className="short-url">{shortUrl}</div>
          <div className="copy-btn btn">
            <button
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                setCopyBtnText("Copied!");
              }}
            >
              {copyBtnText}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
