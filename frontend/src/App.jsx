import React, { useState, useEffect } from "react";
import Header from "./components/header/Header";

import { Outlet } from "react-router";
import Footer from "./components/footer/Footer";
import { ThemeProvider } from "./context/theme";

function App() {
  // Load the theme from local storage or use the default theme "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Update the HTML class and save the theme to local storage when it changes
    let html = document.querySelector("html");
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const darkMode = () => {
    setTheme("dark");
  };

  const lightMode = () => {
    setTheme("light");
  };

  return (
    <ThemeProvider value={{ theme, darkMode, lightMode }}>
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
