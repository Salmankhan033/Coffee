import React, {createContext, useState} from 'react';
import Loading from '../HomeScreen'
export const DetailContext = createContext();

export const DetailProvider = props => {
  const [detail, setDetail] = useState([]);
  return (
    <DetailContext.Provider value={[detail, setDetail]}>
      {props.children}
      
    </DetailContext.Provider>
  );
};



