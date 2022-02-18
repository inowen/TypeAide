import { isAbsolute } from 'path/posix';
import React from 'react';

const twdStyle = {
    border: "2px solid black",
    backgroundColor: "lightgray"
};

function TextWindow(props: any) {
    return <div style={twdStyle} className="textwindow">
        A text window.
        The quote: <br/> <br/>
        <span>{props.left}</span>
        <span>{props.error}</span>
        <span>{props.right}</span>
    </div>
}

export default TextWindow;