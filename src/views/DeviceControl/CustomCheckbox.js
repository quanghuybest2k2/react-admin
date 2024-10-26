import React from 'react'
import PropTypes from 'prop-types'

import { CCol, CRow, CFormCheck } from '@coreui/react'

const CustomCheckbox = ({ label, defaultChecked, onChange }) => {
  return (
    <CRow>
      <CCol sm={6}>
        <CFormCheck label={label} defaultChecked={defaultChecked} onChange={onChange} />
      </CCol>
    </CRow>
  )
}

CustomCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default CustomCheckbox
