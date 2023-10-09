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

  const handleInputChange = (e, id) => {
    const newTitle = e.target.value;

    // Update the title associated with the specific item ID
    setItems((prevItems) => ({
      ...prevItems,
      itemTitles: {
        ...prevItems.itemTitles,
        [id]: newTitle,
      },
    }));

    // Update the savedItems with the new title
    setSavedItems((prevSavedItems) => ({
      ...prevSavedItems,
      savedItemTitles: {
        ...prevSavedItems.savedItemTitles,
        [activeItemId]: newTitle,
      },
    }));
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
      itemTitles: {
        ...prevItems.itemTitles,
        [id]: savedItems.savedItemIds.includes(id)
          ? savedItems.savedItemTitles[id]
          : `Untitled${id}`,
      },
    }));
    setActiveItemId(id);
    handleUpdateItemContent(id, items.itemContent[id] || "");
  };

  const handleAddNewItem = () => {
    const newItemKey = uuidv4();
    handleAddItem(newItemKey);
  };

  const handleSaveItem = () => {
    setSavedItems((prevSavedItems) => ({
      ...prevSavedItems,
      savedItemIds: prevSavedItems.savedItemIds.includes(activeItemId)
        ? prevSavedItems.savedItemIds // Item already saved, no need to change/add
        : [...prevSavedItems.savedItemIds, activeItemId],
      savedItemTitles: {
        ...prevSavedItems.savedItemTitles,
        [activeItemId]: items.itemTitles[activeItemId],
      },
      savedItemContent: {
        ...prevSavedItems.savedItemContent,
        [activeItemId]: items.itemContent[activeItemId],
      },
    }));
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleRemoveSavedItem = (idToRemove) => {
    const removeFromObject = (ob) => {
      return Object.fromEntries(
        Object.entries(ob).filter(([key]) => key !== idToRemove),
      );
    };

    setSavedItems((prevSavedItems) => ({
      ...prevSavedItems,
      savedItemIds: prevSavedItems.savedItemIds.filter(
        (id) => id !== idToRemove,
      ),
      savedItemTitles: removeFromObject(prevSavedItems.savedItemTitles),
      savedItemContent: removeFromObject(prevSavedItems.savedItemContent),
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

    // Update the savedItems with the new content
    setSavedItems((prevSavedItems) => ({
      ...prevSavedItems,
      savedItemContent: {
        ...prevSavedItems.savedItemContent,
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
