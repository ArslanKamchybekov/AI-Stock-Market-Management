import {useState} from 'react';
import {Link} from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from '@/components/FlexBetween';
import PixIcon from "@mui/icons-material/pix";

type Props = {};

const Navbar =  (props: Props) => {   
    const { palette } = useTheme();
    const [seletected, setSelected] = useState ("dashboard");
    return (
        <FlexBetween 
         mb="0.25rem" 
         p= "0.5rem 0rem"  
         color={palette.grey[300]}
         
        >
            {/* LEFT SIDE */}
            <FlexBetween gap = "0.75rem">
                <PixIcon sx ={{fontSize: "28px"}} /> 
                <Typography variant = "h4" fontSize = "16px">
                    Finanseer 
                </Typography>
            </FlexBetween>
            {/* RIGHT SIDE*/}
            <FlexBetween gap="2rem">
                <Box sx = {{"&:hover":{color: palette.primary[100]}}}>
                    <Link
                     to= "/"
                     onClick={()=> setSelected("dashboard")}
                     style={{
                        color: seletected === "dashboard" ? "inherit" : palette.grey[700],
                        textDecoration: "inhereit"
                     }}
                    >
                    dashboard
                    </Link>
                </Box>
                <Box sx = {{"&:hover":{color: palette.primary[100]}}}>
                    <Link
                     to= "/predictions"
                     onClick={()=> setSelected("predictions")}
                     style={{
                        color: seletected === "predictions" ? "inherit" : palette.grey[700],
                        textDecoration: "inhereit"
                     }}
                    >
                    predicitons
                    </Link>
                </Box>
                <Box>
                    <Link
                        to="/stocks"
                        onClick={() => setSelected("stocks")}
                        style={{
                            color: seletected === "stocks" ? "inherit" : palette.grey[700],
                            textDecoration: "inhereit"
                        }}
                    >
                        stocks
                    </Link>
                </Box>
            </FlexBetween>
        </FlexBetween>
    );

};

export default Navbar

