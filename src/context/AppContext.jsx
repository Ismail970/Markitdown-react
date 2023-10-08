import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [items, setItems] = useState({
    itemIds: [],
    itemTitles: {},
    itemContent: {},
  });
  const [savedItems, setSavedItems] = useState({
    savedItemIds: [],
    savedItemTitles: {},
    savedItemContent: {},
  });
  const [activeItemId, setActiveItemId] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleItemClick = (id) => {
    setActiveItemId(id);
  };

  const updateItemTitle = (id, content) => {
    setItems((prevItems) => ({
      ...prevItems,
      itemTitles: {
        ...prevItems.itemTitles,
        [id]: content,
      },
    }));
  };

  const handleInputChange = (e, id) => {
    // Update the title associated with the specific item ID
    updateItemTitle(id, e.target.value);
  };

  const handleRemoveItem = (idToRemove) => {
    setItems((prevItems) => ({
      ...prevItems,
      itemIds: prevItems.itemIds.filter((id) => id !== idToRemove),
    }));

    const indexOfActive = items.itemIds.indexOf(activeItemId);

    setActiveItemId((prev) => {
      if (prev === idToRemove) {
        return items.itemIds[
          indexOfActive === 0 ? indexOfActive + 1 : indexOfActive - 1
        ];
      } else {
        return items.itemIds[indexOfActive];
      }
    });
  };

  const handleAddItem = (id) => {
    setItems((prevItems) => ({
      ...prevItems,
      itemIds: [...prevItems.itemIds, id],
    }));
    setActiveItemId(id);
    updateItemTitle(id, `Untitled${id}`);
    handleUpdateItemContent(id, items.itemContent[id] || "");
  };

  const handleAddNewItem = () => {
    const newItemKey = uuidv4();
    handleAddItem(newItemKey);
  };

  const handleSaveItem = () => {
    if (!savedItems.savedItemIds.includes(activeItemId)) {
      setSavedItems((prevSavedItems) => ({
        ...prevSavedItems,
        savedItemIds: [...prevSavedItems.savedItemIds, activeItemId],
        savedItemTitles: {
          ...prevSavedItems.savedItemTitles,
          [activeItemId]: items.itemTitles[activeItemId],
        },
        savedItemContent: {
          ...prevSavedItems.savedItemContent,
          [activeItemId]: items.itemContent[activeItemId],
        },
      }));
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleRemoveSavedItem = (idToRemove) => {
    // Create a new array without the item to be removed
    const updatedSavedItemIds = savedItems.savedItemIds.filter(
      (id) => id !== idToRemove,
    );
    const updatedSavedItemTitles = savedItems.savedItemTitles.filter(
      (id) => id !== idToRemove,
    );
    const updatedSavedItemContent = savedItems.savedItemContent.filter(
      (id) => id !== idToRemove,
    );

    // Update the savedItemIds state with the new array
    setSavedItems((prevSavedItems) => ({
      ...prevSavedItems,
      savedItemIds: updatedSavedItemIds,
      savedItemTitles: updatedSavedItemTitles,
      savedItemContent: updatedSavedItemContent,
    }));
  };

  const handleUpdateItemContent = (id, content) => {
    setItems((prevItems) => ({
      ...prevItems,
      itemContent: {
        ...prevItems.itemContent,
        [id]: content,
      },
    }));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        savedItems,
        activeItemId,
        menuVisible,
        toggleMenu,
        handleAddNewItem,
        handleAddItem,
        handleItemClick,
        handleInputChange,
        handleRemoveItem,
        handleSaveItem,
        handleRemoveSavedItem,
        handleUpdateItemContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContext;
