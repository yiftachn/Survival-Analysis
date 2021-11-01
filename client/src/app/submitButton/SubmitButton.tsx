import { Button, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import CalculateIcon from '@mui/icons-material/Calculate';
import styles from './SubmitButton.module.scss';

interface SubmitButtonProps {
    onClick: () => void;
    disabled: boolean;
}

const SubitButton: FC<SubmitButtonProps> = ({ onClick, disabled }) => {
    return (
        <Tooltip title={disabled ? "One of the parameters is invalid" : ""}>
            <div>
                <Button
                    variant="contained"
                    type="submit"
                    onClick={onClick}
                    disabled={disabled}
                    fullWidth
                    color="secondary"
                    className={styles.button}
                    endIcon={<CalculateIcon />}
                >
                    Start Survival Analysis
                </Button>
            </div>
        </Tooltip>
    );
};

export default SubitButton;