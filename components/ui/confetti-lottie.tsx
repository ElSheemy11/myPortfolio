"use client";
import Lottie from "react-lottie";
import animationData from "@/data/confetti.json";

export default function ConfettiLottie({ copied = true }: { copied?: boolean }) {
  return (
    <Lottie
      options={{
        loop: false,
        autoplay: copied,
        animationData,
        rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
      }}
    />
  );
}
