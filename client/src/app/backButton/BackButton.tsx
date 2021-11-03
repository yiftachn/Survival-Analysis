import React, { FC } from "react";
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom";


const BackButton: FC = () => {
    const history = useHistory();

    const handleBackButtonClicked = () => {
        history.push("/");
    };

    return (
        <Button color="secondary" variant="contained" onClick={handleBackButtonClicked} fullWidth>Back</Button>
    );
};

export default BackButton;