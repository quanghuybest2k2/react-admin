import { CCard, CCardBody, CCol, CRow, CCardHeader } from '@coreui/react'
import CustomCheckbox from './CustomCheckbox'
import React, { useEffect, useState } from 'react'
import InformationEnvironment from '../widgets/InformationEnvironment'
import CIcon from '@coreui/icons-react'
import { cibDiscover } from '@coreui/icons'
import * as signalR from '@microsoft/signalr'
import axios from 'axios'
import config from '../../config'

const GreenhouseA1 = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [connection, setConnection] = useState(null)
  const [location, setLocation] = useState(null)
  const [deviceStatusCode, setDeviceStatusCode] = useState(null)
  const [fetchDataCompleted, setFetchDataCompleted] = useState(false)
  const [sensorData, setSensorData] = useState({ Status: [] })

  const [checkboxes, setCheckboxes] = useState({
    parametersAutomatically: false,
    scheduledAutomation: false,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`${config.API_URL}/farms`)
        setLocation(response.data.results[1])
        setDeviceStatusCode(response.data.results[1].deviceStatusCode)
        setFetchDataCompleted(true)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data: ', error)
        setIsLoading(false)
      }
    }

    const connectSignalR = async () => {
      if (!fetchDataCompleted) return
      try {
        setIsLoading(true)
        const connect = new signalR.HubConnectionBuilder()
          .withUrl(`${config.BASE_URL}/farmhub`)
          .withAutomaticReconnect()
          .build()

        //  esp8266/ledStatus
        connect.on(deviceStatusCode ?? '', (dataString) => {
          try {
            const data = JSON.parse(dataString)
            console.log('Parsed data:', data)
            setSensorData(data)
          } catch (error) {
            console.error('Error parsing JSON string:', error)
          }
        })

        await connect.start()
        console.log('Connected!')
        setConnection(connect)
        setIsLoading(false)
        return () => {
          connect.stop()
        }
      } catch (err) {
        console.error('Error while establishing connection:', err)
        setIsLoading(false)
      }
    }

    fetchData()
    connectSignalR()

    // Clean up
    return () => {
      if (connection) {
        connection.stop()
      }
    }
  }, [fetchDataCompleted])

  const controlDevice = (device, statusDevice) => {
    const postData = {
      topicName: device.controllerCode,
      payload: {
        id: device.id,
        status: statusDevice,
        order: device.order,
      },
    }

    axios
      .post(`${config.API_URL}/controldevices`, postData)
      .then((response) => {})
      .catch((error) => {
        console.error('Error controlling device:', error)
      })
  }

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxes({
      ...checkboxes,
      [checkboxName]: !checkboxes[checkboxName],
    })
    if (!checkboxes[checkboxName]) {
      alert(`${checkboxName} đã check`)
    } else {
      alert(`${checkboxName} đã bỏ check`)
    }
  }

  return (
    <>
      <InformationEnvironment className="mb-4" />
      <CCard className="mb-4">
        <CCardHeader>
          <code>Nhà kính A1</code>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm={6}>
              <CustomCheckbox
                label="Parameters Automatically"
                defaultChecked={checkboxes.parametersAutomatically}
                onChange={() => handleCheckboxChange('parametersAutomatically')}
              />
            </CCol>
            <CCol sm={6}>
              <CustomCheckbox
                label="Scheduled Automation"
                defaultChecked={checkboxes.scheduledAutomation}
                onChange={() => handleCheckboxChange('scheduledAutomation')}
              />
            </CCol>
          </CRow>
          <CRow className="mt-5">
            {/* display devices */}
            <CCol sm={6}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {location && (
                    <>
                      <h4>{location.name}</h4>
                      {location.devices?.map((device) => (
                        <CRow key={device.id}>
                          <CCol sm={6}>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                onChange={() =>
                                  controlDevice(device, !sensorData.Status[device.order])
                                }
                                checked={sensorData.Status[device.order]}
                              />
                              <label className="form-check-label">{device.name}</label>
                            </div>
                          </CCol>
                          <CCol sm={6}>
                            <CIcon
                              icon={cibDiscover}
                              size="xl"
                              style={{
                                color: sensorData.Status[device.order] ? '#249542' : '#db5d5d',
                              }}
                            />
                          </CCol>
                        </CRow>
                      ))}
                    </>
                  )}
                </>
              )}
            </CCol>
            {/* end display devices */}
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default GreenhouseA1
