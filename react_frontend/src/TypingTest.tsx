import React from 'react';
import { useRef, useEffect, useState } from 'react';
import StatsDisplay from './StatsDisplay';
import TextWindow from './TextWindow';
import './TypingTest.css';

const backendURL: string = "http://212.115.110.9:8080/api/v1/randomquote";

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
        const req = new XMLHttpRequest();
        req.addEventListener("load", () => {
            const responseText = req.responseText;
            setStateObj((prev)=>({...stateObj, typed: "", incorrect:"", rest:responseText}));
        });
        req.open("GET", backendURL);
        req.send();
    }, []);

    // Stats
    let seconds = 0;
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
        cpm = (stateObj.simpleKeysPressed / seconds) * 60;
        wpm = cpm/5;
        accPercentage = (1 - stateObj.numMistakenKeys/stateObj.simpleKeysPressed) * 100;
    }
    let status = "Quote not started";
    if (stateObj.quoteStarted) {
        status = "Quote started";
        if (stateObj.quoteFinished) {
            status = "Quote finished";
        }
    }

    return (
        <div className="typingtest" 
            ref={thisRef} 
            tabIndex={1} 
            onKeyDown={ (event)=>{
                keyEventHandler(event, stateObj, setStateObj);
            }
        }>
            <div className="vcenterflex">
                <div style={{color:"darkblue"}}>Placeholder<br/>(quote category form)</div>
                <TextWindow left={stateObj.typed} error={stateObj.incorrect} right={stateObj.rest}/>
                <StatsDisplay wpm={wpm} cpm={cpm} accuracyPercentage={accPercentage} numSeconds={seconds} status={status}/>
            </div>
        </div>
    );
}

/**
 * Key press event handler
 */
function keyEventHandler(event: any, stateObj: any, setStateObj: any) {
    const key = event.key;

    // Ctrl key on its own doesn't mean anything
    if (key == 'Control') {
        return;
    }

    // If escape key, next quote and return 
    if (key == 'Escape') {
        const req = new XMLHttpRequest();
        req.addEventListener("load", () => {
            const responseText = req.responseText;
            setStateObj((prev: object) => ({
                ...prev,
                quoteStarted: false,
                quoteFinished: false,
                timeStarted: -1,
                timeEnded: -1,
                typed: "",
                incorrect: "",
                rest: responseText,
                simpleKeysPressed: 0,
                numMistakenKeys: 0
            }));
        });
        req.open("GET", backendURL);
        req.send();
        return;
    }

    // If the quote has ended, return immediately 
    if (stateObj.quoteFinished) {
        return;
    }


    /**
     * Deletes one character in the quote.
     * Typed, error, and left are passed in as references. They will be edited,
     *  later setStateObj must be used.
     * Returns the deleted character, or empty string if there's nothing to delete.
     */
    const deleteOne = (passByReference: any) => {
        if (passByReference.error.length > 0) {
            const ret = passByReference.error[passByReference.error.length-1];
            passByReference.error = passByReference.error.substring(0, passByReference.error.length-1);
            return ret;
        }
        else if (passByReference.typed.length > 0) {
            let ret = passByReference.typed[passByReference.typed.length-1];
            passByReference.typed = passByReference.typed.substring(0, passByReference.typed.length-1);
            passByReference.left = ret.concat(passByReference.left);
            return ret;
        }
        else {
            return '';
        }
    };

    /**
     * Takes object with typed,left,error fields.
     * Returns the next character that would be deleted (as a string), or empty string.
     */
    const peekOne = (passByRef: any) => {
        if (passByRef.error.length > 0) {
            return passByRef.error[passByRef.error.length - 1];
        }
        else if (passByRef.typed.length > 0) {
            return passByRef.typed[passByRef.typed.length - 1];
        }
        return '';
    };

    if (key == 'Backspace') {
        let passByReference = {
            typed: stateObj.typed,
            error: stateObj.incorrect,
            left : stateObj.rest
        }

        if (event.ctrlKey) {
            // Whitespaces
            while(peekOne(passByReference) == ' ') {
                deleteOne(passByReference);
            }
            // Delete a word
            while(peekOne(passByReference)!='' && peekOne(passByReference)!=' ') {
                deleteOne(passByReference);
            }
        }
        else {
            deleteOne(passByReference);
        }

        // Update state
        setStateObj((prev: any) => ({
            ...prev,
            typed: passByReference.typed,
            incorrect: passByReference.error,
            rest: passByReference.left
        }))
        return;
    }


    // Handle normal key presses
    let typed:string = stateObj.typed;
    let incorrect:string = stateObj.incorrect;
    let left:string = stateObj.rest;
    let simpleKeysPressed = stateObj.simpleKeysPressed;
    let numMistakenKeys = stateObj.numMistakenKeys;
    let quoteFinished = false;
    let timeStarted = stateObj.timeStarted;
    let timeEnded = stateObj.timeEnded;


    if (key.length == 1) {
        if (incorrect.length > 0) {
            incorrect = incorrect.concat(key);
            simpleKeysPressed++;
            numMistakenKeys++;
        }
        else {
            // Compare with key left to type, if they match then shift & unshift. Otherwise, set error.
            if (key == left.charAt(0)) {
                typed = typed.concat(left[0]);
                left = left.substring(1, left.length);
                simpleKeysPressed++;
            }
            else {
                incorrect = key;
                simpleKeysPressed++;
                numMistakenKeys++;
            }
        }

        // Set state
        if (left.length == 0) {
            quoteFinished = true;
            timeEnded = new Date().getTime() / 1000;
        }
        if (stateObj.quoteStarted == false) {
            timeStarted = new Date().getTime() / 1000;
        }

        setStateObj((prev: any)=>({
            ...prev,
            typed: typed,
            incorrect: incorrect,
            rest: left,
            quoteStarted: true,
            simpleKeysPressed: simpleKeysPressed,
            numMistakenKeys: numMistakenKeys,
            quoteFinished: quoteFinished,
            timeStarted: timeStarted,
            timeEnded: timeEnded
        }));
    }
}

export default TypingTest;