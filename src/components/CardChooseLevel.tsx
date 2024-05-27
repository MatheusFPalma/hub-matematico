import { Box, Button, Checkbox, Typography } from "@mui/material"

import { Colors } from "./utils/colors"

interface Props {
  title: string
  checkedLevel: boolean
  image: string
  onLevelChange: () => void
}

export default function CardChooseLevel({
  title,
  checkedLevel,
  image,
  onLevelChange,
}: Props) {
  return (
    <>
      <Button style={{ margin: 0, padding: 0 }} onClick={onLevelChange}>
        <Box
          bgcolor={!checkedLevel ? Colors.green : Colors.darkOrange}
          display={"flex"}
          borderRadius={"10px"}
          color={"white"}
          fontFamily={"Nunito, sans-serif"}
          fontSize={"16px"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          width={"100%"}
        >
          <Checkbox
            style={{
              color: Colors.white,
            }}
            checked={checkedLevel}
          />
          <Typography variant="h6" style={{ color: Colors.white }}>
            {title}
          </Typography>
          <img src={image} />
        </Box>
      </Button>
    </>
  )
}
