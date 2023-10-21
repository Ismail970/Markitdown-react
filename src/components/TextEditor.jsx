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

  return (
    <>
      <section
        className={`section-markdown ${!items.itemIds.length ? "section-markdown--hide" : ""} ${
          previewVisible ? "section-markdown__preview--show" : ""
        }`}
      >
        <header>
          <p>markdown</p>
          {!previewVisible && (
            <Button
              className={"section-markdown__btn-preview"}
              eventHandler={togglePreview}
              fontAwesomeIcon={faEye}
            />
          )}
        </header>

        <TextareaAutosize
          name="text"
          class="section-markdown__text"
          onChange={handleTextChange}
          value={items.itemContent[activeItemId]}
          ref={textAreaRef}
        />
      </section>

      <section
        className={`section-preview ${
          !previewVisible || !items.itemIds.length ? "section-preview--hide" : ""
        }`}
      >
        <header>
          <p>preview</p>
          {previewVisible && (
            <Button
              className={"section-preview__btn-preview"}
              eventHandler={togglePreview}
              fontAwesomeIcon={faEyeSlash}
            />
          )}
        </header>

        <div class="section-preview__text" ref={previewRef}>
          <ReactMarkdown>{markdownText}</ReactMarkdown>
        </div>
      </section>
    </>
  );
}

export default MarkdownArea;
