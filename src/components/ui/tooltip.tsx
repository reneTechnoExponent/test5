import React, { createContext, useContext } from "react";

// Placeholder TooltipProvider - replace with actual shadcn/ui component
const TooltipContext = createContext({});

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TooltipContext.Provider value={{}}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => useContext(TooltipContext);