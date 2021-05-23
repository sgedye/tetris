import React, { createContext, useMemo, useState } from "react";

export interface GlobalState {
  gameOver: boolean;
  setGameOver?: React.Dispatch<React.SetStateAction<boolean>>;
  gamePaused?: boolean;
  setGamePaused?: React.Dispatch<React.SetStateAction<boolean>>;
  gameSpeed?: number;
  setGameSpeed?: React.Dispatch<React.SetStateAction<number>>;
  prePauseSpeed?: number;
  setPrePauseSpeed?: React.Dispatch<React.SetStateAction<number>>;
  highscore?: number;
  setHighscore?: React.Dispatch<React.SetStateAction<number>>;
  showConfetti?: boolean;
  setShowConfetti?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GlobalDispatch {}

const GlobalStateContext = createContext<GlobalState | null>(null);
const GlobalDispatchContext = createContext<GlobalDispatch | null>(null);

export const GlobalProvider: React.FC<GlobalState> = ({
  gameOver,
  setGameOver,
  gamePaused,
  setGamePaused,
  gameSpeed,
  setGameSpeed,
  prePauseSpeed,
  setPrePauseSpeed,
  highscore,
  setHighscore,
  showConfetti,
  setShowConfetti,
  children,
  // ...rest
}) => {
  const [value, setValue] = useState<GlobalState | null>({
    gameOver,
    setGameOver,
    gamePaused,
    setGamePaused,
    gameSpeed,
    setGameSpeed,
    prePauseSpeed,
    setPrePauseSpeed,
    highscore,
    setHighscore,
    showConfetti,
    setShowConfetti,
  });

  // const providerValue = useMemo(() => ({ value, setValue }), [value, setValue]);

  //     <GlobalProvider value={{ value, setValue }}>
  return (
    // <GlobalStateContext.Provider value={useGlobalState()}>
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const ctx = React.useContext(GlobalStateContext);

  console.log(ctx);
  if (!ctx) {
    throw Error("useGlobal hook used outside GlobalProvider");
  }

  return ctx;
};

export const useGlobal = () => {
  const state = useGlobalState();
  // const dispatch = useGlobalDispatch();

  return [state] as const;
};
