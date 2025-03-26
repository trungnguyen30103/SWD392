import "./index.css";
// eslint-disable-next-line react/prop-types
function Container({ children }) {
  return (
    <div className="container-main"
    >
      {children}
    </div>
  );
}

export default Container;
