import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import HeaderItem from "./HeaderItem";
import { useContext } from "react";
import AppContext from "../context/AppContext";

function Header() {
  const { items, activeItemId, toggleMenu, handleSaveItem, handleAddNewItem } =
    useContext(AppContext);

  return (
    <>
      <header className="header">
        <div>
          <button className="menu-btn" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} className="btn-icon" />
          </button>
          <nav>
            <ul className="docs-nav">
              {items.itemIds.map((id) => (
                <HeaderItem key={id} id={id} active={id === activeItemId} />
              ))}

              <li>
                <button className="add-btn" onClick={handleAddNewItem}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <button className="save-btn" onClick={handleSaveItem}>
          <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
      </header>
    </>
  );
}

export default Header;
