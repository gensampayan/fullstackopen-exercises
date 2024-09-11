import { useState, forwardRef } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <div ref={ref}>
      <div style={hideWhenVisible} className="hide">
        <button onClick={toggleVisibility}>{props.buttonHideLabel}</button>
      </div>
      <div style={showWhenVisible} className="show">
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonShowLabel}</button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonHideLabel: PropTypes.string.isRequired,
  buttonShowLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Togglable;
