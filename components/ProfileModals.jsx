import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserSettings, updateUserProfile, updateUserSettings } from '../services/api';

// Edit Profile Modal Component
const EditProfileModal = ({ visible, onClose, user }) => {
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    const handleSave = async () => {
        try {
            await updateUserProfile(user.id, { name, email });
            Alert.alert('Success', 'Profile updated successfully!');
            onClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Edit Profile</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        placeholderTextColor="#9CA3AF"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// Notifications Modal Component
const NotificationsModal = ({ visible, onClose, userId }) => {
    const [notifications, setNotifications] = useState(true);

    const handleSave = async () => {
        try {
            const settings = await getUserSettings(userId);
            await updateUserSettings(userId, {
                ...settings,
                notifications
            });
            Alert.alert('Success', 'Notification settings updated!');
            onClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to update settings');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Notifications</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.toggleItem}
                        onPress={() => setNotifications(!notifications)}
                    >
                        <Text style={styles.toggleLabel}>Enable Notifications</Text>
                        <View style={[styles.toggle, notifications && styles.toggleActive]}>
                            <View style={[styles.toggleThumb, notifications && styles.toggleThumbActive]} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// Privacy Modal Component
const PrivacyModal = ({ visible, onClose, userId }) => {
    const [privacyLevel, setPrivacyLevel] = useState('public');

    const handleSave = async () => {
        try {
            const settings = await getUserSettings(userId);
            await updateUserSettings(userId, {
                ...settings,
                privacyLevel
            });
            Alert.alert('Success', 'Privacy settings updated!');
            onClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to update settings');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Privacy</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.privacyOption, privacyLevel === 'public' && styles.privacyOptionActive]}
                        onPress={() => setPrivacyLevel('public')}
                    >
                        <Ionicons name="globe" size={24} color={privacyLevel === 'public' ? '#8B5CF6' : '#9CA3AF'} />
                        <View style={styles.privacyOptionText}>
                            <Text style={styles.privacyOptionTitle}>Public</Text>
                            <Text style={styles.privacyOptionDesc}>Anyone can see your profile</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.privacyOption, privacyLevel === 'friends' && styles.privacyOptionActive]}
                        onPress={() => setPrivacyLevel('friends')}
                    >
                        <Ionicons name="people" size={24} color={privacyLevel === 'friends' ? '#8B5CF6' : '#9CA3AF'} />
                        <View style={styles.privacyOptionText}>
                            <Text style={styles.privacyOptionTitle}>Friends Only</Text>
                            <Text style={styles.privacyOptionDesc}>Only friends can see your profile</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.privacyOption, privacyLevel === 'private' && styles.privacyOptionActive]}
                        onPress={() => setPrivacyLevel('private')}
                    >
                        <Ionicons name="lock-closed" size={24} color={privacyLevel === 'private' ? '#8B5CF6' : '#9CA3AF'} />
                        <View style={styles.privacyOptionText}>
                            <Text style={styles.privacyOptionTitle}>Private</Text>
                            <Text style={styles.privacyOptionDesc}>Only you can see your profile</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

// Language Modal Component
const LanguageModal = ({ visible, onClose, userId }) => {
    const [language, setLanguage] = useState('en');

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'Hindi' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
    ];

    const handleSave = async () => {
        try {
            const settings = await getUserSettings(userId);
            await updateUserSettings(userId, {
                ...settings,
                language
            });
            Alert.alert('Success', 'Language updated!');
            onClose();
        } catch (error) {
            Alert.alert('Error', 'Failed to update language');
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Language</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>

                    {languages.map((lang) => (
                        <TouchableOpacity
                            key={lang.code}
                            style={[styles.languageOption, language === lang.code && styles.languageOptionActive]}
                            onPress={() => setLanguage(lang.code)}
                        >
                            <Text style={styles.languageText}>{lang.name}</Text>
                            {language === lang.code && (
                                <Ionicons name="checkmark" size={24} color="#8B5CF6" />
                            )}
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>Save Changes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export { EditProfileModal, LanguageModal, NotificationsModal, PrivacyModal };

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        padding: 24,
        width: '90%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    input: {
        backgroundColor: '#111827',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        fontSize: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#374151',
    },
    saveButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    toggleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 16,
    },
    toggleLabel: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#374151',
        padding: 2,
    },
    toggleActive: {
        backgroundColor: '#8B5CF6',
    },
    toggleThumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
    },
    toggleThumbActive: {
        transform: [{ translateX: 22 }],
    },
    privacyOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#111827',
        borderWidth: 2,
        borderColor: '#374151',
    },
    privacyOptionActive: {
        borderColor: '#8B5CF6',
    },
    privacyOptionText: {
        marginLeft: 16,
        flex: 1,
    },
    privacyOptionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    privacyOptionDesc: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#111827',
        borderWidth: 2,
        borderColor: '#374151',
    },
    languageOptionActive: {
        borderColor: '#8B5CF6',
    },
    languageText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});
