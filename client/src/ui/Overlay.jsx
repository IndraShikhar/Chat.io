import PropTypes from "prop-types";

Overlay.propTypes = {
  children: PropTypes.node,
};

function Overlay({ children }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur z-50">
        {children}
      </div>
    </>
  );
}

export default Overlay;
