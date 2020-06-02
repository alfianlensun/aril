import moment from 'moment'
export function secondsToHours(sec) {
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.round(seconds * 100) / 100
   
    var result = (hrs < 10 ? "0" + hrs : hrs);
    result += "-" + (min < 10 ? "0" + min : min);
    result += "-" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
}

export function formatDMYHIS(data)
{
    return moment(data).format('DD-MM-YYYY HH:mm:ss')
}

export function formaYMD(data)
{
    return moment(data).format('YYYY-MM-DD')
}

export function formatMonthOnly(data)
{
    return moment(data).format('MM')
}

export function formatYearOnly(data)
{
    return moment(data).format('YYYY')
}

export function formatHour(data)
{
    return moment(data).format('HH:mm:ss')
}

export function msToMinute(duration) {
    var milliseconds = parseInt((duration%1000)/100)
        , seconds = parseInt((duration/1000)%60)
        , minutes = parseInt((duration/(1000*60))%60)
        , hours = parseInt((duration/(1000*60*60))%24);
    
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds + "," + milliseconds;
}