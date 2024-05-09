import { Box, Stack, Typography } from "@mui/material"
import { Colors } from "./utils/colors"
import { useEffect } from "react"

interface Props {
  level: string
  date: string
  currentLevel: boolean
}

export default function CardLevelHistory({ date, level, currentLevel }: Props) {
  return (
    <Stack gap={1}>
      <Typography variant="h5">Modo {level}</Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        bgcolor={currentLevel ? Colors.darkOrange : Colors.green}
        minWidth={"300px"}
        borderRadius={"30px"}
        padding={"10px 20px"}
        color={Colors.white}
        alignItems={"center"}
      >
        <Typography variant="subtitle1">
          <b>Game:</b> Card Memory
        </Typography>
        <Typography variant="subtitle1" fontWeight={700} fontSize={"20px"}>
          {date}
        </Typography>
      </Box>
    </Stack>
  )
}
