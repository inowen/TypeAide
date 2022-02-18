import React from 'react';
import { useRef, useEffect } from 'react';
import TextWindow from './TextWindow';
import './TypingArea.css';

function TypingArea() {
    const thisRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (thisRef.current != null) {
            thisRef.current.focus();
        }
    }, []);
    return (
        <div className="typingarea" ref={thisRef} tabIndex={1}>
            <div className="vcenterflex">
                <TextWindow/>
            </div>
        </div>
    );
}

export default TypingArea;