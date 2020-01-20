import React from 'react'
import WeatherIcon from 'react-icons-weather'
import './WeatherTile.scss'

class WeatherTile extends React.Component
{
    constructor(props){
        super(props)
        this.state ={

        }
    }

    ConditionalTiles = () => {
        if(!this.props.noData){
            return <div className="weatherTile" id={this.props.name}>
                       <div className='titleIcon'>
                       <h3> {this.props.data.temperature ? this.props.name : ''} </h3>
                        <WeatherIcon name="darksky" iconId={this.props.data.icon ? this.props.data.icon : 'cloudy'} flip="horizontal" rotate="90"/>
                       </div>
                        <p>{this.props.data.summary ? this.props.data.summary : ' '}</p>
                        <p>{this.props.data.temperature ? 'Temperature: '+ this.props.data.temperature +'°C' : ' '}</p>
                    </div>
        } else {
            return <p></p>
        }
    }

    render(){
        
        return(
            <this.ConditionalTiles/>
        )
    }
}



export default WeatherTile