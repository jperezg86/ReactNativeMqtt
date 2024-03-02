import { useCallback, useEffect, useRef } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import Botonera, { LED_STATUS } from './components/botonera/Botonera'
import Widget from './components/widget/Widget'
import { useState } from 'react'
import { Client, Message } from 'paho-mqtt';

export default function App() {
  const [appState, setAppState] = useState({
    ledStatus: LED_STATUS.OFF,
    temperature: 'Sin datos',
    humedity: 'Sin datos'
  })

  const clientMqtt = useRef(
    new Client(process.env.MQTT_HOST, 'mobile-app-' + new Date().getTime())
  )

  useEffect(() => {
    console.log(process.env.MQTT_HOST, process.env.MQTT_USERNAME)
    clientMqtt.current.connect({
      useSSL: true,
      userName: process.env.MQTT_USERNAME,
      password: process.env.MQTTT_PASSWORD,
      onSuccess: () => {
        console.log('Conectado al broker')
        clientMqtt.current.subscribe('ledStatus')
        clientMqtt.current.subscribe('temperature')
        clientMqtt.current.subscribe('humedity')
      },
      onFailure: (message) => {
        console.log("No se pudo conectar al broker")
        console.log(message.errorMessage);
      }
    })

    return () => {
      clientMqtt.current.disconnect()
    }
  }, [])

  if(clientMqtt.current) {
    clientMqtt.current.onMessageArrived = (message) => {
      switch(message.destinationName) {
        case 'temperature':
          setAppState({...appState, temperature: `${message.payloadString} °C`})
          break;
        case 'humedity':
          setAppState({...appState, humedity: `${message.payloadString} %`})
          break;
        case 'ledStatus':
          setAppState({...appState, ledStatus: message.payloadString})
          break;
        default:
          console.log("This destinationName is not recognized")
      }
      if(message.destinationName === 'ledStatus') {
        setAppState({...appState, ledStatus: message.payloadString})
      }
    };
  }
  
  const onLedButtonPressed = (status) => {
    if(clientMqtt.current){
      const message = new Message(status);
      message.destinationName = 'ledStatus';
      clientMqtt.current.send(message)
    }
  }

  const submitDisplayMessage = (sms) => {
    console.log(sms)
    if(clientMqtt.current) {
      const mqttMessage = new Message(sms);
      mqttMessage.destinationName = 'displayMessage';
      clientMqtt.current.send(mqttMessage)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.widgetsZone}>
        <Widget title="Temperatura" iconName="thermometer-full" measure={appState.temperature} />
        <Widget title="Humedad" iconName="tint" measure={appState.humedity} />
      </View>
      <View style={styles.widgetsZone}>
        <Botonera
          ledStatus={appState.ledStatus}
          onLedButtonPressed={onLedButtonPressed} 
          submitDisplayMessage={submitDisplayMessage}
          />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: 50,
    paddingHorizontal: 12,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  widgetsZone: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  innerText: {
    color: '#ffffff'
  }
});
