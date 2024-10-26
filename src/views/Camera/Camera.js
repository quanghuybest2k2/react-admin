import React, { useRef, useEffect, useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import ReactPlayer from 'react-player';
import '@tensorflow/tfjs';
import Swal from 'sweetalert2';
import DataTypeEnum from '../../DataTypeEnum';

const Camera = () => {
  const [url, setUrl] = useState('http://127.0.0.1:8081/stream.m3u8');
  const [selectedLocationValue, setSelectedLocationValue] = useState(DataTypeEnum.SENSORLOCATION.KV2);
  const [peopleCount, setPeopleCount] = useState(0);
  const videoRef = useRef();

  const handleLocationClick = (value) => {
    Swal.fire({
      title: 'Thông tin',
      text: `Bạn đã chọn ${value}`,
      icon: 'info',
      confirmButtonText: 'OK',
      timer: 1500,
    });
    setSelectedLocationValue(value);
  };

  useEffect(() => {
    const runObjectDetection = async () => {
      const net = await cocoSsd.load();
      setInterval(async () => {
        const predictions = await net.detect(videoRef.current.getInternalPlayer());
        const people = predictions.filter(prediction => prediction.class === 'person');
        setPeopleCount(people.length);
      }, 1000);
    };
    runObjectDetection();
  }, []);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Camera</CCardHeader>
          <CCardBody>
            <h6 className="text-body-secondary small">
              Thông tin căn bản <code>Camera</code>
            </h6>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="col-2">
                <h4>Khu vực</h4>
              </div>
              <div className="col-10">
                <CDropdown className="align-self-start">
                  <CDropdownToggle color="success">
                    {selectedLocationValue || DataTypeEnum.SENSORLOCATION.KV2}
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem onClick={() => handleLocationClick(DataTypeEnum.SENSORLOCATION.KV1)}>
                      KV1
                    </CDropdownItem>
                    <CDropdownItem onClick={() => handleLocationClick(DataTypeEnum.SENSORLOCATION.KV2)}>
                      KV2
                    </CDropdownItem>
                    <CDropdownItem onClick={() => handleLocationClick(DataTypeEnum.SENSORLOCATION.KV3)}>
                      KV3
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
            </div>
            <CCard className="mb-4">
              <CCardHeader>Camera 1</CCardHeader>
              <CCardBody>
                  <ReactPlayer ref={videoRef} url={url} playing controls width="100%" height="100%" />
                <p>Tổng số người: {peopleCount}</p>
              </CCardBody>
            </CCard>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Camera;