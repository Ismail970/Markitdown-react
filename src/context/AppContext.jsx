import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [itemIds, setItemIds] = useState([]);
  const [savedItemIds, setSavedItemIds] = useState([]);
  const [activeItemId, setActiveItemId] = useState(null);
  const [itemTitles, setItemTitles] = useState({});
  const [menuVisible, setMenuVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false)

  const handleItemClick = (id) => {
    setActiveItemId(id);
  };

  const updateItemTitle = (id, content) => {
    setItemTitles((prevItemTitles) => ({
      ...prevItemTitles,
      [id]: content,
    }));
  };

  const handleInputChange = (e, id) => {
    // Update the title associated with the specific item ID
    updateItemTitle(id, e.target.value)
  }

  const changeActiveItem = (id) => {
    // Find the index of the current active item
    const indexOfActive = itemIds.indexOf(activeItemId);
 
    setActiveItemId(
      // If the deleted item was the active item, update activeItemId accordingly
      activeItemId === id ?
        // If the active item is not in the updatedIds array, or it's the first item, set activeItemId to the next item; otherwise, set it to the previous item
        indexOfActive === -1 || indexOfActive === 0 
        ? itemIds[indexOfActive + 1] 
        : itemIds[indexOfActive - 1]
      : itemIds[indexOfActive]
    );
  }

  // const handleRemoveItem = (idToRemove) => {
  //   setItemIds((prevIds) => {
  //     const updatedIds = prevIds.filter((id) => id !== idToRemove);
  
  //     // Find the index of the current active item
  //     changeActiveItem(idToRemove)

  //     return updatedIds;
  //   });
  // };

  const handleRemoveItem = (idToRemove) => {
    setIsSaved(savedItemIds.includes(idToRemove))

    if(!isSaved) {
      setItemIds((prevIds) => {
        const updatedIds = prevIds.filter((id) => id !== idToRemove);
    
        // Find the index of the current active item
        changeActiveItem(idToRemove)
        console.log("456")
  
        return updatedIds;
      })
    } else {
      changeActiveItem(idToRemove)
    }
  };

  const handleAddItem = () => {
    const newItemKey = uuidv4();
    setItemIds((prevIds) => [...prevIds, newItemKey]);
    setActiveItemId(newItemKey);
    updateItemTitle(newItemKey, `Untitled${newItemKey}`)
  };

  const handleSaveItem = () => {
    if (activeItemId && !savedItemIds.includes(activeItemId)) {
      setSavedItemIds((prevSavedItemIds) => [...prevSavedItemIds, activeItemId]);
    }
  };  
  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleRemoveSavedItem = (idToRemove) => {
    // Create a new array without the item to be removed
    const updatedSavedItemIds = savedItemIds.filter((id) => id !== idToRemove);
  
    // Update the savedItemIds state with the new array
    // This will effectively remove the item from the savedItemIds
    setSavedItemIds(updatedSavedItemIds);
  };

  return (
    <AppContext.Provider value={{
      itemIds,
      savedItemIds,
      activeItemId,
      menuVisible,
      itemTitles,
      isSaved,
      setIsSaved,
      handleAddItem,
      handleItemClick,
      handleInputChange,
      handleRemoveItem,
      handleSaveItem,
      toggleMenu,
      handleRemoveSavedItem,
      changeActiveItem,
    }}>
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext