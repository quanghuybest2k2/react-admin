import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CBadge,
  CLink,
  CButton,
  CTableHead,
  CTableHeaderCell,
} from '@coreui/react'

function DetailConfig() {
  const [loading, setLoading] = useState(true)
  const [scheduleDetail, setScheduleDetail] = useState([])
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`${config.API_URL}/schedules/${id}`)
      .then((response) => {
        // console.log(response.data)
        setScheduleDetail(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching schedule detail:', error)
        setLoading(false)
      })
  }, [id])

  return (
    <div>
      <CCard>
        <CCardHeader>
          <strong>Thông tin chi tiết lập lịch</strong>
          <CLink href="#/auto-config">
            <CButton className="float-end" color="primary">
              Trở về
            </CButton>
          </CLink>
        </CCardHeader>
        <CCardBody>
          <CTable striped bordered hover responsive>
            <CTableBody>
              {loading ? (
                <CTableRow>
                  <CTableDataCell colSpan="2">Loading...</CTableDataCell>
                </CTableRow>
              ) : (
                <>
                  <CTableRow>
                    <CTableDataCell>Loại</CTableDataCell>
                    <CTableDataCell>
                      {scheduleDetail.type === 1
                        ? 'Nhiệt độ'
                        : scheduleDetail.type === 2
                          ? 'Độ ẩm'
                          : 'Độ sáng'}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Khu vực</CTableDataCell>
                    <CTableDataCell>{scheduleDetail.farmName}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Danh sách thiết bị</CTableDataCell>
                    <CTableDataCell>
                      <CTable striped bordered hover responsive>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell scope="col">Tên thiết bị</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {scheduleDetail.deviceSchedules.map((deviceSchedule) => (
                            <CTableRow key={deviceSchedule.deviceId}>
                              <CTableDataCell>{deviceSchedule.name}</CTableDataCell>
                              <CTableDataCell>
                                <CBadge color={deviceSchedule.statusDevice ? 'success' : 'danger'}>
                                  {deviceSchedule.statusDevice ? 'Bật' : 'Tắt'}
                                </CBadge>
                              </CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Từ giá trị</CTableDataCell>
                    <CTableDataCell>{scheduleDetail.startValue}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Đến giá trị</CTableDataCell>
                    <CTableDataCell>{scheduleDetail.endValue}</CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Từ ngày</CTableDataCell>
                    <CTableDataCell>
                      {format(new Date(scheduleDetail.startDate), 'dd/MM/yyyy HH:mm:ss')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Đến ngày</CTableDataCell>
                    <CTableDataCell>
                      {format(new Date(scheduleDetail.endDate), 'dd/MM/yyyy HH:mm:ss')}
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>Tình trạng</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={scheduleDetail.isActive ? 'success' : 'danger'}>
                        {scheduleDetail.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                      </CBadge>
                    </CTableDataCell>
                  </CTableRow>
                </>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default DetailConfig
