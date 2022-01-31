import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CheckListItem from "./CheckListItem";
import { Container, Button, Box, Typography } from "@mui/material";
import confetti from "canvas-confetti";

const GoShopping = ({ token }) => {
  const location = useLocation();
  let listId = location.search.split("=")[1];
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const doneShopping = () => {
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 250);

    setTimeout(() => {
      navigate("/lists");
    }, 5000);
  };

  useEffect(() => {
    axios
      .get(
        `https://grocerease.herokuapp.com/grocerease/list_detail/${listId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        setListName(res.data.name);
      });
    axios
      .get(
        `https://grocerease.herokuapp.com/grocerease/lists/${listId}/items/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        setItems(res.data);
      });
  }, []);
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#FFF8F0",
        padding: "16px",
        minHeight: "100vh",
      }}
      component="div"
    >
      <Typography
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "16px",
          fontWeight: "600",
          fontSize: "32px",
        }}
      >
        {listName}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {items.map((item) => {
          return <CheckListItem item={item} />;
        })}
      </Box>
      <div>
        <Button
          color="special"
          variant="contained"
          onClick={doneShopping}
          sx={{
            height: "32px",
            margin: "2px",
            color: "black",
            fontWeight: "100",
          }}
        >
          Done Shopping
        </Button>
      </div>
    </Container>
  );
};

export default GoShopping;
