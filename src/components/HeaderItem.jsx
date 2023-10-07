import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import AppContext from '../context/AppContext';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

function HeaderItem({id, active}) {

  const {itemTitles, isSaved, setIsSaved ,savedItemIds ,handleRemoveItem, handleItemClick, handleInputChange} = useContext(AppContext)

  // const [isSaved, setIsSaved] = useState(false)

  const onRemoveItem = () => {
    setIsSaved(savedItemIds.includes(id))

    if(!isSaved) {
      handleRemoveItem(id);
    } else {
      changeActiveItem(id)
    }
    // handleRemoveItem(id);
  };

  const onItemClick = () => {
    handleItemClick(id);
  };

  const onInputChange = (e) => {
    handleInputChange(e, id)
  }

  return (
    <>
      <li 
        className={`doc ${active ? 'active' : '' } ${isSaved ? 'hide' : ''}`} 
        data-id={id} 
        onClick={onItemClick}
      >

        <FontAwesomeIcon 
          icon={faFile} 
          className='doc-el'
        />

        <div className="doc-el">
          <textarea
            className='transparent-textarea'
            defaultValue={itemTitles[id]}
            onChange={onInputChange}
            rows="1"
            wrap="off"
            maxLength="19"
          ></textarea>

          <span>.md</span>
        </div>

        <button 
          className="remove-btn doc-el" 
          onClick={onRemoveItem}
        >
            <FontAwesomeIcon icon={faXmark} />
        </button>

      </li>

      {/* <li className="doc" data-id="2">

        <FontAwesomeIcon icon={faFile} className='doc-el'/>

        <div className="doc-el">
          <textarea
            className='transparent-textarea'
            value={title}
            onChange={onInputChange}
            rows="1"
            wrap="off"
            maxLength="19"
          ></textarea>

          <span>.md</span>
        </div>

        <button className="remove-btn doc-el">
            <FontAwesomeIcon icon={faXmark} />
        </button>

      </li>

      <li className="doc" data-id="3">

        <FontAwesomeIcon icon={faFile} className='doc-el'/>

        <div className="doc-el">
          <textarea
            className='transparent-textarea'
            value={title}
            onChange={onInputChange}
            rows="1"
            wrap="off"
            maxLength="19"
          ></textarea>

          <span>.md</span>
        </div>

        <button className="remove-btn doc-el">
            <FontAwesomeIcon icon={faXmark} />
        </button>

      </li> */}
    </>
  )
}

HeaderItem.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default HeaderItem
