import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation, route }) {
    const saveEventsToStorage = async (eventsList) => {
        await AsyncStorage.setItem('events', JSON.stringify(eventsList));
    };

    const { newEvent, eventId } = route.params || {};
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const loadEvents = async () => {
            const storedEvents = await AsyncStorage.getItem('events');
            if (storedEvents) {
                setEvents(JSON.parse(storedEvents));
            }
        };
        loadEvents();
    }, []);

    useEffect(() => {
        saveEventsToStorage(events);
    }, [events]);

    useEffect(() => {
        if (newEvent) {
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            navigation.setParams({ newEvent: null });
        }

        if (eventId) {
            deleteEvent(eventId);
            navigation.setParams({ eventId: null });
        }
    }, [newEvent, eventId]);

    // Função para converter datas no formato dd/mm/yyyy para um objeto Date
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day);
    };

    // Filtrar e ordenar os eventos futuros
    const today = new Date();
    const futureEvents = events
        .filter(event => parseDate(event.date) >= today) // Filtra eventos a partir de hoje
        .sort((a, b) => parseDate(a.date) - parseDate(b.date)); // Ordena em ordem crescente de data

    const deleteEvent = (id) => {
        setEvents((prevEvents) => prevEvents.filter(event => event.id !== id));
    };

    const renderEventItem = ({ item }) => (
        <TouchableOpacity
            style={styles.eventItem}
            onPress={() => navigation.navigate('Event', { event: item })}
        >
            <Text style={styles.eventName}>{item.name}</Text>
            <Text>{item.date} - {item.time}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={futureEvents}
                renderItem={renderEventItem}
                keyExtractor={(item) => item.id}
            />
            <Button
                title="Novo Evento"
                onPress={() => navigation.navigate('EventForm')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    eventItem: { padding: 15, backgroundColor: '#f9c2ff', marginVertical: 8, borderRadius: 5 },
    eventName: { fontSize: 18, fontWeight: 'bold' },
});
