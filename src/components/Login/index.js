import React from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=7255314c6d654ebeace04439f22ac623&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const Login = () => {
  return (
    <div>
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ minHeight: "100vh" }}
      >
        <a href={AUTH_URL} className='btn btn-success btn-lg'>
          Login With Spotify
        </a>
      </Container>
    </div>
  );
};

export default Login;
