import React from 'react'
import Searchbox from '../SearchForm/SearchForm'
import Weatherdata from '../Weatherdata/Weatherdata'
import './App.scss';
import lines from 'svg-patterns/p/lines';
import stringify from 'virtual-dom-stringify';

const HeroPattern = ({ pttrn, children }) =>
  <div className={pttrn}>
    {children}
  </div>

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      "noData": true
    }
  }

  retrieveFormData = (childData) => {
    this.setState({
      'search': childData.search,
      'noData': false,
      'latitude': childData.latitude,
      'longitude': childData.longitude,
      "address": childData.address,
      'date': childData.date
    })
  }

  render(){
    return (
      <div className="App">
         <HeroPattern pttrn={'topography-pattern'}>
            <div className="main">
            <div className="search">
              <Searchbox sendFormData={this.retrieveFormData}></Searchbox>
            </div>
            <div className="results">
            <Weatherdata noData={this.state.noData} latitude={this.state.latitude} longitude={this.state.longitude} date={this.state.date ? this.state.date.date1 : ''} address={this.state.address}/>
            {/* <Weatherdata noData={this.state.noData} latitude={this.state.latitude} longitude={this.state.longitude} date={this.state.date ? this.state.date.date2 : ''} address={this.state.address}/>
            <Weatherdata noData={this.state.noData} latitude={this.state.latitude} longitude={this.state.longitude} date={this.state.date ? this.state.date.date3 : ''} address={this.state.address}/> */}
            </div>
         </div>
          </HeroPattern>
          <footer>
          </footer>
      </div>
    );
  }
} 



export default App