import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CWidgetStatsC,
  CWidgetStatsE,
  CWidgetStatsF,
} from '@coreui/react'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilArrowRight } from '@coreui/icons'

import InformationEnvironment from '../widgets/InformationEnvironment'
import axios from 'axios'
import config from '../../config'

const Dashboard = () => {
  const [farms, setFarms] = useState([])
  const [scheduledstatus, setScheduledStatus] = useState({})

  // call api
  const getDevices = async () => {
    await axios.get(`${config.API_URL}/farms`).then((res) => {
      // console.log(res.data.results)
      if (res.data.results) {
        setFarms(res.data.results)
      } else {
        setFarms([])
      }
    })
  }

  // get Scheduled Status
  const getScheduledStatus = async () => {
    await axios.get(`${config.API_URL}/schedules/scheduledstatus`).then((res) => {
      // console.log(res.data)
      if (res.data) {
        setScheduledStatus(res.data)
      } else {
        setScheduledStatus({})
      }
    })
  }

  useEffect(() => {
    getDevices()
    getScheduledStatus()
  }, [])
  const cameras = [
    {
      id: 1,
      name: 'Camera 1',
      imageUrl: 'http://113.165.96.220:82/webcapture.jpg?command=snap&channel=1?1714539910',
    },
    {
      id: 2,
      name: 'Camera 2',
      imageUrl: 'http://103.99.244.170:8084/webcapture.jpg?command=snap&channel=1?1714539968',
    },
    {
      id: 3,
      name: 'Camera 3',
      imageUrl: 'http://113.165.166.204:83/webcapture.jpg?command=snap&channel=1?1714540410',
    },
  ]

  return (
    <>
      <InformationEnvironment className="mb-4" />
      {/* Thống kê */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Thống kê</CCardHeader>
            <CCardBody>
              <p className="text-body-secondary small">
                Xem chi tiết biểu đồ <code>Thống kê </code>
                <Link to="/statistical">
                  <u>tại đây</u>
                </Link>
              </p>
              <CRow>
                <CCol xs={6}>
                  <CWidgetStatsE
                    className="mb-3"
                    chart={
                      <CChartBar
                        className="mx-auto"
                        style={{ height: '40px', width: '80px' }}
                        data={{
                          labels: [
                            'M',
                            'T',
                            'W',
                            'T',
                            'F',
                            'S',
                            'S',
                            'M',
                            'T',
                            'W',
                            'T',
                            'F',
                            'S',
                            'S',
                            'M',
                          ],
                          datasets: [
                            {
                              backgroundColor: '#321fdb',
                              borderColor: 'transparent',
                              borderWidth: 1,
                              data: [41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47],
                            },
                          ],
                        }}
                        options={{
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              display: false,
                            },
                            y: {
                              display: false,
                            },
                          },
                        }}
                      />
                    }
                    title="Thống kê trong một khoảng"
                    value="Nhiệt độ - Độ ẩm - Độ sáng"
                  />
                </CCol>
                <CCol xs={6}>
                  <CWidgetStatsE
                    className="mb-3"
                    chart={
                      <CChartLine
                        className="mx-auto"
                        style={{ height: '40px', width: '80px' }}
                        data={{
                          labels: [
                            'M',
                            'T',
                            'W',
                            'T',
                            'F',
                            'S',
                            'S',
                            'M',
                            'T',
                            'W',
                            'T',
                            'F',
                            'S',
                            'S',
                            'M',
                          ],
                          datasets: [
                            {
                              backgroundColor: 'transparent',
                              borderColor: '#321fdb',
                              borderWidth: 2,
                              data: [41, 78, 51, 66, 74, 42, 89, 97, 87, 84, 78, 88, 67, 45, 47],
                            },
                          ],
                        }}
                        options={{
                          maintainAspectRatio: false,
                          elements: {
                            line: {
                              tension: 0.4,
                            },
                            point: {
                              radius: 0,
                            },
                          },
                          plugins: {
                            legend: {
                              display: false,
                            },
                          },
                          scales: {
                            x: {
                              display: false,
                            },
                            y: {
                              display: false,
                            },
                          },
                        }}
                      />
                    }
                    title="Thống kê theo ngày cụ thể"
                    value="Nhiệt độ - Độ ẩm - Độ sáng"
                  />
                </CCol>
              </CRow>
              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* Điều khiển thiết bị */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Điều khiển thiết bị</CCardHeader>
            <CCardBody>
              <p className="text-body-secondary small">
                Xem chi tiết thông tin <code>Điều khiển thiết bị </code>
                <Link to="/greenhouse-a1">
                  <u>tại đây</u>
                </Link>
              </p>
              <CRow>
                {farms.map((farm) => (
                  <CCol xs={6} key={farm.id}>
                    <CWidgetStatsF
                      className="mb-3"
                      color="primary"
                      footer={
                        <Link
                          className="font-weight-bold font-xs text-body-secondary"
                          to="/greenhouse-a1"
                        >
                          Xem thêm
                          <CIcon icon={cilArrowRight} className="float-end" width={16} />
                        </Link>
                      }
                      icon={<CIcon icon={cilChartPie} height={24} />}
                      title={`${farm.name}`}
                      value={`${farm.active} Bật - ${farm.off} Tắt`}
                    />
                  </CCol>
                ))}
              </CRow>
              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* cấu hình tự động */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Cấu hình tự động</CCardHeader>
            <CCardBody>
              <p className="text-body-secondary small">
                Xem chi tiết thông tin <code>Cấu hình thiết bị </code>
                <Link to="/auto-config">
                  <u>tại đây</u>
                </Link>
              </p>
              <CRow>
                <CCol xs={6}>
                  <CWidgetStatsC
                    className="mb-3"
                    color="success"
                    icon={<CIcon icon={cilChartPie} height={36} />}
                    progress={{ color: 'light', value: 50 }}
                    text="Widget helper text"
                    title="Đang hoạt động"
                    value={`${scheduledstatus.on} lịch trình`}
                  />
                </CCol>
                <CCol xs={6}>
                  <CWidgetStatsC
                    className="mb-3"
                    color="danger"
                    icon={<CIcon icon={cilChartPie} height={36} />}
                    inverse
                    progress={{ color: 'light', value: 50 }}
                    text="Widget helper text"
                    title="Không hoạt động"
                    value={`${scheduledstatus.off} lịch trình`}
                  />
                </CCol>
              </CRow>
              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* camera */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Camera</CCardHeader>
            <CCardBody>
              <p className="text-body-secondary small">
                Xem chi tiết thông tin <code>Camera </code>
                <Link to="/camera">
                  <u>tại đây</u>
                </Link>
              </p>
              <CRow>
                {cameras.map((camera) => (
                  <CCol xs="12" sm="6" md="4" lg="3" key={camera.id}>
                    <CCard className="mb-4">
                      <CCardHeader>{camera.name}</CCardHeader>
                      <CCardBody>
                        <TransformWrapper>
                          <TransformComponent>
                            <img
                              src={camera.imageUrl}
                              alt={camera.name}
                              style={{ width: '100%' }}
                            />
                          </TransformComponent>
                        </TransformWrapper>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
