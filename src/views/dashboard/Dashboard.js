import React from 'react'
import Swal from 'sweetalert2'
import { CButton } from '@coreui/react'

const Dashboard = () => {
  const showDialogWithPassingParams = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          title: 'Deleted!',
          position: 'top-end',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        })
      }
    })
  }

  return (
    <div>
      <p>Hello world!</p>
      <CButton color="primary" onClick={showDialogWithPassingParams}>
        Click me
      </CButton>
    </div>
  )
}

export default Dashboard
