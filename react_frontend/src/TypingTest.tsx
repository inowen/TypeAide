import React from 'react';
import { useRef, useEffect, useState } from 'react';
import TextWindow from './TextWindow';
import './TypingTest.css';

function TypingTest() {
    const thisRef = useRef<HTMLDivElement>(null);
    let [stateObj, setStateObj] = useState({
        typed: "", incorrect: "", rest: "", 
        simpleKeysPressed: 0, numMistakenKeys: 0,
        quoteStarted: false, quoteFinished: false,
        timeStarted: -1, timeEnded: -1
    });

    // Auto-focus the typing test to catch keypresses
    useEffect(() => {
        if (thisRef.current != null) {
            thisRef.current.focus();
        }
    }, []);

    // On mount: download the first quote and initialize state
    useEffect(() => {
        /*
        REMOVE THIS COMMENT AS SOON AS ITS CONTENT IS IMPLEMENTED
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

    // Stats
    let seconds = -1;
    let wpm = 0;
    let cpm = 0;
    let accPercentage = 100;
    if (stateObj.quoteStarted) {
        if (stateObj.quoteFinished) {
            seconds = stateObj.timeEnded - stateObj.timeStarted;
        }
        else {
            let tNow = new Date().getTime() / 1000;
            seconds = tNow - stateObj.timeStarted;
        }
        cpm = stateObj.simpleKeysPressed / seconds;
        wpm = cpm/5;
        accPercentage = (stateObj.numMistakenKeys / stateObj.simpleKeysPressed) * 100;
    }
    
    return (
        <div className="typingtest" 
            ref={thisRef} 
            tabIndex={1} 
            onKeyDown={ (event)=>{
                keyEventHandler(event.key, stateObj);
            }

        }>
            <div className="vcenterflex">
                <span>Here Request customization</span>
                <TextWindow left={stateObj.typed} error={stateObj.incorrect} right={stateObj.rest}/>
                <p>Wpm:{wpm}, Cpm:{cpm}, Accuracy:{accPercentage}%, Timer: {seconds} sec.</p>
            </div>
        </div>
    );
}

/**
 * Key press event handler
 */
function keyEventHandler(key: string, stateObj: object) {
    console.log("You pressed: " + key);

    // If escape key, next quote and return 

    // If the quote has ended, return immediately 

    // If the key is delete... 
    //... if ctrlKey, else
    // (don't delete if there's nothing to delete)

    // for normal keys: 
    // - move character from one array to the other.
    // - if left.empty() finish quote and record end time
    // - totalKeys++, if wrong then wrongKeys++
}

export default TypingTest;