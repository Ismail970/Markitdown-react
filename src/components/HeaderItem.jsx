import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "./shared/Button";

function HeaderItem({ id, active }) {
  const { items, handleRemoveItem, handleItemClick, handleInputChange } =
    useContext(AppContext);

  const onRemoveItem = () => {
    handleRemoveItem(id);
  };

  const onItemClick = () => {
    handleItemClick(id);
  };

  const onInputChange = (e) => {
    handleInputChange(e, id);
  };

  return (
    <li className={`list-item ${active ? "list-item--active" : ""}`}>
      <div className="list-item__container" onClick={onItemClick}>
        <FontAwesomeIcon icon={faFile} />

        <div className="list-item__title">
          <textarea
            className="list-item__textarea"
            defaultValue={items.itemTitles[id]}
            onChange={onInputChange}
            rows="1"
            wrap="off"
            maxLength="19"
          ></textarea>

          <span>.md</span>
        </div>
      </div>

      <Button
        className={"list-item__btn-remove"}
        eventHandler={onRemoveItem}
        fontAwesomeIcon={faXmark}
      />
    </li>
  );
}

HeaderItem.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default HeaderItem;
