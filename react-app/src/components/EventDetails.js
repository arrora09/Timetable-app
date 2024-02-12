import React, {useEffect, useState} from "react";

export const EventDetails=(props)=>{
    const [selEv, setSelEv]=useState(props.selectedEv);
    const [wH, setWH] = useState(window.innerHeight);
    const [wW, setWW] = useState(window.innerWidth);
    const [divH, setDivH] =useState(0);
    const [divW, setDivW] =useState(0);


    useEffect(() => {
        setWH(window.innerHeight);
        setWW(window.innerWidth);
        //console.log(wH, wW);
        const handleDims = () =>{
            setWH(window.innerHeight);
            setWW(window.innerWidth);
        }
        window.addEventListener('resize',handleDims);
        handleDims();
    }, [window.innerHeight, window.innerWidth]);

    useEffect(() => {
        setSelEv(props.selectedEv);
        const evDiv = document.getElementsByClassName("eventDetailsDiv")[0];
        setDivH((prev)=> evDiv.clientHeight);
        setDivW((prev)=> evDiv.clientWidth);
        console.log(divH, divW);
    }, [props.selectedEv]);

//style={{top: `${wH/2-divH/2}px`, left:`${wW/2-divW/2}px`}}

    return <div style={{top: `${wH/2-divH/2}px`, left:`${wW/2-divW/2}px`}} className="eventDetailsDiv" hidden={props.isHidden}>
        <div className="detHeader">
            <p>Esemény részletei: <span style={{width: `${document.getElementById("dd") ? (document.getElementById("dd").clientWidth>150 ? 9*document.getElementById("dd").clientWidth/10 : 250) : 0}px`}} className={"headerspan"} >{selEv.text}</span></p>
            <button id="closeButton" onClick={props.closeDiv}>X</button>
        </div>
        <div className="detBod">
            <p>Leírás: </p>
            <div id="dd" >{selEv.details}</div>
        </div>
        <div className="detFooter">
            <button id="delButton" onClick={()=>props.deleteEvent(selEv)}>Eltávolítás</button>
        </div>
    </div>
}