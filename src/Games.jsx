import React, { useState, useEffect } from "react";
import { Form } from "react-router-dom";
import { Search, Plus, ArrowLeft } from "lucide-react";
import "./games.css";
import gamesData from "./games.json";

function GameContent({ htmlContent, handleBackClick }) {
  return (
    <div className="game-content">
      <div className="navbar-game">
        <ArrowLeft
          strokeWidth={1.5}
          className="back-button"
          onClick={handleBackClick}
        />
      </div>
      <div className="full-page-iframe-container">
        <iframe
          srcDoc={htmlContent}
          title="Game Content"
          className="full-page-iframe"
        />
      </div>
    </div>
  );
}

function Games() {
  const [htmlContent, setHtmlContent] = useState(null);

  const handleClick = async (link, type) => {
    switch (type) {
      case "HTML":
        try {
          const response = await fetch(link);
          const html = await response.text();
          setHtmlContent(html);
        } catch (error) {
          console.error("Error loading game:", error);
        }
        break;

      case "EMULATOR":
        try {
          // Not set up yet, but this is how it should work:
          //   <EmulatorJS
          //   EJS_core="mgba" // emulator core
          //   EJS_gameUrl="https://cdn.jsdelivr.net/gh/Cyanide-App/cyan-assets@main/EMULATORS/Pokemon%20Fire%20Red/Pokemon%20-%20Fire%20Red%20Version%20(U)%20(V1.1).zip" // rom url
          // />
        } catch (error) {
          console.error("Error loading game:", error);
        }
        break;

      default:
        // Handle other types or provide a default action
        console.error(`Unsupported game type: ${type}`);
    }
  };

  const handleBackClick = () => {
    setHtmlContent(null);
  };

  return (
    <div className="games-container">
      {gamesData.games
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(
          (
            game,
            index // sorts items alphabetically
          ) => (
            <div
              className="card"
              key={index}
              onClick={() => handleClick(game.link, game.type)}
            >
              <Plus strokeWidth={1.5} className="corner-icon top-left" />
              <Plus strokeWidth={1.5} className="corner-icon top-right" />
              <Plus strokeWidth={1.5} className="corner-icon bottom-left" />
              <Plus strokeWidth={1.5} className="corner-icon bottom-right" />

              <img src={game.imageSrc} alt={game.title} />
              <h2 className="game-title"> {game.title}</h2>
              <div className="game-info">
                <p className="game-genre">{game.genre}</p>
                <p className="spacer">█</p>
                <p className="game-type"> {game.type} </p>
              </div>
            </div>
          )
        )}

      {htmlContent && (
        <GameContent
          htmlContent={htmlContent}
          handleBackClick={handleBackClick}
        />
      )}
    </div>
  );
}

export default Games;
