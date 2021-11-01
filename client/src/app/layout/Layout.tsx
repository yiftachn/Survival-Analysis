import { createTheme, StyledEngineProvider, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@material-ui/styles";
import React, { FC } from "react";


const Layout: FC = ({ children }) => {
    const themeOptions: ThemeOptions = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: "#f77990"
            },
            secondary: {
                main: "#9A69A0"
            }
        },
        typography: {
            "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`
        }
    });

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themeOptions}>

                {children}

            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default Layout;
