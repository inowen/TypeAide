import { isAbsolute } from 'path/posix';
import React from 'react';

const twdStyle = {
    border: "2px solid black",
    backgroundColor: "lightgray"
};

function TextWindow() {
    return <div style={twdStyle} className="textwindow">
        A text window.
    </div>
}

export default TextWindow;