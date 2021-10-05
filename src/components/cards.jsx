import React from 'react';
import '../css/card.css';
import axios from "axios";

function Cards() {
    function getList(numbers = []) {
        axios.get(link).then(({data}) => {
            let date = data.data;
            date = date.concat(numbers);

            // MEAN
            setMean((date.reduce((sum, curr) => sum + curr, 0) / date.length).toFixed(6));

            // Median
            date.sort((a,b) => a - b);
            date.length % 2 == 1 ? setMedian((date[Math.floor(date.length / 2)]).toFixed(6)) :
                setMedian(((date[Math.floor(date.length / 2)] + date[Math.floor(date.length / 2) - 1]) / 2).toFixed(6));

            // Mode
            function modeFunction() {
                let modeList = {};
                let MaxCounts = [-1, -100000000];
                date.map(item => item in modeList ? modeList[item]++ : modeList[item] = 1);
                Object.entries(modeList).map(item => {
                    if (item[1] > MaxCounts[1] ) {
                        MaxCounts[0] = item[0];
                        MaxCounts[1] = item[1];
                    }
                });
                return MaxCounts[0];
            }
            setMode(Number(modeFunction()).toFixed(6));

            // StdDeviation
            setStdDeviation((Math.pow(date.reduce((sum, curr) => sum + Math.pow(curr - mean, 2),0) / date.length, 0.5)).toFixed(6));
        });
    }

    function toCursor() {
        let cursor = document.getElementById("input");
        let enterBtn = document.getElementById("enter-btn");

        cursor.focus();
        cursor.value = "";
        enterBtn.style.color = "black";
        return undefined;
    }

    function newNumberToList() {
        let cursor = document.getElementById("input");
        let item = Number(cursor.value);
        cursor.value = "";
        let array = isNaN(item) ? [] : [item];
        setNumbers([].concat(numbers, array))
        return undefined;
    }
    const [mean, setMean] = React.useState();
    const [mode, setMode] = React.useState(0);
    const [stdDeviation, setStdDeviation] = React.useState(0);
    const [median, setMedian] = React.useState(0);
    const [numbers, setNumbers] = React.useState([]);
    const [link, setLink] = React.useState("http://localhost:3000/data-1234.json");

    getList(numbers);

    return (
        <div className="Container">
            <div className="Cards-component">
                <div className="card Mean">
                    <h1>Mean</h1>
                    <h1>{mean}</h1>
                </div>
                <div className="card Median">
                    <h1>Median</h1>
                    <h1>{median}</h1>
                </div>
                <div className="card StdDeviation">
                    <h1>Std Deviation</h1>

                    <h1>{stdDeviation}</h1>
                </div>
                <div className="card Mode">
                    <h1>Mode</h1>
                    <h1>{mode}</h1>
                </div>
            </div>
            <div className="input-container">
                <h1 id="enter-btn" onClick={() => toCursor()}>Enter a number</h1>
                <input id="input" type="text"></input>
                <div className="btn-submit" onClick={() => newNumberToList()}><h3>Submit</h3></div>
            </div>
            <div className="Link-container">
                <div className="link" onClick={() => {
                    setLink("http://localhost:3000/data-1234.json");
                    setNumbers([]);
                }}>
                    <h3>Reload 1234-JSON Data</h3>
                </div>
                <div className="link" onClick={() => {
                    setLink("http://localhost:3000/data-4321.json");
                    setNumbers([]);
                }}>
                    <h3>Reload 4321-JSON Data</h3>
                </div>
            </div>
        </div>
    );
}

export default Cards;
