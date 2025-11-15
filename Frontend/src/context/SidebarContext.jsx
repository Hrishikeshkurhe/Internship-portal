import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [hidden, setHidden] = useState(false);  // 👈 Sidebar visible by default

  return (
    <SidebarContext.Provider value={{ hidden, setHidden }}>
      {children}
    </SidebarContext.Provider>
  );
};
