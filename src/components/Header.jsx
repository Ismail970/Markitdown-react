import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import HeaderItem from "./HeaderItem";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import Button from "./shared/Button";

function Header() {
  const {
    items,
    activeItemId,
    buttonText,
    toggleMenu,
    handleSaveItem,
    handleAddNewItem,
  } = useContext(AppContext);

  useEffect(() => {
    document.querySelector(".list-item--active")?.scrollIntoView({behavior : "smooth"})
  }, [activeItemId])


  return (
    <header className="header">
      <div className="header__container">
        <Button
          className={"header__btn-menu"}
          eventHandler={toggleMenu}
          fontAwesomeIcon={faBars}
          fontAwesomeClassName="btn-menu-icon"
        />
        <nav>
          <ul className="header__nav-items">
            {items.itemIds.map((id) => (
              <HeaderItem key={id} id={id} active={id === activeItemId} />
            ))}
          </ul>
        </nav>
      </div>

      <div className="header__btns-container">
        <Button
          className="header__btn-add"
          eventHandler={handleAddNewItem}
          fontAwesomeIcon={faPlus}
        />
        <Button
          className={"header__btn-save"}
          eventHandler={handleSaveItem}
          fontAwesomeIcon={faFloppyDisk}
          btnText={buttonText}
        />
      </div>
    </header>
  );
}

export default Header;
