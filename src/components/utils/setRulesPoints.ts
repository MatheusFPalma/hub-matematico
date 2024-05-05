import { useAppDispatch } from "../../store/hooks"
import { setPointsRules } from "../../store/modules/challenge.slice"

const dispatch = useAppDispatch()

const objectLevelEasy = {
    scoreCurrentLevel: 0,
    scoreTotal: 0,
    pointsPerQuestion: 5
}

const objectLevelMidle = {
    scoreCurrentLevel: 0,
    scoreTotal: 0,
    pointsPerQuestion: 10
}

const objectLevelHard = {
    scoreCurrentLevel: 0,
    scoreTotal: 0,
    pointsPerQuestion: 15
}


const setRules = (level: string) => {
    switch (level) {
        case "Fácil":
            dispatch(setPointsRules(
                objectLevelEasy
            ))
            break;
        case "Médio":
            dispatch(setPointsRules(
                objectLevelMidle
            ))
            break;
        case "Difícil":
            dispatch(setPointsRules(
                objectLevelHard
            ))
            break;
    }
}

export default setRules