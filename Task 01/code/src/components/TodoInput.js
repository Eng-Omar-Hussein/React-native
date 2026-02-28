import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme_dark';

export default function TodoInput({ onAdd }) {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="ENTER NEW TASK..."
                placeholderTextColor="#222"
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => { if (text) { onAdd(text); setText(''); } }}
            >
                <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flexDirection: 'row', padding: Theme.spacing.lg, gap: 10 },
    input: {
        flex: 1,
        backgroundColor: '#0A0A0A',
        borderWidth: 1,
        borderColor: '#1A1A1A',
        padding: 15,
        color: Theme.colors.text,
        fontFamily: 'Courier',
        letterSpacing: 1,
    },
    addButton: {
        backgroundColor: Theme.colors.primary,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
    }
});