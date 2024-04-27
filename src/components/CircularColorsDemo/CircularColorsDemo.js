"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { AnimatePresence, motion } from "framer-motion";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalID, setIntervalID] = useState(null);

  const selectedColor = COLORS[timeElapsed % COLORS.length];

  function startTimeElapsedCount() {
    const newIntervalId = setInterval(() => {
      setTimeElapsed((previousTimeElapse) => previousTimeElapse + 1);
    }, 1000);
    setIntervalID(newIntervalId);
    setIsPlaying(true);
  }

  function pauseTimeElapsedCount() {
    setIsPlaying(false);
    clearInterval(intervalID);
  }

  function resetTimeElapsedCount() {
    clearInterval(intervalID);
    setTimeElapsed(0);
    setIsPlaying(false);
  }

  return (
    <Card as="section" className={styles.wrapper}>
      <AnimatePresence>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li key={index} className={styles.color}>
                {isSelected && (
                  <motion.div
                    layout
                    animate={{ opacity: 0.6 }}
                    transition={{
                      opacity: { ease: "linear" },
                      layout: { duration: 0.1 },
                    }}
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>
      </AnimatePresence>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={!isPlaying ? startTimeElapsedCount : pauseTimeElapsedCount}
          >
            {!isPlaying ? <Play /> : <Pause />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button>
            <RotateCcw onClick={resetTimeElapsedCount} />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
