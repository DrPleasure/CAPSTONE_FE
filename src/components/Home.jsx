import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Events from "./Events";
import Footer from "./Footer";
import Navbartop from "./Navbartop";
import Balls from "./Balls";
import Jumbotroner from "./Jumbotroner";
import "./Home.css";

const ballImages = require.context("../assets", false, /\.(jpg|png)$/);

const ball1 = ballImages("./ball1.png");
const ball2 = ballImages("./ball2.png");
const ball3 = ballImages("./ball3.png");
const ball4 = ballImages("./ball4.png");
const ball5 = ballImages("./ball5.png");
const ball6 = ballImages("./ball6.png");

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showHome, setShowHome] = useState(false);
  const [balls, setBalls] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const ballImages = [ball1, ball2, ball3, ball4, ball5, ball6];

    const newBalls = [];
    for (let i = 0; i < 100; i++) {
      const randomImage =
        ballImages[Math.floor(Math.random() * ballImages.length)];
      const ball = {
        x: Math.random() * (window.innerWidth - 50),
        y: Math.random() * (window.innerHeight - 50),
        speedX: Math.random() * 6 - 3,
        speedY: Math.random() * 6 - 3,

        image: randomImage,
      };
      newBalls.push(ball);
    }
    setBalls(newBalls.map((ball) => ({ ...ball, Component: Balls })));
  }, [isFirstLoad]);

  useEffect(() => {
    if (isFirstLoad) {
      const interval = setInterval(() => {
        setBalls((prevBalls) =>
          prevBalls.map((ball) => {
            const nextX = ball.x + ball.speedX;
            const nextY = ball.y + ball.speedY;
            const ballWidth = 50; // replace this with the actual width of your ball image
            const ballHeight = 50; // replace this with the actual height of your ball image

            if (nextX < 0 || nextX + ballWidth > window.innerWidth) {
              return { ...ball, speedX: -ball.speedX };
            }

            if (nextY < 0 || nextY + ballHeight > window.innerHeight) {
              return { ...ball, speedY: -ball.speedY };
            }

            return { ...ball, x: nextX, y: nextY };
          })
        );
      }, 50); // move balls every 50 milliseconds

      const timeout = setTimeout(() => {
        setShowHome(true);
        clearInterval(interval);
        setLoading(false);
        setIsFirstLoad(false);
      }, 3000); // delay for 3 seconds

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [isFirstLoad]);

  if (loading && !showHome) {
    return (
      <div
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundColor: "#222",
          zIndex: 999,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {balls.map((ball, index) => {
            const Component = ball.Component;
            return (
              <Component key={index} x={ball.x} y={ball.y} image={ball.image} />
            );
          })}
        </div>
      </div>
    );
  }

 

  return (
    <>
      <div>
        <Navbartop />
      </div>
      <div>
        <Jumbotroner />
      </div>
      {showHome && (
        <div className="mainContainer d-flex justify-content-center">
          <Events />
        </div>
      )}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {balls.map((ball, index) => {
          const Component = ball.Component;
          return <Component key={index} x={ball.x} y={ball.y} />;
        })}
      </div>
      {showHome && (
        <div >
          <Footer />
        </div>
      )}
    </>
  );
};
export default Home;
