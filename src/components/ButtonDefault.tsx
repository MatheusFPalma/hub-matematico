import { Grid } from "@mui/material"
import React from "react";

interface ButtonDefaultProps {
    customStyle?: string
    disable?: boolean;
    action?: () => void;
    label: React.ReactNode;
    value?: string;
    styleWidth: number | string
    styleHeight: number | string
    type?: "button" | "submit" | "reset" | undefined
    children?: React.ReactNode
}

const ButtonDefault: React.FC<ButtonDefaultProps> = ({ action, customStyle, disable, label, styleWidth, styleHeight, type }) => {
    return (
        <Grid item sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
            <button type={type} disabled={disable} className={customStyle} style={{ width: styleWidth, height: styleHeight }} onClick={action} >{label}</button>
        </Grid>
    )
}

export default ButtonDefault
