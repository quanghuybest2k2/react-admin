import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { CButton, CModal, CModalBody, CModalHeader, CModalFooter, CModalTitle } from '@coreui/react'

const Dashboard = () => {
  // visible show model
  const [visible, setVisible] = useState(false)

  const showDialogWithPassingParams = () => {
    setVisible(true)
  }

  const handleDeleteConfirmed = () => {
    Swal.fire({
      icon: 'success',
      text: 'Xóa thành công',
      showConfirmButton: false,
      position: 'top-end',
      toast: true,
      timer: 2000,
      timerProgressBar: true,
      showClass: {
        popup: `
                animate__animated
                animate__fadeInRight
                animate__faster
            `,
      },
    })
    setVisible(false)
  }

  return (
    <>
      <div>
        <p>Hello world!</p>
        <CButton color="primary" onClick={showDialogWithPassingParams}>
          Click me
        </CButton>
      </div>
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="Xóa lịch"
      >
        <CModalHeader>
          <CModalTitle>Bạn có chắc muốn xóa mục này?</CModalTitle>
        </CModalHeader>
        <CModalBody>Dữ liệu sẽ không thể khôi phục. Bạn có muốn tiếp tục?</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => handleDeleteConfirmed()}>
            Xác nhận
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Hủy bỏ
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Dashboard
