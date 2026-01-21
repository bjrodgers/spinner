import { Button, Grid, Stack } from "@mui/material";
import { useRef } from "react";
import "../index.css";

import letters from "../assets/letters.jpeg";
import numbers from "../assets/numbers.jpeg";
import Spinner, { type SpinnerRef } from "./components/Spinner";

const letterOptions: string[] = Array.from({ length: 12 }, (_, i) => String.fromCharCode("a".charCodeAt(0) + i));
const numberOptions: string[] = Array.from({ length: 18 }, (_, index) => String(index + 1));

/**
 * Component
 */
function App() {
  const lettersRef = useRef<SpinnerRef | undefined>(undefined);
  const numbersRef = useRef<SpinnerRef | undefined>(undefined);

  const onSpin = () => {
    lettersRef.current?.spin();
    numbersRef.current?.spin();
  };

  return (
    <Grid className="mainGrid" container={true} height="fit-content" padding={1} spacing={1} width="fit-content">
      <Grid alignItems="center" size={{ xs: 12, sm: 6 }}>
        <Stack alignItems="center">
          <Spinner background={letters} options={letterOptions} ref={lettersRef} size="300px" />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Stack alignItems="center">
          <Spinner background={numbers} options={numberOptions} ref={numbersRef} size="300px" />
        </Stack>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Stack alignItems="center">
          <Button fullWidth={true} variant="contained" onClick={onSpin}>
            Spin!
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default App;
