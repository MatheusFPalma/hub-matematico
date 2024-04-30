import { Height, Padding } from "@mui/icons-material"
import { Box } from "@mui/material"
import { borderRadius, color, display, height, width } from "@mui/system"
import React from "react"

interface Props {
  accountDots: number
  currentIndex: number
}

function LittleDots({ accountDots, currentIndex }: Props) {
  const renderHelloWorld = () => {
    let botsArray = []

    for (let i = 1; i <= accountDots; i++) {
      let divStyle = {
        flex: "0 0 auto",
        height: "10px",
        width: "10px",
        backgroundColor: "#D9D9D9",
        borderRadius: "50px",
        transition: "all 0.5s ease 0s",
      }
      if (i === currentIndex) {
        divStyle = {
          ...divStyle,
          backgroundColor: "#3A7039",
          width: "30px",
        }
      }
      botsArray.push(<Box style={divStyle} />)
    }
    return botsArray
  }

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  }

  return <div style={containerStyle}>{renderHelloWorld()}</div>
}

export default LittleDots
