import {WeatherData} from '../services/WeatherData'
import {NearestTempLog} from './findNearestTempLog'
import {GeneratedCoordinates} from './GenerateCoordinates'
import { json } from 'express'


export class DaytimeData
{
    public rawWeatherData:any
    public weatherData:any
    public time:number
    public weather:string

    constructor(){
        this.rawWeatherData = new WeatherData()
        this.time = 0
        this.weatherData = {}
        this.weather = ''
    }

    setWeatherData = async (lat:number, long:number, date:string) => {
        this.weatherData = await this.rawWeatherData.getData(lat, long, date)
        if (this.weatherData.hourly){
            this.weatherData.date = date
        } else {
            this.weatherData.noRecords = 'Historical weather data unavailable'
        }
        return this.weatherData
        }

    getSunriseData = () => {
        if (!this.weatherData.noRecords){
            let nearestTempLogSunrise = new NearestTempLog()
        let closestTosunriseData = nearestTempLogSunrise.findNearest(this.weatherData, this.weatherData.daily.data[0].sunriseTime)
        return closestTosunriseData
        } else {
            return 'Unavailable'
        }
   }

   getMiddayData = () => {
       if (!this.weatherData.noRecords){
        let middayData = this.weatherData.hourly.data[11]
        if (middayData){
         return middayData
        } 
       } else {
        return 'Unavailable'
       }
   }

   getSunsetData = () => {
    if (!this.weatherData.noRecords){
        let nearestTempLogSunset = new NearestTempLog()
        let closestToSunsetData =  nearestTempLogSunset.findNearest(this.weatherData, this.weatherData.daily.data[0].sunsetTime)
        return closestToSunsetData
    } else {
        return 'Unavailable'
       }
   }

   getMidnightData = () => {
    if (!this.weatherData.noRecords){
        let middayData = this.weatherData.hourly.data[23]
    if (middayData){
     return middayData
    } 
    } else {
        return 'Unavailable'
       }
   }

   setDailyData = () => {
    if (this.weatherData.daily){
        this.weatherData.daily.data[0]
    } else {
        return 'Unavailable'
    }
   }

   compileDaytimeData = async (lat:number, long:number, date:string) => {
       await this.setWeatherData(lat, long, date)
       console.log('Sunrse : ' +this.weatherData.daily.data[0].sunriseTime)
       console.log('Sunset : '+this.weatherData.daily.data[0].sunsetTime)
       let daytimeData = {
           "date": this.weatherData.date,
           "latitude" : this.weatherData.latitude,
           "longitude" : this.weatherData.longitude,
           "timezone" : this.weatherData.offset,
           "daytimeData" : this.setDailyData(),
           "sunrise" : new Date(this.weatherData.daily.data[0].sunriseTime *1000),
           "sunset" : new Date(this.weatherData.daily.data[0].sunsetTime*1000),
           "sunriseData" : this.getSunriseData(),
           "middayData": this.getMiddayData(),
           "sunsetData": this.getSunsetData(),
           "midnightData" : this.getMidnightData()
       }
       return daytimeData
   }
}