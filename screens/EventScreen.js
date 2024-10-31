import React from 'react';
import { View, Text, Button, Share, StyleSheet, Alert } from 'react-native';

export default function EventScreen({ route, navigation }) {
    const { event } = route.params; // Retrieve only the event data

    const shareEvent = async () => {
        try {
            const message = `${event.name}
            Data: ${event.date}
            Horário: ${event.time}
            Local: ${event.location}
            ${event.description}
            `;
            await Share.share({
                message,
                title: 'Venha participar!',
            });
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDelete = () => {
        Alert.alert(
            'Confirmar Exclusão',
            'Tem certeza que quer excluir este evento?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sim, Excluir',
                    onPress: () => {
                        // Enviar o Id para home page
                        navigation.navigate('Home', { eventId: event.id });
                    },
                    style: 'destructive' // This makes the button red
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{event.name}</Text>
            <Text style={styles.label}>Date: {event.date}</Text>
            <Text style={styles.label}>Horário: {event.time}</Text>
            <Text style={styles.label}>Location: {event.location}</Text>
            <Text style={styles.label}>Description: {event.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Compartilhar Evento" onPress={shareEvent} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Excluir Evento" onPress={handleDelete} color="red" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold' },
    label: { fontSize: 18, marginVertical: 5 },
    buttonContainer: {
        marginVertical: 10, // Adjust the space as needed
    },
});
