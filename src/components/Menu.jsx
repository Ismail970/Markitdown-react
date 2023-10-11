import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import MenuItems from "./MenuItems";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import Button from "./shared/Button";
import MarkdownArea from "./MarkdownArea";

function Menu() {
  const {
    items,
    savedItems,
    menuVisible,
    toggleTheme,
    themeSwitched,
  } = useContext(AppContext);

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

  return (
    <main>
      <div className={`menu ${menuVisible ? "show" : ""}`}>
        <div>
          <p>
            Saved{" "}
            <span id="saved-num">{`(${savedItems.savedItemIds.length})`}</span>
          </p>
          <Button className={"theme-btn"} eventHandler={toggleTheme} fontAwesomeIcon={themeSwitched ? faSun : faMoon}/>
        </div>
        <ul className="docs-nav">
          {savedItems.savedItemIds.length === 0 ? (
            <p className="no-file-save-msg">No file is saved</p>
          ) : (
            savedItems.savedItemIds.map((id) => (
              <MenuItems
                key={id}
                id={id}
                title={savedItems.savedItemTitles[id]}
              />
            ))
          )}
        </ul>
      </div>

      {items.itemIds.length === 0 && <p className="no-file-open-msg">No file is opened</p>}

      <MarkdownArea/>
    </main>
  );
}

export default Menu;
