import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../login.css";
import hero from "../images/login-hero.png";
import {
  Typography,
  Container,
  Box,
  FormControl,
  Input,
  InputLabel,
  Button,
  TextField,
} from "@mui/material";
import { fontWeight } from "@mui/system";

export default function Login({ isLoggedIn, setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  if (isLoggedIn) {
    navigate("/lists");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://grocerease.herokuapp.com/auth/token/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.auth_token) {
          setAuth(username, res.data.auth_token);
        }
      });
  };

  return (
    <Container sx={{
      display: "flex",
      justifyContent: "flex-end",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: "#EEB61B",
      backgroundImage: `url(${hero})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }} component="div" >
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      color: "#FFF8F0",
      flexDirection: "column"
    }}
    >
    <Box sx={{
      display: "flex",
    }}>
    <Typography
      sx={{
        fontFamily: "Libre Franklin",
        fontWeight: 900,
        fontSize: "60px",
      }}
    >Grocer</Typography>
    <Typography
          sx={{
        fontWeight: '100 !important',
        fontSize: "60px",
        fontStyle: "italic",
      }}
      >Ease</Typography>
      </Box>
      <Typography
                sx={{
        fontSize: "20px",
        fontStyle: "italic",
        margin: 0
      }}

      >
        shop quick, easy, and in a breeze!
      </Typography>

    </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "15px",
          backgroundColor: '#FF8811',
          padding: "25px",
          marginBottom: "75px",
          color: "#FFF8F0",
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth style={{ marginBottom: "20px" }} className="mt3">
        <TextField placeholder="Username" label="Username" variant="filled" color="primary" type="text" id="email" onChange={(event) => setUsername(event.target.value)} />
        </FormControl>
        <FormControl style={{ marginBottom: "25px" }} fullWidth>
        <TextField placeholder="Password" label="Password" variant="filled" color="primary" type="text" id="email" onChange={(event) => setPassword(event.target.value)} />

        </FormControl>
        <FormControl fullWidth>
          <Button variant="outlined" type="submit">Login</Button>
        </FormControl>
      </Box>
    </Container>
  );
}

