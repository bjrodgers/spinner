import {Box, Divider, Stack, Typography} from "@mui/material";
import React, {useRef, useState} from "react";

import spinJpg from '../img/spin.png';
import './App.css';

export default function App() {
  const randomCount = 25;

  const [letter, setLetter] = useState(65);
  const [number, setNumber] = useState(1);
  const [disableBtn, setDisableBtn] = useState(false);
  const count = useRef(0);
  const timerId = useRef(0);

  function _updateLocation() {
    if (count.current >= randomCount) {
      window.clearInterval(timerId.current);
      timerId.current = 0;
      setDisableBtn(false);
      return;
    }

    setLetter(Math.floor(Math.random() * 12 + 65));
    setNumber(Math.floor(Math.random() * 18) + 1);
    count.current = count.current + 1;
  }

  function _onSpinClick() {
    setDisableBtn(true);
    count.current = 0;
    timerId.current = window.setInterval(_updateLocation, 50);
  }

  function _render() {
    const opacityValue = disableBtn ? .5 : 1;
    return (
      <Stack className='app'
             justifyContent="space-around"
             alignItems="center">
        <Box>
          <Typography sx={{fontSize: '10rem', color: 'cornsilk'}}>
            {String.fromCharCode(letter)}-
            {number}
          </Typography>
          <Box
            component="img"
            onClick={_onSpinClick}
            sx={{
              height: 300,
              width: 300,
              opacity: `${opacityValue}`
            }}
            src={spinJpg}/>
        </Box>
        <Divider/>
      </Stack>
    );
  }

  return _render();
}