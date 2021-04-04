import React from "react";
import { Container } from "react-bootstrap";
import "../../index.css";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=7255314c6d654ebeace04439f22ac623&response_type=code&redirect_uri=https://friendly-heisenberg-3cbe1c.netlify.app/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          marginTop: -50,
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/login-img.jpg`}
          alt='Spotify® Clone'
          style={{ minWidth: 200, width: 400 }}
        />

        <a
          href={AUTH_URL}
          className='btn btn-success btn-lg'
          style={{
            borderRadius: 99,
            paddingLeft: 25,
            paddingRight: 25,
            fontFamily: "Circular",
            fontSize: 17,
          }}
        >
          Login With Spotify
        </a>
      </Container>
    </div>
  );
};

export default Login;
