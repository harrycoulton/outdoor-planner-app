export class NearestTempLog
{
    findNearest = (weatherData:any, time:number) => {

        console.log(time)
        let tempHourlyArray:Array<any> = []

        let hourlyData = weatherData.hourly.data

         hourlyData.forEach(function(hour:any) {
            tempHourlyArray.push(hour.time)
        })
        var closestToTime = tempHourlyArray.reduce(function(prev, curr) {
            return (Math.abs(curr - (time)) < Math.abs(prev - time) ? curr : prev)
        })
        let closestToTimeData:any = {}
        hourlyData.forEach((hour:any) => {
            if (hour.time === closestToTime){
                hour.timeParsed = new Date(hour.time)
                closestToTimeData = hour
            }
        })
        return closestToTimeData
    }
}