import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useRef } from "react";
import AppContext from "../context/AppContext";
import ReactMarkdown from "react-markdown";
import Button from "./shared/Button";
import TextareaAutosize from "react-textarea-autosize";
import { throttle } from "lodash";

function MarkdownArea() {
  const {
    items,
    activeItemId,
    handleTextChange,
    togglePreview,
    previewVisible,
    markdownText,
    menuVisible,
    toggleMenu,
  } = useContext(AppContext);

  const textAreaRef = useRef(null);
  const previewRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.focus();
  }, [activeItemId]);

  const handleScroll = (source, target) => {
    return () => {
      const sourceElement = source.current;
      const targetElement = target.current;

      const percentageScrolled =
        (sourceElement.scrollTop /
          (sourceElement.scrollHeight - sourceElement.clientHeight)) *
        100;

      // Calculate the corresponding scroll position in the target element
      const scrollPosition = Math.round(
        (targetElement.scrollHeight - targetElement.clientHeight) *
          (percentageScrolled / 100),
      );

      // Update the scroll position of the target element
      targetElement.scrollTop = scrollPosition;
    };
  };

  // Synchronize scroll positions between textarea and preview div
  useEffect(() => {
    const textArea = textAreaRef.current;
    const preview = previewRef.current;

    const handleTextAreaScroll = handleScroll(textAreaRef, previewRef);
    const handlePreviewScroll = handleScroll(previewRef, textAreaRef);
    const throttledHandleTextAreaScroll = throttle(handleTextAreaScroll, 100);
    const throttledHandlePreviewScroll = throttle(handlePreviewScroll, 100);

    // Attach the scroll event listeners to both the textarea and preview div
    textArea.addEventListener("scroll", throttledHandleTextAreaScroll);
    preview.addEventListener("scroll", throttledHandlePreviewScroll);

    // Clean up the event listeners when the component unmounts
    return () => {
      textArea.removeEventListener("scroll", throttledHandleTextAreaScroll);
      preview.removeEventListener("scroll", throttledHandlePreviewScroll);
    };
  }, []);

  const toggleOverlay = () => {
    if (menuVisible) {
      toggleMenu();
    }
  };

  return (
    <div
      className={`editor ${menuVisible ? "editor--overlay" : ""}`}
      onClick={toggleOverlay}
    >
      <section
        className={`editor__section-markdown ${
          !items.itemIds.length ? "editor__section--hide" : ""
        } ${previewVisible ? "editor__section-markdown--preview-visible" : ""}`}
      >
        <header>
          <p>markdown</p>
          {!previewVisible && (
            <Button
              className={"editor__section-btn-preview"}
              eventHandler={togglePreview}
              fontAwesomeIcon={faEye}
            />
          )}
        </header>

        <TextareaAutosize
          name="text"
          className="editor__section-text"
          onChange={handleTextChange}
          value={items.itemContent[activeItemId]}
          ref={textAreaRef}
        />
      </section>

      <section
        className={`editor__section-preview ${
          !previewVisible || !items.itemIds.length
            ? "editor__section--hide"
            : ""
        }`}
      >
        <header>
          <p>preview</p>
          {previewVisible && (
            <Button
              className={"editor__section-btn-preview"}
              eventHandler={togglePreview}
              fontAwesomeIcon={faEyeSlash}
            />
          )}
        </header>

        <div className="editor__section--text" ref={previewRef}>
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </section>
    </div>
  );
}

export default MarkdownArea;
