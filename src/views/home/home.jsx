import Header from "../common/header";
import Footer from "../common/footer";
import styles from "./home.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getSessionUserIno } from "../common/local-storage";
import LoginWindow from "../common/login-window";

function HeaderBackground() {
  return (
    <div
      className={styles["express-header-background"]}
      style={{ backgroundImage: 'url("/header-image.png")' }}
    ></div>
  );
}

function Advertise() {
  return (
    <div className={styles["express-advertise-container"]}>
      <div className={styles["express-advertise"]}>
        <div className={styles["express-advertise-left"]}>
          <h2 className={styles["express-adv-title"]}>
            One hour express flash delivery
          </h2>
          <h4 className={styles["express-adv-text"]}>
            24/7 customer service and consumer protection, Enjoy delivery like
            never before!
          </h4>
          <Link to="/place-order" className={styles["express-adv-button-link"]}>
            <button className={styles["express-adv-button"]}>
              Place Order
            </button>
          </Link>
        </div>
        <div className={styles["express-advertise-right"]}>
          <img
            alt=""
            src="/app-show.png"
            className={styles["express-adv-img"]}
          />
        </div>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div className={styles["express-aboutus"]}>
      <h3>ABOUT US</h3>
      <p>
        My flash express is a comprehensive delivery platform. Our simple,
        innovative solution aims to create a more connected world, changing the
        way we think about delivery. We do this by offering a lightweight
        solution, connecting consumers, drivers, and merchants alike. Make
        orders from a variety of different platforms and transport packages of
        your choosing. Fast, cheap, and customized: for your delivery needs.
      </p>
      <ul>
        <li>
          <img alt="" src="/icon_01.jpg" />
          <h5>Price-efficient</h5>
        </li>
        <li>
          <img alt="" src="/icon_01.jpg" />
          <h5>Customized delivery</h5>
        </li>
        <li>
          <img alt="" src="/icon_01.jpg" />
          <h5>Customer supported</h5>
        </li>
        <li>
          <img alt="" src="/icon_01.jpg" />
          <h5>No platform restrictions</h5>
        </li>
        <li>
          <img alt="" src="/icon_01.jpg" />
          <h5>Large coverage</h5>
        </li>
      </ul>
    </div>
  );
}

