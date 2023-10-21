import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import MenuItem from "./MenuItem";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import Button from "./shared/Button";

function Menu() {
  const { savedItems, menuVisible, toggleTheme, themeSwitched } =
    useContext(AppContext);

  useEffect(() => {
    if (themeSwitched) {
      document.body.classList.add("body--theme-dark");
    } else {
      document.body.classList.remove("body--theme-dark");
    }

    // Cleanup: remove the class when the component unmounts
    return () => {
      document.body.classList.remove("body--theme-dark");
    };
  }, [themeSwitched]);

  return (
    <div className={`menu ${menuVisible ? "menu--show" : ""}`}>
      <div className="menu__header">
        <p>
          Saved
          <span id="menu__items-num">{` (${savedItems.savedItemIds.length})`}</span>
        </p>
        <Button
          className={"menu__btn-theme-switch"}
          eventHandler={toggleTheme}
          fontAwesomeIcon={themeSwitched ? faSun : faMoon}
        />
      </div>
      <ul className="menu__list-items">
        {savedItems.savedItemIds.length === 0 ? (
          <p className="menu__list-alert">No file is saved</p>
        ) : (
          savedItems.savedItemIds.map((id) => (
            <MenuItem key={id} id={id} title={savedItems.savedItemTitles[id]} />
          ))
        )}
      </ul>
    </div>
  );
}

export default Menu;
