import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import AppContext from "../context/AppContext";
import { useContext } from "react";
import PropTypes from "prop-types";

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
    <>
      <li className={`doc ${active ? "active" : ""}`} data-id={id}>
        <div className="doc-con" onClick={onItemClick}>
          <FontAwesomeIcon icon={faFile} className="doc-el" />

          <div className="doc-el">
            <textarea
              className="transparent-textarea"
              defaultValue={items.itemTitles[id]}
              onChange={onInputChange}
              rows="1"
              wrap="off"
              maxLength="19"
            ></textarea>

            <span>.md</span>
          </div>
        </div>

        <button className="remove-btn doc-el" onClick={onRemoveItem}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </li>
    </>
  );
}

HeaderItem.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default HeaderItem;
