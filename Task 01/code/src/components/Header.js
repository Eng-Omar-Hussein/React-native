import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../constants/Theme_dark';

export default function Header({ active, cleared }) {
    const total = active + cleared;
    const compliance = total > 0 ? Math.round((cleared / total) * 100) : 0;

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <Text style={styles.logo}>Todo List</Text>
                <Text style={styles.version}>V1.7</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>ACTIVE</Text>
                    <Text style={styles.statValue}>{active}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>CLEARED</Text>
                    <Text style={styles.statValue}>{cleared}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>COMPLIANCE</Text>
                    <Text style={[styles.statValue, { color: Theme.colors.primary }]}>{compliance}%</Text>
                </View>
            </View>
            <View style={styles.divider} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: Theme.spacing.lg, backgroundColor: Theme.colors.background },
    topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
        logo: {
            color: Theme.colors.logo, // Gold for brightness
            fontSize: 36,
            fontFamily: 'Inter-Regular',
            letterSpacing: 3,
            textShadowColor: Theme.colors.glow,
            textShadowOffset: { width: 3, height: 1 },
            textShadowRadius: 5,
            elevation: 2,
        },
    version: { color: '#444', fontSize: 12, fontFamily: 'Courier' },
    statsRow: { flexDirection: 'row', gap: 40 },
    statLabel: { color: '#444', fontSize: 12, fontFamily: 'Courier', marginBottom: 8 },
    statValue: { color: Theme.colors.text, fontSize: 24, fontFamily: 'Courier' },
    divider: { height: 1, backgroundColor: '#222', marginTop: 30 }
});