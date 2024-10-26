import React, { Component } from 'react'
import { MapContainer, GeoJSON, TileLayer, Marker } from 'react-leaflet'
import mapData from '../../data/dalat.json'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

class MyMap extends Component {
  state = { color: '#9f224e' }

  // colors = ['red', 'blue', 'yellow', 'orange', 'grey']

  componentDidMount() {
    // console.log(mapData)
  }

  countryStyle = {
    fillColor: 'red',
    fillOpacity: 0.5,
    color: 'black',
    weight: 2,
  }

  printMesssageToConsole = (event) => {
    console.log('Clicked')
  }

  changeCountryColor = (event) => {
    event.target.setStyle({
      color: 'green',
      fillColor: this.state.color,
      fillOpacity: 1,
    })
  }

  onEachCountry = (country, layer) => {
    const countryName = country.properties.Name_0
    console.log(countryName)
    layer.bindPopup(countryName)

    layer.options.fillOpacity = Math.random() //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * this.colors.length)
    // layer.options.fillColor = this.colors[colorIndex] //0

    layer.on({
      click: this.changeCountryColor,
    })
  }

  colorChange = (event) => {
    this.setState({ color: event.target.value })
  }

  render() {
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>Distribution location</h3>
        <MapContainer
          style={{ height: '90vh', width: 'auto' }}
          minZoom={12}
          maxZoom={12}
          zoom={12}
          center={[11.937937736511287, 108.435295104980412]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON
            style={this.countryStyle}
            data={mapData.features}
            onEachFeature={this.onEachCountry}
          />
          <Marker
            position={[11.937937736511287, 108.435295104980412]}
            icon={
              new L.Icon({
                iconUrl:
                  'https://th.bing.com/th/id/R.87eea5f5db0b138dc45dfb403570df6f?rik=ZHJJKvvhJPtMGw&pid=ImgRaw&r=0',
                iconSize: [41, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })
            }
          />
          <Marker
            position={[11.956974492192517, 108.4446876941398]}
            icon={
              new L.Icon({
                iconUrl:
                  'https://th.bing.com/th/id/R.87eea5f5db0b138dc45dfb403570df6f?rik=ZHJJKvvhJPtMGw&pid=ImgRaw&r=0',
                iconSize: [41, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
              })
            }
          />
        </MapContainer>
        <input type="color" value={this.state.color} onChange={this.colorChange} />
      </div>
    )
  }
}

export default MyMap
