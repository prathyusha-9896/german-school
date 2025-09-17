import React from "react";

const SaleBanner: React.FC = () => {
  return (
    <div
      className="w-full text-center"
      style={{
        backgroundColor: "#826BFB",
        color: "#F0EFF1",
        fontFamily: "Raveo Display, sans-serif",
        fontWeight: 600,
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0%",
        padding: "6px 0",
      }}
    >
      Sale Ends Soon, 00:13:47:08 ,{" "}
      <a
        href="/"
        style={{
          textDecoration: "underline",
          marginLeft: "4px",
          color: "#F0EFF1",
        }}
      >
        GET IT NOW →
      </a>
    </div>
  );
};

export default SaleBanner;
