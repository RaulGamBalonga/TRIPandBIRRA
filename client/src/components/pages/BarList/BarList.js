import React from "react";
import BarCard from "./barCard"

function BarList(props) {

    const bars = props.bars

    const displayBars = () => {
        return bars.map(bar => {

            return <BarCard key={bar._id} bar={bar} />
        })
    }

    return (
        <>
            {displayBars()}
        </>
    )
}

export default BarList