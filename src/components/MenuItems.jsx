import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import { faFile} from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

function MenuItems({id, title}) {

  const {handleRemoveSavedItem, handleItemClick, setIsSaved, isSaved} = useContext(AppContext)

  const onRemoveItem = () => {
    handleRemoveSavedItem(id);
  };

  const onItemClick = () => {
    handleItemClick(id)

    // if (isSaved) {
    //   setIsSaved(false)
    // }
  };

  return (
    <>
        <li className="doc" data-id={id} onClick={onItemClick}>
          <div className="document">
            <FontAwesomeIcon icon={faFile} />
            <span id="file-name">{title}</span>
            <p>.md</p>
          </div>
          <div className="menu-file-btns">
            <button className="remove-btn" onClick={onRemoveItem}><FontAwesomeIcon icon={faXmark} /></button>
            <button className="download-btn"><FontAwesomeIcon icon={faFileArrowDown} /></button>
          </div>
        </li>

        {/* <li className="doc" data-id="2">
          <div className="document">
          <FontAwesomeIcon icon={faFile} />
            <span id="file-name" role="textbox">Untitledf22222</span>
            <p>.md</p>
          </div>
          <div className="menu-file-btns">
            <button className="remove-btn"><FontAwesomeIcon icon={faXmark} /></button>
            <button className="download-btn"><FontAwesomeIcon icon={faFileArrowDown} /></button>
          </div>
        </li>

        <li className="doc" data-id="3">
          <div className="document">
          <FontAwesomeIcon icon={faFile} />
            <span id="file-name" role="textbox">test</span>
            <p>.md</p>
          </div>
          <div className="menu-file-btns">
            <button className="remove-btn"><FontAwesomeIcon icon={faXmark} /></button>
            <button className="download-btn"><FontAwesomeIcon icon={faFileArrowDown} /></button>
          </div>
        </li> */}
    </>
  )
}

MenuItems.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default MenuItems
