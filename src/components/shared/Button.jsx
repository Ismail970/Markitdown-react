import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

function Button({
  className,
  eventHandler,
  fontAwesomeIcon,
  fontAwesomeClassName = "",
  btnText,
}) {

  const {themeSwitched} = useContext(AppContext)

  return (
    <button className={className} onClick={eventHandler}>
      <FontAwesomeIcon icon={fontAwesomeIcon} className={`${fontAwesomeClassName} ${themeSwitched ? "fontAwesomeIcon--theme-dark" : ""}`} />
      {btnText && <p>{btnText}</p>}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  eventHandler: PropTypes.func,
  fontAwesomeIcon: PropTypes.object.isRequired,
  fontAwesomeClassName: PropTypes.string,
  btnText: PropTypes.string,
};

export default Button;
