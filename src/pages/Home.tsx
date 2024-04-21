
import { Grid } from "@mui/material"
import "../App.css"
import CardMemory from "../components/CardMemory"
import apple from "/apple_level_One.png"
import type { OperationType } from "../store/modules/operationSlice"

const cards: OperationType[] = []


const Home = () => {
    return (
        <Grid container>
            <CardMemory value={cards.map((item) => item.firstCard)} operation={'+'} figure={apple} />
        </Grid>
    )
}

export default Home