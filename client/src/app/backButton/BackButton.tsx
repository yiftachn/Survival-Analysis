import React, { FC } from "react";
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const BackButton: FC = () => {
    const history = useHistory();

    const handleBackButtonClicked = () => {
        history.push("/");
    };

    return (
        <Button color="secondary" variant="contained" onClick={handleBackButtonClicked} fullWidth><ArrowBackIosNewIcon />Back</Button>
    );
};

export default BackButton;