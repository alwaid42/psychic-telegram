import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Function to generate a unique ID
const generateUniqueId = () => {
    return Date.now().toString(); 
};

export default function EventFormScreen({ navigation }) {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleAddEvent = () => {
        const newEvent = {
            id: generateUniqueId(), 
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription,
        };

        // Check if all fields are filled
        if (eventName && eventDate && eventTime && eventLocation && eventDescription) {
            navigation.navigate('Home', { newEvent });
        } else {
            alert('Por favor preencha todos os campos');
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // Format date to dd/mm/yyyy
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
        setEventDate(`${day}/${month}/${year}`);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome do Evento:</Text>
            <TextInput style={styles.input} value={eventName} onChangeText={setEventName} />

            <Text style={styles.label}>Data:</Text>
            <Button title="Escolher Data" onPress={showDatePicker} />
            <Text style={styles.input}>{eventDate}</Text>

            <Text style={styles.label}>Horário:</Text>
            <TextInput style={styles.input} value={eventTime} onChangeText={setEventTime} placeholder="HH:MM" /> 

            <Text style={styles.label}>Local:</Text>
            <TextInput style={styles.input} value={eventLocation} onChangeText={setEventLocation} />

            <Text style={styles.label}>Descrição/ mensagem:</Text>
            <TextInput style={styles.input} value={eventDescription} onChangeText={setEventDescription} />

            <Button title="Criar Evento" onPress={handleAddEvent} />

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    label: { fontSize: 18, marginTop: 10 },
    input: { borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 5 },
});
