import { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Theme } from '../constants/Theme_dark';
import Header from '../components/Header';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem'; 

export default function HomeScreen() {
    const [todos, setTodos] = useState([
        { id: '1', text: 'REPORT TO SECTOR-A FOR BIOMETRIC RECALIBRATION', completed: false },
        { id: '2', text: 'SUBMIT WEEKLY PRODUCTIVITY METRICS', completed: true },
    ]);

    const active = todos.filter(t => !t.completed).length;
    const cleared = todos.filter(t => t.completed).length;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light" hidden={true} />
            <Header active={active} cleared={cleared} />
            <TodoInput onAdd={(text) => setTodos([{ id: Date.now().toString(), text, completed: false }, ...todos])} />

            <FlatList
                data={[...todos].sort((a, b) => {
                    if (a.completed !== b.completed) return a.completed - b.completed;
                    return b.id.localeCompare(a.id);
                })}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TodoItem
                        item={item}
                        onToggle={(id) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))}
                        onDelete={(id) => setTodos(todos.filter(t => t.id !== id))}
                        onEdit={(id, text) => setTodos(todos.map(t => t.id === id ? { ...t, text } : t))}
                    />
                )}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    copyright © 2026 Omar Hussein.
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    footer: { padding: 20, alignItems: 'center' },
    footerText: { color: '#222', fontSize: 9, fontFamily: 'Courier', letterSpacing: 1 }
});