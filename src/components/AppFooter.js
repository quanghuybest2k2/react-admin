import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  const year = new Date().getFullYear()

  return (
    <CFooter>
      <div className="d-flex justify-content-center align-items-center w-100">
        &copy; {year} &nbsp;
        <a href="https://github.com/quanghuybest2k2" target="__blank" rel="noopener noreferrer">
          Đoàn Quang Huy
        </a>
        <span className="ms-1"> All Rights Reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
