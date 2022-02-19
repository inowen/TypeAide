
/**
 * 
 * @param props: Object containing the values status:string, numSeconds:real, wpm:real, cpm:real, accuracyPercentage:real
 * @returns 
 */
function StatsDisplay(props: any) {

    return <div className="statsdisplay">
        Status: {props.status}<br/>
        Timer: {props.numSeconds.toFixed(2)} seconds<br/><br/>
        WPM: {props.wpm.toFixed(2)}<br/>
        CPM: {props.cpm.toFixed(2)}<br/>
        Accuracy: {props.accuracyPercentage.toFixed(2)}%
    </div>
}


export default StatsDisplay;