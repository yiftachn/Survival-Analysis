import { Button } from '@mui/material';
import React, { FC } from 'react';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import styles from './SubmitButton.module.scss';

interface SubmitButtonProps {
    onClick: () => void;
    disabled: boolean;
}

const SubitButton: FC<SubmitButtonProps> = ({ onClick, disabled }) => {
    return (
        <Button
            variant="contained"
            type="submit"
            onClick={onClick}
            disabled={disabled}
            fullWidth
            color="secondary"
            className={styles.button}
            endIcon={<AnalyticsIcon />}
        >
            Start Survival Analysis
        </Button>
    );
};

export default SubitButton;