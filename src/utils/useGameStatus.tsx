import { useState, useEffect, useCallback } from "react";

const linePoints = [40, 100, 300, 1200];

export const useGameStatus = (rowsCleared: number) => {
  const [score, setScore] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      // For some reason the rowsCleared is being doubled...
      // this shouldn't happen, it could be to do with the double rendering...
      // anyway, that is what we are dividing rows cleared by 2.
      console.log(rowsCleared, linePoints[rowsCleared - 1]);
      setScore((prev) => prev + linePoints[rowsCleared / 2 - 1] * (level + 1));
      setRows((prev) => prev + rowsCleared / 2);
    }
  }, [level, rowsCleared]);

  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);

  return { score, setScore, rows, setRows, level, setLevel };
};
