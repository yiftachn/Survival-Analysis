import React, { FC } from "react";
import { Button } from '@mui/material';

interface BackButtonProps {
    onBackButtonClicked: () => void;
}

const BackButton: FC<BackButtonProps> = ({onBackButtonClicked}) => {

    return (
        <Button color="secondary" variant="contained" onClick={onBackButtonClicked} fullWidth>Back</Button>
    );
};

export default BackButton;