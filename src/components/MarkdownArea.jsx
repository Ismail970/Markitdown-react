import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import ReactMarkdown from "react-markdown";
import Button from "./shared/Button";
import TextareaAutosize from "react-textarea-autosize";

function MarkdownArea() {
  const {
    items,
    activeItemId,
    handleTextChange,
    togglePreview,
    previewVisible,
    markdownText,
  } = useContext(AppContext);

  return (
    <>
      <section
        className={`markdown ${!items.itemIds.length ? "hide" : ""} ${
          previewVisible ? "show-preview" : ""
        }`}
      >
        <header>
          <p>markdown</p>
          {!previewVisible && (
            <Button
              className={"preview-btn"}
              eventHandler={togglePreview}
              fontAwesomeIcon={faEye}
            />
          )}
        </header>
        
        <TextareaAutosize
          name="text"
          id="text"
          onChange={handleTextChange}
          value={items.itemContent[activeItemId]}
        />
      </section>

      <section
        className={`preview ${
          !previewVisible || !items.itemIds.length ? "hide" : ""
        }`}
      >
        <header>
          <p>preview</p>
          {previewVisible && (
            <Button
              className={"preview-btn"}
              eventHandler={togglePreview}
              fontAwesomeIcon={faEyeSlash}
            />
          )}
        </header>

        <div id="preview">
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </section>
    </>
  );
}

export default MarkdownArea;
