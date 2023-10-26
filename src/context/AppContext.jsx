import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
import { useLocalStorage } from "@uidotdev/usehooks";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, saveState] = useLocalStorage("state", null);

  const initialState = state || {
    items: {
      itemIds: [],
      itemTitles: {},
      itemContent: {},
    },
    savedItems: {
      savedItemIds: [],
      savedItemTitles: {},
      savedItemContent: {},
    },
    activeItemId: null,
    menuVisible: false,
    previewVisible: false,
    themeSwitched: false,
  };

  const [items, setItems] = useState(initialState.items);
  const [savedItems, setSavedItems] = useState(initialState.savedItems);
  const [activeItemId, setActiveItemId] = useState(initialState.activeItemId);
  const [menuVisible, setMenuVisible] = useState(initialState.menuVisible);
  const [previewVisible, setPreviewVisible] = useState(
    initialState.previewVisible,
  );
  const [themeSwitched, setThemeSwitched] = useState(
    initialState.themeSwitched,
  );
  const [markdownText, setMarkdownText] = useState("");
  const [buttonText, setButtonText] = useState("Save File");

  // Save data to local storage whenever the component states change
  useEffect(() => {
    saveState({
      items,
      savedItems,
      activeItemId,
      menuVisible,
      previewVisible,
      themeSwitched,
    });
  }, [
    items,
    savedItems,
    activeItemId,
    menuVisible,
    previewVisible,
    themeSwitched,
  ]);

  useEffect(() => {
    // Check if it's the user's first visit
    const isFirstVisit = !localStorage.getItem("firstVisit");

    if (isFirstVisit) {
      // Perform actions for the first visit
      const newItemKey = uuidv4();

      // Add the new item with the "New Title" and "Hi" content
      handleAddItem(newItemKey);

      const welcomeContent = `# Hi! ✨ \n Welcome to MarkItDown add a file to start!`;
      const welcomeTitle = `Welcome! ✨`;

      // Set the title for the newly added item
      setItems((prevItems) => ({
        ...prevItems,
        itemTitles: {
          ...prevItems.itemTitles,
          [newItemKey]: welcomeTitle,
        },
        itemContent: {
          ...prevItems.itemContent,
          [newItemKey]: welcomeContent,
        },
      }));

      setSavedItems((prevSavedItems) => ({
        ...prevSavedItems,
        savedItemIds: [...prevSavedItems.savedItemIds, newItemKey],
        savedItemTitles: {
          ...prevSavedItems.savedItemTitles,
          [newItemKey]: welcomeTitle,
        },
        savedItemContent: {
          ...prevSavedItems.savedItemContent,
          [newItemKey]: welcomeContent,
        },
      }));

      setPreviewVisible(true);

      // Set a flag in local storage to indicate that the user has visited
      localStorage.setItem("firstVisit", "false");
    }
  }, []);

  // For dev
  // window.localStorage.clear();

  useEffect(() => {
    // Initialize the content based on the active item when the component mounts
    setMarkdownText(items.itemContent[activeItemId] || "");
    setButtonText("Save File");
  }, [activeItemId]);

  const handleTextChange = (e) => {
    setMarkdownText(e.target.value);

    setItems((prevItems) => ({
      ...prevItems,
      itemContent: {
        ...prevItems.itemContent,
        [activeItemId]: e.target.value || "",
      },
    }));

    // Update the savedItems with the new content
    setSavedItems((prevSavedItems) => ({
      ...prevSavedItems,
      savedItemContent: {
        ...prevSavedItems.savedItemContent,
        [activeItemId]: e.target.value,
      },
    }));
  };

  const scrollToEnd = (el, direction) => {
    const options = {
      behavior: "smooth",
    };

    if (direction === "left") {
      options.left = el.scrollWidth;
    } else if (direction === "bottom") {
      options.top = el.scrollHeight;
    }

    el.scroll(options);
  };

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

    setItems((prevItems) => ({
      ...prevItems,
      itemContent: {
        ...prevItems.itemContent,
        [id]: items.itemContent[id] || "",
      },
    }));
  };

  const handleAddNewItem = () => {
    const newItemKey = uuidv4();
    handleAddItem(newItemKey);
  };

  const handleSaveItem = () => {
    if (savedItems.savedItemIds.includes(activeItemId)) {
      // Item is already saved, show "Already saved" temporarily
      setButtonText("Already Saved!");

      setTimeout(() => {
        // After 5 seconds, revert back to "Save file"
        setButtonText("Save File");
      }, 2000);
    } else {
      // Item is not saved, save it
      if (items.itemIds.length !== 0) {
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
    }
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

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
  };

  const toggleTheme = () => {
    setThemeSwitched(!themeSwitched);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        savedItems,
        activeItemId,
        menuVisible,
        previewVisible,
        themeSwitched,
        markdownText,
        buttonText,
        toggleMenu,
        toggleTheme,
        togglePreview,
        handleAddNewItem,
        handleAddItem,
        handleItemClick,
        handleInputChange,
        handleRemoveItem,
        handleSaveItem,
        handleRemoveSavedItem,
        handleTextChange,
        scrollToEnd,
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