function Services() {
  const [disabled, setDisabled] = useState(true);

  const handleButtonClick = () => {
    setDisabled(!disabled);
  };

  return (
    <div className={styles["express-services"]}>
      <img
        alt=""
        src="home-serivics-img.png"
        className={styles["express-services-img"]}
      />
      <div className={styles["express-services-header"]}>
        <h2>SERVICES</h2>
        <h4>
          We offer a variety of delivery services to suit every need. Users can
          receive orders or have their items delivered between any
          establishments within the city. Simply pre-pay for your order (or
          prepare your package for merchants), select the pickup and drop off
          point, and choose a delivery option.
        </h4>
        <button>Learn More</button>
      </div>
      <div className={styles["express-services-list"]}>
        <div className={styles["express-services-list-carousel"]}>
          <div className={styles["express-services-slider-control"]}>
            <button disabled={disabled} onClick={handleButtonClick}>
              <img alt="" src="/arrow-left.png"></img>
            </button>
            <button disabled={!disabled} onClick={handleButtonClick}>
              <img alt="" src="/arrow-right.png"></img>
            </button>
          </div>
          <ul className={styles["express-services-slider-ul"]}>
            <li
              className={styles["express-services-slider-li"]}
              style={{ display: disabled ? "list-item" : "none" }}
            >
              <div className={styles["express-services-slider-inner"]}>
                <div className={styles["express-services-slider-header"]}>
                  <h3>Flash Delivery</h3>
                  <img alt="" src="/service1.jpg" />
                </div>
                <p>
                  Our premium service is made for your fast lifestyle. Merchants
                  and consumers are able to transport/receive their orders
                  within the hour. Perfect for lunchtime rushes or last-minute
                  gifts
                </p>
                <h4>
                  Place you order &amp; delivery will arrive within the hour
                  with a 60KM radius restriction
                </h4>
              </div>
            </li>
            <li className={styles["express-services-slider-li"]}>
              <div className={styles["express-services-slider-inner"]}>
                <div className={styles["express-services-slider-header"]}>
                  <h3>Standard Delivery</h3>
                  <img alt="" src="/service2.gif" />
                </div>
                <p>
                  Our standard service allows you to get the job done while
                  catering to your wallet. Users can transport orders within the
                  day, at an extremely affordable rate. Make the deliveries you
                  want without breaking the bank.
                </p>
                <h4>
                  Orders will be delivered within the same day if placed before
                  3:00 PM with a 100KM radius
                </h4>
              </div>
            </li>
            <li
              className={styles["express-services-slider-li"]}
              style={{ display: disabled ? "none" : "list-item" }}
            >
              <div className={styles["express-services-slider-inner"]}>
                <div className={styles["express-services-slider-header"]}>
                  <h3>Custom Delivery</h3>
                  <img alt="" src="/service1.jpg" />
                </div>
                <p>
                  Our customized service is made specifically for you. Set the
                  parameters around the order you need, and receive the service
                  you expect. Orders that can be delivered within the same day
                  will receive top priority. Orders which require overnight
                  storage will be handled carefully and utilize any instructions
                  provided.
                </p>
                <h4>Delivery time and location are completely customizable.</h4>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Drive() {
  return (
    <div className={styles["express-drive"]}>
      <div className={styles["express-drive-left"]}>
        <div className={styles["express-drive-left-first-column"]}>
          <div className={styles["column-blue-card"]}>
            <img alt="" src="/drive-icon2.png" />
            <h3>Competitive pay</h3>
            <p>
              We offer fast, clear, and competitive pay for our drivers. You
              earn 80% of the fee we change, directly deposited into your
              account. No hidden fees and full transparency!
            </p>
          </div>
          <div className={styles["column-feature-card"]}>
            <img alt="" src="/drive-icon1.png" />
            <h3>Team spirit</h3>
            <p>
              When you drive for my flash express, you are part of the team.
              We’re constantly looking for ways to improve your experience and
              help you succeed.
            </p>
          </div>
        </div>
        <div className={styles["express-drive-left-second-column"]}>
          <div
            className={`${styles["column-feature-card"]} ${styles["common-column-feature-card"]}`}
          >
            <img alt="" src="/drive-icon4.png" />
            <h3>Simple application</h3>
            <p>
              Fill in a few forms, wait to get approved, and drive from the same
              platform which you order! Our platform and process is simple, and
              made with you in mind.
            </p>
          </div>
          <div className={styles["column-blue-card"]}>
            <img alt="" src="/drive-icon3.png" />
            <h3>Your schedule</h3>
            <p>
              Set your own schedule, drive when you want, and earn how much
              you'd like. Be your own boss while being supported by a great
              team.
            </p>
          </div>
        </div>
      </div>
      <div className={styles["express-drive-right"]}>
        <img alt="" src="/undraw_shared_goals.png" />
        <h2>DRIVE</h2>
        <h4>Standard Delivery:</h4>
        <p>
          Drive with us! Make some extra money on your way to the supermarket or
          set a schedule and be your own boss. Make full use of your vehicle
          with my flash express.
        </p>
      </div>
    </div>
  );
}

function UserDownload() {
  return (
    <div className={styles["express-user-download-container"]}>
      <img
        className={styles["express-user-download-background"]}
        alt=""
        src="/layer-right-bg.png"
      />
      <div className={styles["express-user-download"]}>
        <div className={styles["express-user-download-left"]}>
          <h2>USER DOWNLOAD</h2>
          <a className={styles["download-btn"]} href=" ">
            <img
              className={styles["download-btn-normal"]}
              alt=""
              src="/apple_store_icon.png"
            />
            <img
              className={styles["download-btn-hover"]}
              alt=""
              src="/apple_store_icon_hover.png"
            />
            <span>APP STORE</span>
          </a>
          <a className={styles["download-btn"]} href=" ">
            <img
              className={styles["download-btn-normal"]}
              alt=""
              src="/android.png"
            />
            <img
              className={styles["download-btn-hover"]}
              alt=""
              src="/android-hover.png"
            />
            <span>ANDROID</span>
          </a>
          <a className={styles["download-btn"]} href=" ">
            <img
              className={styles["download-btn-normal"]}
              alt=""
              src="/weixinxiaochengxu.png"
            />
            <img
              className={styles["download-btn-hover"]}
              alt=""
              src="/weixinxiaochengxu-hover.png"
            />
            <span>MINI PROGRAM</span>
          </a>
        </div>
        <div className={styles["express-user-download-right"]}>
          <h2>PARTNER</h2>
          <p>
            Let’s be friends! Partnerships open up more opportunities for your
            business. Let us help you with advertising, and driving more traffic
            to your organization.
          </p>
          <ul>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
            <li></li>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
            <li>
              <img alt="" src="/SnapPay.png" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [username, setUsername] = useState("");
  const sessionUsername = getSessionUserIno();
  console.log("enter Products ");

  useEffect(() => {
    if (sessionUsername !== "") {
      console.log("home useEffect sessionUsername: ", sessionUsername);
      setUsername(sessionUsername);
    }
  }, [sessionUsername]);

  return (
    <div>
      <HeaderBackground />
      <Header curUsername={username} />
      {username === "" && <LoginWindow setCurUsername={setUsername} />}
      <Advertise />
      <AboutUs />
      <Services />
      <Drive />
      <UserDownload />
      <Footer />
    </div>
  );
}

export default Home;
