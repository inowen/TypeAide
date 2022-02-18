import React from 'react';
import { useRef, useEffect, useState } from 'react';
import TextWindow from './TextWindow';
import './TypingArea.css';

function TypingArea() {
    const thisRef = useRef<HTMLDivElement>(null);
    let [stateObj, setStateObj] = useState({
        typed: "", incorrect: "", rest: "", 
        simpleKeysPressed: 0, numMistakenKeys: 0,
        quoteStarted: false, quoteFinished: false,
        timeStarted: null
    });

    // Auto-focus the typing area to catch keypresses
    useEffect(() => {
        if (thisRef.current != null) {
            thisRef.current.focus();
        }
    }, []);

    // On mount: download the first quote and initialize state
    useEffect(() => {
        /*
        Set typed, AND NOTHING MORE. When the user starts typing, the timer starts and the quote starts.

        Initial values for WPM and stuff? Nothing?
        If quote not started, display that instead of numbers? Or wpm = 0? ... Accuracy = 100% by default.
        */
        const url :string = "http://localhost:8080/api/v1/randomquote";
        const req = new XMLHttpRequest();
        req.addEventListener("load", () => {
            const responseText = req.responseText;
            setStateObj((prev)=>({...stateObj, typed: responseText, incorrect:"", rest:""}));
        });
        req.open("GET", url);
        req.send();

    }, []);

    return (
        <div className="typingarea" 
            ref={thisRef} 
            tabIndex={1} 
            onKeyDown={ (event)=>{
                keyEventHandler(event.key, stateObj);
            }

        }>
            <div className="vcenterflex">
                <TextWindow left={stateObj.typed} error={stateObj.incorrect} right={stateObj.rest}/>
            </div>
        </div>
    );
}

/**
 * Key press event handler
 */
function keyEventHandler(key: string, stateObj: object) {
    console.log("You pressed: " + key);
}

export default TypingArea;