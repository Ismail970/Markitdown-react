import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import PropTypes from "prop-types";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useDownloadFile } from "react-downloadfile-hook";
import Button from "./shared/Button";

function MenuItems({ id, title }) {
  const {
    handleRemoveSavedItem,
    handleItemClick,
    handleAddItem,
    items,
    savedItems,
  } = useContext(AppContext);

  const fileName = `${savedItems.savedItemTitles[id]}.md`;
  const fileData = savedItems.savedItemContent[id];
  const { downloadFile } = useDownloadFile({
    fileName,
    format: "text/plain",
    data: fileData,
  });

  const truncatedTitle = title.length > 15 ? title.slice(0, 15) + "..." : title;

  const onRemoveItem = () => {
    handleRemoveSavedItem(id);
  };

  const onItemClick = () => {
    handleItemClick(id);

    if (!items.itemIds.includes(id)) {
      handleAddItem(id);
    }
  };

  return (
    <li className="doc" data-id={id}>
      <div className="document" onClick={onItemClick}>
        <FontAwesomeIcon icon={faFile} />
        <span id="file-name">{truncatedTitle}</span>
        <p>.md</p>
      </div>
      <div className="menu-file-btns">
        <Button
          className={"remove-btn"}
          eventHandler={onRemoveItem}
          fontAwesomeIcon={faXmark}
        />
        <Button
          className={"download-btn"}
          eventHandler={downloadFile}
          fontAwesomeIcon={faFileArrowDown}
        />
      </div>
    </li>
  );
}

MenuItems.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuItems;
