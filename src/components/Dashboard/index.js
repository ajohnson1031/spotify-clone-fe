import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import TrackSearchResult from "../TrackSearchResult";
import Player from "../Player";
import axios from "axios";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  const [spotifyApi, setSpotifyApi] = useState();

  const chooseTrack = (track) => {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  };

  useEffect(() => {
    async function res() {
      const res = await axios.get(
        "https://spotify-clone-be.herokuapp.com/getID"
      );
      return setSpotifyApi(
        new SpotifyWebApi({
          clientId: res.data.clientId,
        })
      );
    }
    res();
  }, []);

  useEffect(() => {
    if (!playingTrack) return;
    axios
      .get("https://spotify-clone-be.herokuapp.com/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics({
          lyrics: res.data.lyrics,
          track: res.data.track,
          artist: res.data.artist,
        });
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;
    let cancel = false;
    spotifyApi.searchTracks(search).then((res) => {
      if (cancel) return;
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });
    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container className='d-flex flex-column py-2' style={{ height: "100vh" }}>
      <Form.Control
        type='text'
        placeholder='Search Songs/Artists'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: 10 }}
      />
      <div className='flex-grow-1 my-2' style={{ overflowY: "auto" }}>
        {searchResults.map((track) => {
          return (
            <TrackSearchResult
              track={track}
              key={track.uri}
              chooseTrack={chooseTrack}
            />
          );
        })}
        {!searchResults.length && (
          <div
            className='text-center lyrics'
            style={{ whiteSpace: "pre", paddingTop: 20, paddingBottom: 20 }}
          >
            {lyrics.track && (
              <div
                style={{
                  borderBottom: 1,
                  borderTop: 0,
                  borderLeft: 0,
                  borderRight: 0,
                  borderColor: "yellowgreen",
                  borderStyle: "solid",
                  width: "fit-content",
                  marginBottom: "1rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <h2 style={{ marginBottom: 0 }}>{lyrics.track}</h2>
                <p style={{ marginBottom: 0 }}>by: {lyrics.artist}</p>
              </div>
            )}
            <p>{lyrics.lyrics}</p>
          </div>
        )}
      </div>
      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri} t />
      </div>
    </Container>
  );
};

export default Dashboard;
