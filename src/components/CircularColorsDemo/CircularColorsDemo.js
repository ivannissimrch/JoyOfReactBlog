"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  function getCurrentColor(timeElapsed) {
    const colorIndex = timeElapsed % COLORS.length;
    return COLORS[colorIndex];
  }

  function startTimeElapseCount() {
    const newIntervalId = setInterval(() => {
      setTimeElapsed((previousTimeElapse) => previousTimeElapse + 1);
    }, 1000);
    setIntervalID(newIntervalId);
    setIsPlaying(true);
  }

  function pauseTimeElapseCount() {
    setIsPlaying(false);
    clearInterval(intervalID);
    setTimeElapsed((previousTimeElapse) => previousTimeElapse);
  }

  function resetTimeElapseConut() {
    clearInterval(intervalID);
    setTimeElapsed(0);
    setIsPlaying(false);
  }

  useEffect(() => {
    const colorSelected = getCurrentColor(timeElapsed);
    setSelectedColor(colorSelected);
  }, [timeElapsed]);

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && <div className={styles.selectedColorOutline} />}
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

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button>
            {!isPlaying && <Play onClick={startTimeElapseCount} />}
            {isPlaying && <Pause onClick={pauseTimeElapseCount} />}
            <VisuallyHidden>Play</VisuallyHidden>
          </button>
          <button>
            <RotateCcw onClick={resetTimeElapseConut} />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
