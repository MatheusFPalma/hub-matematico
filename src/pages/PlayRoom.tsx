import "../App.css"
import ChallengeLevel from "../components/ChallengeLevel"

const PlayRoom = () => {
    const isOnHomePage = window.location.pathname === "/play-room";

    if (isOnHomePage) {
        document.body.classList.add("challegeLevel");
    } else {
        document.body.classList.remove("challegeLevel");
    }

    return (
        <>
            <ChallengeLevel />
        </>
    )
}

export default PlayRoom