import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import React, { FC } from 'react';
import { red, blue } from 'material-ui/colors';
import SurvivalAnalysis from '../survivalAnalysis/SurvivalAnalysis';


const Layout: FC = () => {
    const myTheme = createTheme({

        // Theme settings
        palette: {
            type: 'dark',
            primary: red
        }
    });

    return (
        <ThemeProvider theme={myTheme}>
            <SurvivalAnalysis />
        </ThemeProvider>
    );
};

export default Layout;