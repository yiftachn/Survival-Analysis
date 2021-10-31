import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import React, { FC } from "react";


const Layout: FC = ({ children }) => {
    const themeOptions: ThemeOptions = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#f77990"
            },
            secondary: {
                main: "#f50057"
            }
        }
    });

    return (
        <ThemeProvider theme={themeOptions}>
            <StylesProvider injectFirst>
                {children}
            </StylesProvider>
        </ThemeProvider>
    );
};

export default Layout;
