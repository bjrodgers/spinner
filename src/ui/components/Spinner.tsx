import { Stack, Typography } from "@mui/material";
import { useCallback, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState, type Ref } from "react";

import arrow from "../../assets/arrow.png";

// Define the interface for the exposed functions
export interface SpinnerRef {
  spin: () => void;
}

/**
 * Props
 */
type SpinnerProps = {
  // The background image for the spinner
  background: string;

  // The number of pie peices there are to stop on
  options: string[];

  ref?: Ref<SpinnerRef | undefined>;

  // The width/height of the spinner (it will be a square)
  size: string | number;
};

/**
 * Components
 */
function Spinner({ background, options, ref, size = "300px" }: SpinnerProps) {
  const [rotation, setRotation] = useState<number>(0);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0);

  const count = useRef<number>(0);

  const doSpin = useCallback(() => {
    count.current++;
    if (count.current % 100 === 0) {
      // use functional update to avoid stale closures
      setRotationSpeed((s) => s - Math.random());
    }

    // use functional update so the latest rotation and speed are used
    setRotation((r) => (r + rotationSpeed) % 360);
  }, [rotationSpeed]);

  // Fire when rotation speed changes
  useLayoutEffect(() => {
    if (rotationSpeed >= 0) {
      const id = setTimeout(doSpin, 1);
      return () => clearTimeout(id);
    }
    return;
  }, [rotation, rotationSpeed, options, doSpin]);

  // Derive the result
  const computedResult = useMemo(() => {
    if (rotationSpeed >= 0) return null;

    const idx = Math.ceil((rotation / 360) * options.length) - 1;
    const safeIdx = Math.max(0, Math.min(options.length - 1, idx));
    return options[safeIdx].toUpperCase();
  }, [rotation, rotationSpeed, options]);

  // Setup the ref
  useImperativeHandle(ref, () => {
    return {
      spin: () => {
        if (rotationSpeed > 0) return;

        // Set the initial speed
        setRotationSpeed(3 + Math.random() * 4);
      },
    };
  });

  return (
    <div
      style={{
        backgroundImage: `url("${background}")`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",

        borderRadius: "50%",
        overflow: "clip",

        position: "relative",
        height: size,
        width: size,
      }}
    >
      <div
        style={{
          backgroundImage: `url("${arrow}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",

          position: "absolute",
          height: "100%",
          overflow: "clip",
          transform: `rotate(${rotation}deg)`,
          width: "100%",
        }}
      />
      {computedResult && (
        <Stack
          alignItems="center"
          className="result"
          justifyContent="center"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "50%",

            position: "absolute",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography fontFamily={"Noto Sans, serif"} fontSize="10rem">
            {computedResult}
          </Typography>
        </Stack>
      )}
    </div>
  );
}

// Export the component with it's ref interface
export default Spinner;
