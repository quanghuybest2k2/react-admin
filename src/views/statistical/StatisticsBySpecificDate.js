import React, { useEffect, useRef } from 'react'
import { CCard, CCardBody, CCol, CCardHeader } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

const createChartData = (data, label, dataKey) => {
  return {
    labels: data.map((item) => format(new Date(item.createAt), 'dd/MM/yyyy HH:mm:ss')),
    datasets: [
      {
        label: label,
        backgroundColor: 'rgb(61, 153, 245)',
        borderColor: 'rgb(237, 173, 33)',
        pointBackgroundColor: 'rgb(237, 173, 33)',
        pointBorderColor: '#fff',
        data: data.map((item) => item[dataKey]),
      },
    ],
  }
}

const StatisticsBySpecificDate = ({ data }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>Nhiệt độ</CCardHeader>
        <CCardBody>
          {data && data.length > 0 ? (
            <CChartLine data={createChartData(data, 'Temperature', 'temperature')} />
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </CCardBody>
        <CCardHeader>Độ ẩm</CCardHeader>
        <CCardBody>
          {data && data.length > 0 ? (
            <CChartLine data={createChartData(data, 'Humidity', 'humidity')} />
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </CCardBody>
        <CCardHeader>Độ sáng</CCardHeader>
        <CCardBody>
          {data && data.length > 0 ? (
            <CChartLine data={createChartData(data, 'Brightness', 'brightness')} />
          ) : (
            <p>Không có dữ liệu</p>
          )}
        </CCardBody>
      </CCard>
    </CCol>
  )
}

StatisticsBySpecificDate.propTypes = {
  data: PropTypes.array.isRequired,
}

export default StatisticsBySpecificDate
