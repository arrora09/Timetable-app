import styled from "styled-components"
import "../styles/weekly.css"
import {range, areDatesSame, addDateBy, getMonday} from "./utils";
import React, {useEffect, useState} from "react";
import {EventMod} from "./EventMod";
import {EventDetails} from "./EventDetails";
import events from "events";

const DAYS = ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"];



export const Weekly = () => {
    const [hourNow, setHourNow] = useState(new Date().getHours());
    const [minutesNow, setMinutesNow] = useState(new Date().getMinutes());
    const [mondayDate, setMondayDate] = useState(getMonday());
    const [evMod, setEvMod] = useState(true);
    const [events, setEvents] = useState([]);
    const [hideEventDetails, setHideEventDetails] = useState(true);
    const [selectedEv, setSelectedEv] = useState({});



    const getDataFromLocalStorage = (key) => {
        const data = JSON.parse(localStorage.getItem(key));
        //console.log(data);
        if (data==null){
            return;
        }

        data.map((d)=>(
            onAddEvent(d.id, new Date(d.datetime),d.text,d.details, parseFloat(d.length))
        ))
    };

    useEffect(() => {
        getDataFromLocalStorage("events");
        //console.log(events);
    }, []);


    const nextWeek = () => {
        setMondayDate(addDateBy(mondayDate, 7));
    }
    const lastWeek = () => {
        setMondayDate(addDateBy(mondayDate, -7));
    }

    const saveDataToLocalStorage=(key, data) => {
        console.log(data);
        localStorage.setItem(key,JSON.stringify(data));
    };

    // const [events, setEvents] = useState([
    //     {id: 1, datetime: new Date(2024, 1, 9, 10, 5), text: "teszt 2", details:"ez a teszt 2", length: 4},
    //     {id: 2, datetime: new Date(2024, 1, 10, 15, 5), text: "teszt 3", details:"ez a teszt 3", length: 8},
    //     {id: 3, datetime: new Date(2024, 1, 11, 1, 5), text: "teszt 3", details:"ez a teszt 3", length: 8}
    // ]);

    const onCreateNewEvent = () => {
        setEvMod(!evMod);
    }

    const onAddEvent = (id,date,t, det,len, repweeks) => {
        range(repweeks).map((r) => {
            setEvents((prev) => [...prev, {
                id: id,
                datetime: addDateBy(date, r * 7),
                text: t,
                details: det,
                length: len
            }])
        });
    }

    const onDetailsClick = (ev) => {
        console.log(ev);
        setSelectedEv((prev)=>ev);
        setHideEventDetails((prev)=> false);
    }

    const closeDetDiv=(ev)=>{
        setHideEventDetails((prev)=>true);
    }

    const onRemoveEvent = (ev) => {
        var newEvs = []
        events.map((e) =>{
            if (!(e.id == ev.id)){
                newEvs.push(e);
            }
        })
        setEvents(newEvs);
        closeDetDiv(ev);
    }

    useEffect(() => {
        //console.log(events);
        saveDataToLocalStorage("events",events);
    }, [events]);

    useEffect(() => {
        const minTimer = setInterval(()=>{
            setMinutesNow(new Date().getMinutes());
        }, 1000);
        const hourTimer = setInterval(()=>{
            setHourNow(new Date().getHours());
        }, 1000);

        return () =>{
            clearInterval(minTimer);
            clearInterval(hourTimer);
        }
    }, []);


    return<div className="maindiv">
        <div className="flexbox">
            <p>Ma: {new Date().toDateString()}</p>
            <p>A hét első napja: {mondayDate.toDateString()}</p>
            <p>A hét utolsó napja: {addDateBy(mondayDate,6).toDateString()}</p>
            <button onClick={() => lastWeek()} className="stepButton">{"\u003C"}</button>
            <button className="stepButton" onClick={()=>onCreateNewEvent()}>+</button>
            <button onClick={() => nextWeek()} className="stepButton">{"\u003E"}</button>
        </div>
        <EventMod setIsEnabled={setEvMod} setEvents={setEvents} evs={events} isEnabled={evMod} startM={minutesNow} startH={hourNow}>
        </EventMod>
        <EventDetails deleteEvent={onRemoveEvent} selectedEv={selectedEv} closeDiv={closeDetDiv} isHidden={hideEventDetails} >
        </EventDetails>
        <div className="wrapper">
            <div key={DAYS.map((kd)=> kd)} className="horGrid">
                <div key={range(24).map((k)=>k)} className="verGrid">
                    {
                        range(24).map((h) => <div className="hours">{h}</div>)
                    }
                </div>
                <div className="dayGrid">
                    {
                        DAYS.map((d, idx)=> ( <div className={"days "+ (areDatesSame(new Date(), addDateBy(mondayDate, idx)) ? "today" : "")}>
                            <p>{d}</p>
                            {
                                events.map((ev)=>(
                                    areDatesSame(ev.datetime, addDateBy(mondayDate, idx)) && (
                                        <div onClick={() => {onDetailsClick(ev)}} className="eventdiv" style={{top:`${ev.datetime.getHours() * 30 + 15 + ev.datetime.getMinutes()/2}px`, height:`${ev.length*30}px`}}>
                                            <p>{ev.text}</p>
                                        </div>
                                )))
                            }
                        </div>))
                    }
                </div>
            </div>
            <hr className="hourLine" style={{top:`${hourNow * 30 + 15 + minutesNow/2}px`}}/>
            </div>
    </div>
}

