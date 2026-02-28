import { TouchableOpacity, Text, StyleSheet, View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../constants/Theme_dark';
import { Swipeable } from 'react-native-gesture-handler';
import { useState } from 'react';

export default function TodoItem({ item, onToggle, onDelete, onEdit }) {
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(item.text);
    const renderRightActions = () => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
            <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
    );

    const handleEditSubmit = () => {
        setEditing(false);
        if (editText.trim() && editText !== item.text) {
            onEdit(item.id, editText);
        }
    };
    
    return (
        <Swipeable renderRightActions={renderRightActions}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => onToggle(item.id)}>
                    <View style={[styles.checkbox, item.completed && styles.checked]}>
                        {item.completed && <Ionicons name="checkmark" size={16} color="black" />}
                    </View>
                </TouchableOpacity>
                {editing ? (
                    <TextInput
                        style={[styles.text, item.completed && styles.textCompleted, styles.editInput]}
                        value={editText}
                        onChangeText={setEditText}
                        autoFocus
                        onSubmitEditing={handleEditSubmit}
                        onBlur={handleEditSubmit}
                        returnKeyType="done"
                    />
                ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <Text style={[styles.text, item.completed && styles.textCompleted]}>
                            {item.text.toUpperCase()}
                        </Text>
                        <TouchableOpacity style={styles.inlineEditIcon} onPress={() => setEditing(true)}>
                            <Ionicons name="create" size={20} color={Theme.colors.primary} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
        paddingHorizontal: 20
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: Theme.colors.textMuted,
        marginRight: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checked: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
    text: { color: Theme.colors.text, fontFamily: 'Courier New', fontSize: 14, flex: 1, letterSpacing: 1 },
    textCompleted: { color: Theme.colors.textMuted, textDecorationLine: 'line-through' },
    deleteButton: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: '100%',
    },
    inlineEditIcon: {
        marginLeft: 10,
        padding: 4,
        borderRadius: 4,
    },
    editInput: {
        backgroundColor: Theme.colors.surface,
        color: Theme.colors.text,
        borderRadius: 4,
        paddingHorizontal: 8,
        fontSize: 14,
        flex: 1,
    },
});