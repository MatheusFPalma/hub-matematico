import { Box, Grid } from "@mui/material";
import "../App.css"
import ChallengeLevel from "../components/ChallengeLevel"
import DisplayScore from "../components/DisplayScore";

const PlayRoom = () => {
    const isOnHomePage = window.location.pathname === "/play-room";

    if (isOnHomePage) {
        document.body.classList.add("challegeLevel");
    } else {
        document.body.classList.remove("challegeLevel");
    }

    return (
        <>
            <Box >
                <DisplayScore score={0} />
                <ChallengeLevel />
            </Box>
        </>
    )
}

export default PlayRoom