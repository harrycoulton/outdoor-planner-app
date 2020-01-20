import React from 'react'
import WeatherTile from '../WeatherTiles/WeatherTile'
import './Weatherdata.scss'

class Weatherdata extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {}
        }

    apiCall = async () => {
        await fetch('http://localhost:2000/?latitude='+this.props.latitude+'&longitude='+this.props.longitude+'&date='+this.props.date)
        .then(results => {
            return results.json()
        }) 
        .then(data => {
            this.setState(
                {data}
                )
        })
    }

    componentDidUpdate(prevProps){
       if(this.props.noData !== prevProps.noData)
       {
        this.apiCall()
       } else if (this.props.latitude !== prevProps.latitude || this.props.longitude !== prevProps.longitude || this.props.date !== prevProps.date){
        this.apiCall()
       }
    }

    render(){

        return(
            <div>
                <div className="locationInfo">
                    <h2>{this.props.noData ? '' : 'Weather Data for:'}</h2>
                    <p>{this.props.address ? this.props.address : ' '}</p>
                    <p>{this.props.noData ? '' : 'Latitude: '+this.props.latitude}</p>
                    <p>{this.props.noData ? '' : 'Longitude: '+this.props.longitude}</p>
                </div>
                <div className="dateTile">
                <h3>{this.props.date ? 'On '+ this.props.date : ''}</h3>
                <div className="weatherTiles">
                <WeatherTile className="Sunrise" name={'Sunrise'} data={this.state.data ? this.state.data.sunriseData : 'Enter Weather Data'} noData={this.props.noData}></WeatherTile>
                <WeatherTile className="Sunset" name={'Sunset'} data={this.state.data ? this.state.data.sunsetData : 'Enter Weather Data'} noData={this.props.noData}></WeatherTile>
                <WeatherTile className="Midday" name={'Midday'} data={this.state.data ? this.state.data.middayData : 'Enter Weather Data'} noData={this.props.noData}></WeatherTile>
                <WeatherTile className="Midnight" name={'Midnight'} data={this.state.data ? this.state.data.midnightData : 'Enter Weather Data'} noData={this.props.noData}></WeatherTile>
                </div>
                </div>
            </div>
        )
    }
}

export default Weatherdata