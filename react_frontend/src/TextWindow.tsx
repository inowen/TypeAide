import { isAbsolute } from 'path/posix';
import React from 'react';

/**
 * 
 * @param props: Object containing fields: left, error, right. 
 */
function TextWindow(props: any) {
    let leftSide = props.left;
    let error = props.error;
    let rightSide = props.right;

    // Text on the right shouldn't move because of mistakes
    error = rightSide.substring(0, error.length);
    rightSide = rightSide.substring(error.length, rightSide.length);

    return <div className="textwindow">
        <span className="quoteLeft">{leftSide}</span>
        <span className="quoteError">{error}</span>
        <span className="quoteRight">{rightSide}</span>
    </div>
}

export default TextWindow;