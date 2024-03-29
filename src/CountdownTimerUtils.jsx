 import dayjs from 'dayjs';

 export function getRemainingTimeUnitMsTimestamp(timestampMs) {
    const timestampDayjs = dayjs(timestampMs);
    const nowDayjs = dayjs();
    if (timestampDayjs.isBefore(nowDayjs)) {
       localStorage.setItem("timeOut", true);
        return {
            seconds: '00',
            minutes: '00',
        }
    }
    return {
        seconds : getRemainingSeconds(nowDayjs , timestampDayjs),
        minutes: getRemainingMinutes(nowDayjs , timestampDayjs),
    };
 }

 function getRemainingSeconds(nowDayjs , timestampDayjs) {
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60;
    return padWithZeros(seconds, 2);
 }

 function getRemainingMinutes(nowDayjs , timestampDayjs) {
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60;
    return padWithZeros(minutes, 2);
 }

 function padWithZeros(number, minLength) {
    const numberString = number.toString();
    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString;
 }