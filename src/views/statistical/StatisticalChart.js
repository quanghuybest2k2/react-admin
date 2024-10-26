import React, { useEffect, useRef } from 'react'
import { CCard, CCardBody, CCol, CCardHeader } from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import DataTypeEnum from '../../DataTypeEnum'

const StatisticalChart = ({ data, dataType }) => {
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

  const getLabel = () => {
    switch (dataType) {
      case DataTypeEnum.TEMPERATURE:
        return 'Nhiệt độ'
      case DataTypeEnum.HUMIDITY:
        return 'Độ ẩm'
      case DataTypeEnum.BRIGHTNESS:
        return 'Độ sáng'
      default:
        return 'Dữ liệu'
    }
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>{getLabel()}</CCardHeader>
        <CCardBody>
          {data && data.length > 0 ? (
            <CChartLine
              data={{
                labels: data.map((item) => format(new Date(item.date), 'dd/MM/yyyy')),
                datasets: [
                  {
                    label: getLabel(),
                    backgroundColor: 'rgba(255, 46, 99, 0.2)',
                    borderColor: 'rgba(255, 46, 99, 1)',
                    pointBackgroundColor: 'rgba(255, 46, 99, 1)',
                    pointBorderColor: '#fff',
                    data: data.map((item) => {
                      switch (dataType) {
                        case DataTypeEnum.TEMPERATURE:
                          return item.averageTemperature
                        case DataTypeEnum.HUMIDITY:
                          return item.averageHumidity
                        case DataTypeEnum.BRIGHTNESS:
                          return item.averageBrightness
                        default:
                          return 0
                      }
                    }),
                  },
                ],
              }}
            />
          ) : (
            <p>No data available</p>
          )}
        </CCardBody>
      </CCard>
    </CCol>
  )
}

StatisticalChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataType: PropTypes.string.isRequired,
}

export default StatisticalChart
