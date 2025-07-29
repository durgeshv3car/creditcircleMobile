import ReactNativeIdfaAaid, { AdvertisingInfoResponse } from '@sparkfabrik/react-native-idfa-aaid';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const Ads: React.FC = () => {
  const [idfa, setIdfa] = useState<string | null>(null);

  useEffect(() => {
    ReactNativeIdfaAaid.getAdvertisingInfo()
      .then((res: AdvertisingInfoResponse) =>
        !res.isAdTrackingLimited ? setIdfa(res.id) : setIdfa(null),
      )
      .catch((err) => {
        console.log('Error fetching advertising ID:', err);
        setIdfa(null);
      });
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>IDFA/AAID: {idfa ?? 'Unavailable or Limited'}</Text>
    </View>
  );
};

export default Ads;
