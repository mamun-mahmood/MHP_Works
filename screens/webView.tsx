import 'react-native-get-random-values';
import * as React from 'react';
import { WebView } from 'react-native-webview';

export default function CwebView() {
  return (
    <WebView androidHardwareAccelerationDisabled 
     
    source={{ uri: 'https://expo.io' }}
    />
  );
}