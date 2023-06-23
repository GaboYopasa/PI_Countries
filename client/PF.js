import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DarkMode = () => {

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState();

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) return null;

    return(
        <div>
            The current theme is {theme}
            <button onClick={() => setTheme("light")}>Light Mode</button>   
            <button onClick={() => setTheme("dark")}>Dark Mode</button>
        </div>
    );
};

export default DarkMode;


// Layout-----------------------------------------------------------------------------------------------
    'use client'
    import Providers from "../redux/provider/Provider"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap-icons/font/bootstrap-icons.css"
import './globals.css'
import Theme from "tailwindcss-animated/src/theme"
import DarkMode from "@/pages/Components/DarkMode"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
              <title>e-Latam</title>
              <body>
                <Providers>
                  <DarkMode/>
                  {children}
                </Providers>
              </body>
            </html>
  );
};

//Global CSS
body{
    background-color: #000;
    color:#fff
}

[data-theme="light"] body{
    color: #000;
    background-color: #fff;
}


//Provider---------------------------------------------------------------------------------------------------
import { Provider } from "react-redux";
import store from "../store/store";
import { ThemeProvider } from "next-themes";
import { useState, useEffect } from "react";

// const Providers = ({children}) => {
//     return <Provider store={store}>
//         {children}
//     </Provider>
// }

const Providers = ({ children }) => {

    const [mounted, setMounted] = useState();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <Provider store={store}>{children}</Provider>;

    return (
        <Provider store={store}>
            <ThemeProvider>{children}</ThemeProvider>
        </Provider>
    )
}

export default Providers;
