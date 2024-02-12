import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import {range, addDateBy} from "./utils";
import * as events from "events";

export const EventMod = (props, {setEvents}) => {
    const [startTime, setStartTime] = useState(props.startH+":"+props.startM);
    const [startDate, setStartDate] = useState(new Date());
    const [text, setText] = useState("");
    const [det, setDet] = useState("");
    const [endTime, setEndTime] = useState(props.startH+":"+props.startM);
    const [len, setLen] = useState(0);
    const [addB, setAddB] = useState(false);
    const [rep, setRep] =useState(false);
    const [repw, setRepw] =useState(1);
    const onAddEvent = (id,date,t, det,len, repweeks) => {
        range(repweeks).map((r)=>{
            props.setEvents((prev) => [...prev, {id: id, datetime: addDateBy(date, r*7), text: t, details:det, length: len}])
        });
        //props.setEvents((prev) => [...prev, {id: prev[0] ? prev[prev.length-1].id+1 : 0, datetime: date, text: t, details:det, length: len}])
    }
    const onStartTimeCh =(t) => {
        setStartTime((prev)=>t);
    }

    const asd=()=>{
        const id = props.evs[0] ? props.evs[props.evs.length-1].id+1 : 0;
        onAddEvent(id, new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate(),startTime.split(":")[0], startTime.split(":")[1]),text,det, parseFloat(len), repw)
        props.setIsEnabled(!props.isEnabled);
    }

    useEffect(() => {
        setStartTime(props.startH+":"+props.startM);
        setStartDate(new Date());
        setEndTime(props.startH+":"+props.startM);
        setText("");
        setDet("");
        setLen(0);
        setRepw(1);
        setRep(false);
    }, [props.isEnabled]);


    const onDateCh=(d)=>{
        setStartDate(d);
    }

    const onTextCh=(t) =>{
        setText(t.target.value);
    }
    const onDetCh=(t)=>{
        setDet(t.target.value);
    }

    const onEndTimeCh=(e) =>{
        setEndTime((prev)=>e);
    }

    useEffect(() => {
        validCheck();
    }, [endTime, startTime]);

    const onRepCh=(r)=>{
        setRep((prev)=>!prev);
    }


    useEffect(() => {
        setRepw(1);
    }, [rep]);

    const onRepwCh=(r)=>{
        setRepw(parseInt(r.target.value));
    }

    useEffect(() => {
        validCheck();
    }, [repw, text]);


    const validCheck=()=>{
        if (endTime == null || startTime == null){
            return;
        }
        const sH = parseFloat(startTime.split(":")[0]);
        const sM = parseFloat(startTime.split(":")[1]);
        const eH = parseFloat(endTime.split(":")[0]);
        const eM = parseFloat(endTime.split(":")[1]);
        if ((sH > eH  || (sH == eH && sM >= eM))||(repw<1 || isNaN(repw)) || (text=="")){
            setAddB((prev) =>true);
            return;
        } else {
            setAddB((prev)=>false);
        }
        const l = (eH + eM/60) - (sH + sM/60);
        console.log(l);
        setLen(l);

    }

    return <div hidden={props.isEnabled}>
        <div className="addEventDiv" >
            <div className="addEventLine">
                <label htmlFor="dp">Dátum: </label>
                <DatePicker calendarStartDay={1} placeholder="kezdet dátuma" onChange={onDateCh} name="dp" selected={startDate} ></DatePicker>
            </div>
            <div className="addEventLine">
                <label htmlFor="startT">Kezdete: </label>
                <TimePicker name="startT" value={startTime} clearIcon={null} clockIcon={null} onChange={onStartTimeCh}/>
            </div>
            <div className="addEventLine">
                <label htmlFor="endT">Vége: </label>
                <TimePicker name="endT" value={endTime} clearIcon={null} clockIcon={null} onChange={onEndTimeCh}/>
            </div>
            <div className="addEventLine">
                <label htmlFor="text">Esemény neve: </label>
                <input className="textinpline" name="text"  placeholder={"esemény neve"} onChange={onTextCh} value={text}/>
            </div>
            <div className="addEventLine">
                <label htmlFor="det">Leírás: </label>
                <textarea className="textinparea" placeholder={"leírás"} onChange={onDetCh} value={det}></textarea>
            </div>
            <div className="addEventLine">
                <label htmlFor="rep">Hetente ismétldő esemény? </label>
                <input className="checkinp" type="checkbox"  onChange={onRepCh} checked={rep}/>
            </div>
            <div hidden={!rep} className="addEventLineHidden" >
                <label htmlFor="repw">Hány hétig ismétlődjön? </label>
                <input className="numinp" type="number" value={repw} onChange={onRepwCh}/>
            </div>
            <div className="addEventLine">
                <button className="sb" disabled={addB} id="add" type="submit" onClick={asd}>hozzáaad</button>
            </div>

        </div>

    </div>
}
