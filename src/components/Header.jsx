import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import HeaderItem from "./HeaderItem";
import { useContext } from "react";
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

  return (
    <header className="header">
      <div>
        <Button
          className={'menu-btn menu-btn-mode'}
          eventHandler={toggleMenu}
          fontAwesomeIcon={faBars}
          fontAwesomeClassName="btn-icon"
        />
        <nav>
          <ul className="docs-nav">
            {items.itemIds.map((id) => (
              <HeaderItem key={id} id={id} active={id === activeItemId} />
            ))}

            <li>
              <Button
                className={"add-btn"}
                eventHandler={handleAddNewItem}
                fontAwesomeIcon={faPlus}
              />
            </li>
          </ul>
        </nav>
      </div>

      <Button
        className={"save-btn"}
        eventHandler={handleSaveItem}
        fontAwesomeIcon={faFloppyDisk}
        btnText={buttonText}
      />
    </header>
  );
}

export default Header;
