import React from "react";

const dotStyle = {
  width: "16px",
  height: "16px",
  margin: "0 6px",
  borderRadius: "50%",
  backgroundColor: "#14b8a6",
  display: "inline-block",
  animationName: "bounce",
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
};

const styleSheet = `
@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}
`;

const Loading = () => {
  return (
    <>
      <style>{styleSheet}</style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span style={{ ...dotStyle, animationDelay: "0s" }}></span>
        <span style={{ ...dotStyle, animationDelay: "0.4s" }}></span>{" "}
        <span style={{ ...dotStyle, animationDelay: "0.8s" }}></span>{" "}
      </div>
    </>
  );
};

export default Loading;
