"use client";
import React, { useRef, useState } from "react";

interface NotificationBellProps {
  initialCount?: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  initialCount = 0,
}) => {
  const [count, setCount] = useState(initialCount);
  const audioContextRef = useRef<AudioContext | null>(null);

  const incrementCount = () => {
    setCount(count + 1);
    playBeepSound();
  };
  const playBeepSound = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime); // Frequency in Hz
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // Beep duration in seconds
  };

  return (
    <div>
      <button
        onClick={incrementCount}
        style={{ position: "relative", border: 0, background: "white" }}
      >
        🔔
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "20px",
              borderRadius: "50%",
              padding: "5px",
              color: "red",
              fontSize: "14px",
            }}
          >
            {count}
          </span>
        )}
      </button>
    </div>
  );
};

export default NotificationBell;
