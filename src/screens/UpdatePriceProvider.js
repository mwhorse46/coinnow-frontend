import { useEffect } from 'react';
import getApi from '@apis/getApi';
const UpdatePriceProvider = ({ children }) => {
  const somethingApi = async () => {
    return await getApi.getData('autoPriceChange');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      somethingApi();
    }, 300000);
    return () => clearInterval(interval);
  }, []);
  return children;
};
export default UpdatePriceProvider;
