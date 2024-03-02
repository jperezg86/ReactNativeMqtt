import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, Button, Modal, Keyboard } from 'react-native';
import styles from './styles';

const Prompt = ({ handleSubmit, handleCancel }) => {
    const [message, setMessage] = useState('');
    const inputRef = useRef(null);

    const onSubmit = () => {
        handleSubmit(message);
        setMessage('');
    };

    const onCancel = () => {
        handleCancel();
        setMessage('');
    };
    useEffect(() => {
        Keyboard.dismiss()
        setTimeout(()=> {
            inputRef.current.focus();
        },100)
    }, [])

    return (
        <Modal
            transparent
            animationType='slide'
            onClose={() => onCancel(false)}>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <TextInput
                        ref={inputRef}
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Mensaje a enviar"
                        placeholderTextColor="#D5E2F6"
                        color="white"
                        />
                    <View style={styles.actionButtons}>
                        <Button title="Cancelar" onPress={onCancel} color="red"/>
                        <Button title="Enviar" onPress={onSubmit} color="black" style={styles.submitButton}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default Prompt;