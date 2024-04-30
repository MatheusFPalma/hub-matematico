import { Box, Button, useMediaQuery, useTheme } from "@mui/material"
import React from "react"

interface Prop {
  image: string
  text: React.ReactNode
  onClick: () => void
}

function CardWelcome({ image, text, onClick }: Prop) {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only("xs"))
  const isSm = useMediaQuery(theme.breakpoints.only("sm"))

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-evenly"
      bgcolor="white"
      flexDirection={{ xs: "column", md: "row" }}
      maxHeight={{ xs: "80%", md: "60%" }}
      maxWidth={{ xs: "100%", md: "80%" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems={{ xs: "center", md: "self-start" }}
        justifyContent="center"
        gap="10px"
        maxWidth={{ xs: "90%", md: "50%" }}
        fontSize="15px"
        color="#365435"
        fontFamily="Nunito, sans-serif"
        fontWeight={500}
      >
        <h1>Seja bem vindo!</h1>
        <div style={{ fontSize: "20px" }}>{text}</div>
        {!isXs && !isSm && (
          <Button
            onClick={onClick}
            variant="contained"
            size="small"
            style={{
              backgroundColor: "#365435",
              color: "white",
              textTransform: "none",
              width: "40%",
            }}
          >
            Avançar
          </Button>
        )}
      </Box>
      <Box height={{ xs: "60%", md: "100%" }}>
        <img src={image} height="100%" alt="girl" />
      </Box>
    </Box>
  )
}

export default CardWelcome
