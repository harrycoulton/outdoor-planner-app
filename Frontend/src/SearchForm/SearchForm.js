import React from 'react'
import Map from '../Map/MapContainer'
import './SearchForm.scss'

class SearchForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            "noData": true,
            "latitude": "",
            "longitude": "",
            "date": "",
            "today": this.formatDate(Date.now())
        }
    }

    formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    onSubmit = (event) => {
        event.preventDefault()
        if (event.target.latitude.value === '' || event.target.longitude.value === '' || event.target.date.value === '' ){
            this.setState({
                'submitFail' : true
            })
        } else {
        this.setState(
            {
                "noData": false,
                "latitude": event.target.latitude.value,
                "longitude": event.target.longitude.value,
                "date": event.target.date.value  
            }
        )
        this.sendFormData(event) 
        }   
    }

    sendFormData = (event) => {
        this.props.sendFormData({
            "search": true,
            'latitude': event.target.latitude.value,
            'longitude': event.target.longitude.value,
            'date': this.createThreeDates(event.target.date.value),
            'address': this.state.address
        })
    }

    retrieveCoords= (childData) => {
        this.setState({
            "mapLat": childData.latitude,
            "mapLng": childData.longitude,
            "address": childData.address
        })
  }


  createThreeDates = (date) => {
    let splitDate = date.split('-') 
    let newDateObject = {
        'date1': date,
        'date2': (parseInt(splitDate[0]-1))+'-'+splitDate[1]+'-'+splitDate[2],
        'date3': (parseInt(splitDate[0]-2))+'-'+splitDate[1]+'-'+splitDate[2]
    }
    return newDateObject
  }

  componentDidUpdate(){
    console.log(this.state.date)
  }


    render(){
        
        return(
            <div className="searchBox">
                <h2>Enter the coordinates and date below:</h2>
        <h3 className="errorMsg">{this.state.submitFail ? 'All fields are required' : ''}</h3>
                <form className="locationForm" onSubmit={this.onSubmit}>
                    <textarea className="textInput" type="text" name="latitude" value={this.state.mapLat} placeholder="Latitude" required></textarea>
                    <textarea className="textInput" type="text" name="longitude" value={this.state.mapLng} placeholder="Longitude"required ></textarea>
                    <input className="dateInput" type="date" name="date" min='2015-01-01' max={this.state.today} required></input>
                <input className="submit" type="submit"></input>
                </form>
                <h2>Or select on the map:</h2>
                <Map
                    retrieveCoords = {this.retrieveCoords}
                    google={this.props.google}
                    center={{lat: 51.4655, lng: -2.565}}
                    height='400px'
                    width='500px'
                    zoom={15}
                />
            </div>
        )
    }
}

export default SearchForm