
/**
 * 
 * @param props: Object containing the strings status, timer, wpm, cpm, accuracy
 * @returns 
 */
function StatsDisplay(props: any) {
    return <div className="statsdisplay">
        Status: {props.status}<br/>
        Timer: {props.timer}<br/>
        WPM: {props.wpm}<br/>
        CPM: {props.cpm}<br/>
        Accuracy: {props.accuracy}
    </div>
}


export default StatsDisplay;