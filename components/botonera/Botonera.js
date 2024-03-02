import { useCallback, useMemo } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Styles from './styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useState } from 'react';
import Prompt from '../prompt/prompt';

export const LED_STATUS = {
    ON: 'on',
    OFF: 'off'
}
export default Botonera = ({
    ledStatus = LED_STATUS.OFF,
    onLedButtonPressed,
    submitDisplayMessage
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const buttonTitle = useMemo(() => {
        return ledStatus === LED_STATUS.ON ? 'Apagar Led' : 'Encender led'
    })

    const onLedPressed = useCallback(() => {
        onLedButtonPressed(ledStatus === LED_STATUS.ON ? 'off' : 'on')
    }, [onLedButtonPressed])

    const handleSendDisplayMessage = useCallback((message) => {
        setIsModalVisible(true);
    }, []);
    
    const handleSubmit = useCallback((message) => {
        submitDisplayMessage(message)
        setIsModalVisible(false)
    })

    return <View style={Styles.botoneraWrapper}>
        <TouchableOpacity style={Styles.botoneraButton} onPress={onLedPressed}>
            <FontAwesome5
                name='lightbulb'
                solid={ledStatus === LED_STATUS.OFF}
                size={28}
                color='#fff'
            />
            <Text style={Styles.botoneraButtonText}>{buttonTitle}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={Styles.botoneraButton}
            onPress={handleSendDisplayMessage}>
            <FontAwesome5
                name='tv'
                size={28}
                color='#fff'
            />
            <Text style={Styles.botoneraButtonText}>Enviar mensaje a display</Text>
        </TouchableOpacity>

        {isModalVisible && 
            <Prompt
                handleSubmit={handleSubmit}
                handleCancel={() => setIsModalVisible(false)}
            />
        }   
    </View>
}