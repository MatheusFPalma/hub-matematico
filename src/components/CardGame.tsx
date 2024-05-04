import { Box, Typography } from "@mui/material"
import vectorDivider from "../../public/vectorDivider.svg"
import { ReactNode } from "react"
import { Colors } from "./utils/colors"
import { Link } from "react-router-dom"

interface Props {
  title: ReactNode
  image: string
  disabled?: boolean
}

export default function CardGame({ title, image, disabled = false }: Props) {
  return (
    <Box
      component={Link}
      to={!disabled ? "/play-room" : "/home"}
      bgcolor={!disabled ? Colors.green : Colors.white}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      borderRadius={"15px"}
      color={"white"}
      padding={!disabled ? "10px 30px" : "0px"}
      sx={
        !disabled
          ? {}
          : {
              backgroundImage: "url(/public/backgroundNotGame.png)",
              backgroundSize: "140%",
              backgroundPosition: "center",
            }
      }
    >
      {!disabled ? (
        <>
          <Typography variant="h6" fontSize={40} color={Colors.white}>
            {title}
          </Typography>
          <img src={vectorDivider} height={"15px"} />
          <img src={image} height={"100px"} />
        </>
      ) : (
        <>
          <Box padding={"30px"}>
            <Typography variant="h6" fontSize={30} color={Colors.white}>
              {title}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  )
}
