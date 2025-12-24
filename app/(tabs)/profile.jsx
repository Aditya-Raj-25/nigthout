import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EditProfileModal, LanguageModal, NotificationsModal, PrivacyModal } from '../../components/ProfileModals';
import { useAuth } from '../../context/AuthContext';
import { getUserSettings, updateUserSettings } from '../../services/api';

export default function ProfileScreen() {
    const { user, logout } = useAuth();
    const [editProfileVisible, setEditProfileVisible] = useState(false);
    const [notificationsVisible, setNotificationsVisible] = useState(false);
    const [privacyVisible, setPrivacyVisible] = useState(false);
    const [languageVisible, setLanguageVisible] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const handleLogout = () => {
        logout();
        router.replace('/login');
    };

    const handleDarkModeToggle = async () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);

        try {
            const settings = await getUserSettings(user.id);
            await updateUserSettings(user.id, {
                ...settings,
                darkMode: newDarkMode
            });
            Alert.alert('Success', `Dark mode ${newDarkMode ? 'enabled' : 'disabled'}!`);
        } catch (error) {
            Alert.alert('Error', 'Failed to update dark mode');
        }
    };

    const MenuItem = ({ icon, title, onPress, color = '#FFFFFF' }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <Ionicons name={icon} size={24} color={color} />
                <Text style={[styles.menuItemText, { color }]}>{title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: user?.avatar }} style={styles.profileImage} />
                <Text style={styles.name}>{user?.name}</Text>
                <Text style={styles.email}>{user?.email}</Text>
            </View>

            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>12</Text>
                    <Text style={styles.statLabel}>Plans</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>8</Text>
                    <Text style={styles.statLabel}>Attended</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>24</Text>
                    <Text style={styles.statLabel}>Friends</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <MenuItem
                    icon="person-outline"
                    title="Edit Profile"
                    onPress={() => setEditProfileVisible(true)}
                />
                <MenuItem
                    icon="notifications-outline"
                    title="Notifications"
                    onPress={() => setNotificationsVisible(true)}
                />
                <MenuItem
                    icon="lock-closed-outline"
                    title="Privacy"
                    onPress={() => setPrivacyVisible(true)}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>
                <MenuItem
                    icon="moon-outline"
                    title="Dark Mode"
                    onPress={handleDarkModeToggle}
                />
                <MenuItem
                    icon="language-outline"
                    title="Language"
                    onPress={() => setLanguageVisible(true)}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Support</Text>
                <MenuItem
                    icon="help-circle-outline"
                    title="Help Center"
                    onPress={() => Alert.alert('Help Center', 'Contact support at support@nightowl.com')}
                />
                <MenuItem
                    icon="information-circle-outline"
                    title="About"
                    onPress={() => Alert.alert('About', 'NightOwl Gather v1.0.0\nPlan your perfect nightout!')}
                />
            </View>

            <View style={styles.section}>
                <MenuItem
                    icon="log-out-outline"
                    title="Logout"
                    onPress={handleLogout}
                    color="#EF4444"
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.version}>Version 1.0.0</Text>
                <Text style={styles.copyright}>© 2025 NightOwl Gather</Text>
            </View>

            {/* Modals */}
            <EditProfileModal
                visible={editProfileVisible}
                onClose={() => setEditProfileVisible(false)}
                user={user}
            />
            <NotificationsModal
                visible={notificationsVisible}
                onClose={() => setNotificationsVisible(false)}
                userId={user?.id}
            />
            <PrivacyModal
                visible={privacyVisible}
                onClose={() => setPrivacyVisible(false)}
                userId={user?.id}
            />
            <LanguageModal
                visible={languageVisible}
                onClose={() => setLanguageVisible(false)}
                userId={user?.id}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    header: {
        alignItems: 'center',
        padding: 24,
        paddingTop: 16,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#8B5CF6',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#1F2937',
        marginHorizontal: 16,
        marginBottom: 24,
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#374151',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8B5CF6',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    statDivider: {
        width: 1,
        backgroundColor: '#374151',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginLeft: 16,
        marginBottom: 8,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        paddingVertical: 16,
        paddingHorizontal: 16,
        marginHorizontal: 16,
        marginBottom: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#374151',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 16,
        marginLeft: 16,
    },
    footer: {
        alignItems: 'center',
        padding: 24,
    },
    version: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    copyright: {
        fontSize: 12,
        color: '#6B7280',
    },
});
