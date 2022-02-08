/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React,{useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Base64 } from './src/lib/base64';
global.Buffer = global.Buffer || require('buffer').Buffer


import { BleManager, Device } from 'react-native-ble-plx';
const manager = new BleManager();



const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  // state to give the user a feedback about the manager scanning devices
  //const [isLoading, setIsLoading] = useState(false);

  let base64ToHex = str => {
    const buffer = Buffer.from(str, 'base64');
    const bufString = buffer.toString('hex');
    return bufString
    //return Base64.decode(str);
  }

 
  let beratDariTimabahagan = strBase64 => {
    let hex = base64ToHex(strBase64);
    let chunk = hex.match(/.{1,4}/g);
    console.log("line 32",chunk);
    if(chunk.length > 0){
      let hexBerat = chunk[1];
      let numberBerat =  parseInt(hexBerat, 16)*1/100;
      return numberBerat+" kg";
    }else{
      return 0;
    }
  }

  const scanDevices = () => {
    // display the Activityindicator
    //setIsLoading(true);

    // scan devices
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.warn(error);
      }

      // if a device is detected add the device to the list by dispatching the action into the reducer
      if (scannedDevice 
        //&& scannedDevice.id == '4B:05:C3:D4:D8:BC'
        ) {
          let device = scannedDevice
        //console.log("line 59",scannedDevice);
        //dispatch({ type: 'ADD_DEVICE', payload: scannedDevice });
        console.log("Id : ",device.id)
        console.log(`Manufacturer raw : ${device.manufacturerData}`)
        console.log(`Manufacturer hex : ${base64ToHex(device.manufacturerData)}`)
        console.log(`berat : ${beratDariTimabahagan(device.manufacturerData)}`)
      }
    });

    // stop scanning devices after 5 seconds
    setTimeout(() => {
      manager.stopDeviceScan();
      //setIsLoading(false);
    }, 5000);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>

<Button title="Scan devices" onPress={scanDevices} />

          <Section title="Step One - disini edit ios-andro 2">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
