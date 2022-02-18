import { isAbsolute } from 'path/posix';
import React from 'react';

const twdStyle = {
    border: "2px solid black",
    backgroundColor: "lightgray"
};

/**
 * 
 * @param props: Object containing fields: left, error, right. 
 */
function TextWindow(props: any) {
    let leftSide = props.left;
    let error = props.error;
    let rightSide = props.right;

    // Text on the right shouldn't move because of mistakes
    rightSide = rightSide.substring(error.length, rightSide.length);

    return <div style={twdStyle} className="textwindow">
        <span className="quoteLeft">{leftSide}</span>
        <span className="quoteError">{error}</span>
        <span className="quoteRight">{rightSide}</span>
    </div>
}

export default TextWindow;