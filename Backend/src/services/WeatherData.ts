import rp from 'request-promise-native'

export class WeatherData
{
    async getData(lat:number, long:number, date:string):Promise<object>{
        let time = Date.parse(date)/1000
        let weatherData = await rp('https://api.darksky.net/forecast/'+process.env.DARK_SKY_KEY+'/'+lat+','+long+','+time+'?units=si&exclude=currently,flags')
        return JSON.parse(weatherData)
    }
}