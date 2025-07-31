import satori from "satori";
import loadCustomFonts from "../loadCustomFont";

const width = 1200;
const height = 630;

const triangleShape = {
  position: "absolute",
  width: "50vw",
  height: "100vh",
  transform: "translate(-50%,-50%) skewY(50deg)",
  boxShadow: "inset 0 0 130px hsl(240, 100%, 70%)",
  borderRadius: "10em",
};
const rectangleShape = {
  position: "absolute",
  width: "35vw",
  height: "92vh",
  transform: "translate(-50%,-50%)",
  boxShadow: "inset 0 0 130px hsl(240, 100%, 70%)",
  borderRadius: "5em",
};

export default async () => {
  return satori(
    <div
      style={{
        background: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ top: "132%", left: "35%", ...triangleShape }} />
      <span style={{ top: "-32%", left: "20%", ...triangleShape }} />
      <span style={{ top: "105%", left: "73%", ...rectangleShape }} />
      <span style={{ top: "-5%", left: "73%", ...rectangleShape }} />
    </div>,
    {
      width,
      height,
      embedFont: true,
      fonts: await loadCustomFonts(),
    }
  );
};
