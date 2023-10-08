import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import MenuItems from "./MenuItems";
import { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { parse } from "marked";

function Menu() {
  const {
    items,
    savedItems,
    menuVisible,
    activeItemId,
    handleUpdateItemContent,
  } = useContext(AppContext);

  const [previewVisible, setPreviewVisible] = useState(false);
  const [themeSwitched, setThemeSwitched] = useState(false);
  const [markdownText, setMarkdownText] = useState("");

  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
  };

  const toggleTheme = () => {
    setThemeSwitched(!themeSwitched);
  };

  useEffect(() => {
    if (themeSwitched) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    // Cleanup: remove the class when the component unmounts
    return () => {
      document.body.classList.remove("dark-theme");
    };
  }, [themeSwitched]);

  useEffect(() => {
    // Initialize the content based on the active item when the component mounts
    setMarkdownText(items.itemContent[activeItemId] || "");
  }, [activeItemId]);

  const handleTextChange = (e) => {
    const html = parse(e.target.value);
    setMarkdownText(html);

    handleUpdateItemContent(activeItemId, e.target.value);
  };

  return (
    <>
      <main>
        <div className={`menu ${menuVisible ? "show" : ""}`}>
          <div>
            <p>
              Saved <span id="saved-num">{`(${savedItems.savedItemIds.length})`}</span>
            </p>
            <button className="theme-btn" onClick={toggleTheme}>
              <FontAwesomeIcon icon={themeSwitched ? faSun : faMoon} />
            </button>
          </div>
          <ul className="docs-nav">
            {savedItems.savedItemIds.map((id) => (
              <MenuItems key={id} id={id} title={items.itemTitles[id]} />
            ))}
          </ul>
        </div>
        <section
          className={`markdown ${!items.itemIds.length ? "hide" : ""} ${
            previewVisible ? "show-preview" : ""
          }`}
        >
          <header>
            <p>markdown</p>
            <button className="preview-btn" onClick={togglePreview}>
              <FontAwesomeIcon icon={!previewVisible ? faEye : faEyeSlash} />
            </button>
          </header>

          <textarea
            name="text"
            id="text"
            onChange={handleTextChange}
            value={items.itemContent[activeItemId]}
          ></textarea>
        </section>

        <section className={`preview ${!previewVisible ? "hide" : ""}`}>
          <header>
            <p>preview</p>
          </header>

          <div
            id="preview"
            dangerouslySetInnerHTML={{ __html: markdownText }}
          ></div>
        </section>
      </main>
    </>
  );
}

export default Menu;
