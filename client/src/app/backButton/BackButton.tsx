import React, { FC } from "react";
import { IconButton } from '@mui/material';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "./BackButton.module.scss";


const BackButton: FC = () => {
    const history = useHistory();

    const handleBackButtonClicked = () => {
        history.push("/");
    };

    return (
        <IconButton onClick={handleBackButtonClicked} className={styles.icon} color="primary"><ArrowBackIcon fontSize="inherit" /></IconButton>
    );
};

export default BackButton;