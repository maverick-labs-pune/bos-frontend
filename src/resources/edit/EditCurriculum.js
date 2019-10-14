import React, { useEffect,useState } from 'react';
import Curriculum from '../common/Curriculum';
import api from '../../api';
import uniqueId from 'lodash/uniqueId';
import axios from 'axios';

export default function EditCurriculum(props) {
  const [initialData, setInitialData] = useState(null);
  const randomId = (type) => uniqueId(`${type}_`);
  useEffect(() => {
    /**
     * make do server curriculum data to represent 
     * internal data state
     */
    const ngoKey = localStorage.getItem("ngo_key");
    // axios.all([api.getFileDropdownOptionsForNgo(ngoKey),api.getMeasurementDropdownOptionsForNgo(ngoKey)])
    //   .then(axios.spread((fileMaster,measurementMaster) => {
        
    //   }))
    api.getResource(props.match.params.id).then(({data : response}) => {
      const {data : days} = response;
      const initialData = days.map((day) => {
        const id = randomId('day');
        const {label} = day;
        const sessions = day.sessions.map((session) => {
          const {label} = session;
          const id = randomId('session');
          const files = session.files.map((file) => {
            return {label : file.key,id : randomId('file')}
          })
          files.push({ "id": -998 });
          const measurements = session.measurements.map((measurement) => {
            return {label : measurement.key,id : randomId('measurement')}
          })
          measurements.push({ "id": -997 });
          return {label,id,files,measurements};
        })
        sessions.push({ "id": -999, "measurements": [], "files": [] });
        return {id,label,sessions};
      })
      initialData.push({ "id": -999 });
      // console.log(initialData);
      setInitialData(initialData);
    })
  },[]);
  return(
    !initialData ? null :
    <Curriculum initialData={initialData}/>
  )
}