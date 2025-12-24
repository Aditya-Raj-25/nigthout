import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Index() {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        // Redirect based on authentication status
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                router.replace('/(tabs)');
            } else {
                router.replace('/login');
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [isAuthenticated]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#8B5CF6" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
