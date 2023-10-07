import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import MenuItems from './MenuItems'
import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

function Menu() {

  const {savedItemIds,
        itemIds,
        itemTitles,
        menuVisible} = useContext(AppContext)

  const [previewVisible, setPreviewVisible] = useState(false);
  const [themeSwitched, setThemeSwitched] = useState(false);

  const togglePreview = () => {
    setPreviewVisible(!previewVisible);
  };

  const toggleTheme = () => {
    setThemeSwitched(!themeSwitched);
  };

  useEffect(() => {
    if (themeSwitched) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    // Cleanup: remove the class when the component unmounts
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, [themeSwitched]);
  
  return (
    <>
      <main>
        <div className={`menu ${menuVisible ? 'show' : ''}`}>
          <div>
            <p>Saved <span id="saved-num">{`(${savedItemIds.length})`}</span></p>
            <button className="theme-btn" onClick={toggleTheme}>
              <FontAwesomeIcon icon={themeSwitched ? faSun : faMoon} />
            </button>
          </div>
          <ul className="docs-nav">

            {savedItemIds.map((id) => (
                <MenuItems
                  key={id}
                  id={id}
                  title={itemTitles[id]}
                />
              ))}

          </ul>
        </div>
        <section className={`markdown ${!itemIds.length ? "hide" : ""}`} >
          <header>
            <p>markdown</p>
            <button className="preview-btn" onClick={togglePreview}><FontAwesomeIcon icon={faEye} /></button>
          </header>

          <textarea name="text" id="text"></textarea>
        </section>

        <section className={`preview ${!previewVisible ? "hide" : ""}`}>
          <header>
            <p>preview</p>
            <button className="preview-btn"><FontAwesomeIcon icon={faEyeSlash} /></button>
          </header>

          <div id="preview"></div>
        </section>
      </main>
    </>
  )
}

export default Menu
