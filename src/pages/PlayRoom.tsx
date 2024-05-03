import { Grid } from "@mui/material";
import "../App.css"
import ButtonDefault from "../components/ButtonDefault";
import ChallengeLevel from "../components/ChallengeLevel"
import DisplayScore from "../components/DisplayScore";

const PlayRoom = () => {
    const isOnHomePage = window.location.pathname === "/play-room";

    if (isOnHomePage) {
        document.body.classList.add("challengeLevel");
    } else {
        document.body.classList.remove("challengeLevel");
    }

    return (
        <div style={{ marginBottom: '80px' }}>
            <ChallengeLevel children={<DisplayScore score={0} />} />
            <ButtonDefault action={() => console.log()} customStyle={'buttonConfirm'} label={'Confirmar'} styleWidth={'60%'} styleHeight={60} />
        </div>
    )
}

export default PlayRoom