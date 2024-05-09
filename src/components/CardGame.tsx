import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
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
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  return (
    <Box
      component={Link}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
      to={"/play-room"}
      bgcolor={!disabled ? Colors.green : Colors.white}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      borderRadius={"15px"}
      color={"white"}
      padding={isXs ? "15px 15px" : !disabled ? "10px 30px" : "0px"}
      sx={
        !disabled
          ? {}
          : {
              backgroundImage: "url(/public/backgroundNotGame.png)",
              backgroundSize: isXs ? "200%" : "140%",
              backgroundPosition: "center",
            }
      }
    >
      {!disabled ? (
        <>
          <Typography
            variant="h6"
            fontSize={{ xs: 30, md: 40 }}
            color={Colors.white}
            lineHeight={isXs ? 1 : 1.6}
          >
            {title}
          </Typography>
          <img src={vectorDivider} height={isXs ? "5px" : "15px"} />
          <img src={image} height={isXs ? "50px" : "100px"} />
        </>
      ) : (
        <>
          <Box padding={"30px"}>
            <Typography variant="h6" fontSize={30} color={Colors.white}>
              {isXs ? "" : title}
            </Typography>
          </Box>
        </>
      )}
    </Box>
  )
}
