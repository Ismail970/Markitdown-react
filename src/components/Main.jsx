import { useContext, useRef } from "react";
import AppContext from "../context/AppContext";
import TextEditor from "./TextEditor";
import Menu from "./Menu";

function Main() {
  const { items } = useContext(AppContext);

  const fileInputRef = useRef(null)

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = () => {
    console.log("drop");
  };

  const handleDragOver = () => {
    e.preventDefault();
    console.log("dropover");
  };

  const handleFileInputChange = (e) => {
    // Handle the selected file when the file input changes.
    const file = e.target.files[0];
    // Perform any necessary actions with the selected file.
    console.log(file)
  };

  return (
    <main className="main">
      <Menu />

      {items.itemIds.length === 0 && (
        <p className="main__alert">No file is opened</p>
      )}

     {/* <button className="main__btn-input-drop" onDragOver={handleDragOver} onDrop={handleDrop}></button>

      <input
        type="file"
        accept=".md"
        onChange={handleFileInputChange}
        ref={fileInputRef}
        className="main__input-drop"
      />*/}

      <TextEditor />
    </main>
  );
}

export default Main;
