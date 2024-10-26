import { CCard, CCardBody, CCol, CRow, CCardHeader, CFormSwitch } from '@coreui/react'
import CustomCheckbox from './CustomCheckbox'
import React, { useEffect, useState } from 'react'
import InformationEnvironment from '../widgets/InformationEnvironment'
import CIcon from '@coreui/icons-react'
import { cibDiscover } from '@coreui/icons'

const GreenhouseA2 = () => {
  const [switchStates, setSwitchStates] = useState({
    fan: true,
    light2: false,
    light3: true,
    lightS: true,
  })

  const [checkboxes, setCheckboxes] = useState({
    parametersAutomatically: false,
    scheduledAutomation: false,
  })

  useEffect(() => {
    setCheckboxes({
      parametersAutomatically: false,
      scheduledAutomation: false,
    })
  }, [])

  const handleSwitchChange = (switchName) => {
    setSwitchStates({
      ...switchStates,
      [switchName]: !switchStates[switchName],
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

  const renderSwitchControl = (label, switchName) => (
    <CRow>
      <CCol sm={6}>
        <CFormSwitch
          label={label}
          defaultChecked={switchStates[switchName]}
          onChange={() => handleSwitchChange(switchName)}
        />
      </CCol>
      <CCol sm={6}>
        <CIcon
          icon={cibDiscover}
          size="xl"
          style={{ color: switchStates[switchName] ? '#249542' : '#db5d5d' }}
        />
      </CCol>
    </CRow>
  )

  return (
    <>
      <InformationEnvironment className="mb-4" />
      <CCard className="mb-4">
        <CCardHeader>
          <code>Greenhouse A3</code>
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
            <CCol sm={6}>
              <h4>Controller 1</h4>
              {renderSwitchControl('Quạt', 'fan')}
              {renderSwitchControl('Đèn 2', 'light2')}
              {renderSwitchControl('Đèn 3', 'light3')}
            </CCol>
            <CCol sm={6}>
              <h4>Controller 2</h4>
              {renderSwitchControl('Đèn S', 'lightS')}
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </>
  )
}

export default GreenhouseA2
