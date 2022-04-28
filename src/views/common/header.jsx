import styles from "./header.module.scss";
import { Link, withRouter } from "react-router-dom";

function Header(props) {
  const currentPath = props.match.path;

  let element = (
    <ul
      className={
        currentPath !== "/" ? "express-navigation white" : "express-navigation"
      }
    >
      <li className="express-navi-item">
        <Link to="/" className="express-navi-item-link">
          HOME
        </Link>
      </li>
      <li className="express-navi-item">
        <Link to="/products" className="express-navi-item-link">
          PRODUCTS
        </Link>
      </li>
      <li className="express-navi-item">
        <Link to="/inventory" className="express-navi-item-link">
          INVENTORY
        </Link>
      </li>
      <li className="express-navi-item">
        {props.curUsername === "" ? (
          <div className="express-navi-item-link">LOGIN</div>
        ) : (
          <div className="express-navi-item-link"> {props.curUsername}</div>
        )}
      </li>
    </ul>
  );

  return (
    <div className={styles["express-header-container"]}>
      <div className="express-header">
        <div className="express-header-left">
          <div
            className="express-logo"
            style={{ backgroundImage: 'url("/logo.png")' }}
          ></div>
          <h2
            className={
              currentPath !== "/"
                ? "express-logo-text white"
                : "express-logo-text"
            }
          >
            AI Financial
          </h2>
        </div>
        <div className="express-header-right">{element}</div>
      </div>
    </div>
  );
}

export default withRouter(Header);
