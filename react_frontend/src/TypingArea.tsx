import React from 'react';
import TextWindow from './TextWindow';
import './TypingArea.css';

function TypingArea() {
    return (
        <div className="typingarea">
            <div className="vcenterflex">
                <TextWindow/>
            </div>
        </div>
    );
}

export default TypingArea;