import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://online.dlu.edu.vn" target="_blank" rel="noopener noreferrer">
          DLU
        </a>
        <span className="ms-1">&copy; 2024 Đại học Đà Lạt.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Support </span>
        <a href="https://cntt.dlu.edu.vn" target="_blank" rel="noopener noreferrer">
          Khoa công nghệ thông tin
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
