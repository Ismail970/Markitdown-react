import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Button({
  className,
  eventHandler,
  fontAwesomeIcon,
  fontAwesomeClassName = "",
  btnText,
}) {
  return (
    <button className={className} onClick={eventHandler}>
      <FontAwesomeIcon icon={fontAwesomeIcon} className={fontAwesomeClassName} />
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
