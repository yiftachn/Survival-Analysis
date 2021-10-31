import { Autocomplete, TextField } from "@mui/material";
import React, { FC } from "react";

import styles from "./Feature.module.scss";

interface FeatureProps {
    name: string;
    onChange: (featureName: string) => void;
}

const Feature: FC = () => {
    const options = ['The Godfather', 'Pulp Fiction'];

    return (
        <>
            <div className={styles.container}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    renderInput={(params) => <TextField {...params} label="Movie" />}
                />
            </div>

        </>
    );
};

export default Feature;