import styles from "./footer.module.scss";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <div
      className={styles["express-footer-container"]}
      style={{ backgroundImage: 'url("/header-image.png")' }}
    >
      <div className={styles["express-footer"]}>
        <div className={styles["express-footer-links"]}>
          <Link to="/" className={styles["express-company-name"]}>
            AI Financial
          </Link>
          <ul>
            <li>
              <Link to="/help" className={styles["express-link-item"]}>
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/terms" className={styles["express-link-item"]}>
                Terms
              </Link>
            </li>
            <li>
              <Link to="/privacy" className={styles["express-link-item"]}>
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles["express-footer-social-media"]}>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/Myflashexpress/"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src="/facebook.png" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/yflashexpress"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src="/twitter.png" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/m.yflashexpress"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src="/Instagram.png" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/myflashexpress/"
                target="_blank"
                rel="noreferrer"
              >
                <img alt="" src="/linkedin.png" />
              </a>
            </li>
          </ul>
        </div>
        <div className={styles["express-footer-contact-line"]}>
          <p>
            Email Us:&nbsp;office@myAiFinancial.com &nbsp; | &nbsp; Tel:
            905-604-3511&nbsp; &nbsp;|&nbsp; &nbsp;139 Main St, Unit 106,
            Unionville, ON. L3R 2G6
          </p>
          <p>Copyright @ 2021 AI Financial</p>
        </div>
      </div>
    </div>
  );
}
