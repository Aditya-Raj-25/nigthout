import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { createPlan } from '../services/api';

export default function CreatePlanScreen() {
    const { user } = useAuth();
    const { venue: venueParam } = useLocalSearchParams();
    const [title, setTitle] = useState('');
    const [venue, setVenue] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [budget, setBudget] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    useEffect(() => {
        if (venueParam) {
            setVenue(venueParam);
        }
    }, [venueParam]);

    const handleCreatePlan = async () => {
        if (!title || !venue || !date || !time || !budget) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        const planData = {
            title,
            venue,
            date,
            time,
            budget: parseInt(budget),
            description,
            isPublic,
            creatorId: user.id,
        };

        try {
            await createPlan(planData);
            Alert.alert('Success', 'Plan created successfully!', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to create plan');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Plan</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Plan Title *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Saturday Night Out"
                            placeholderTextColor="#9CA3AF"
                            value={title}
                            onChangeText={setTitle}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Venue *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Skybar Lounge"
                            placeholderTextColor="#9CA3AF"
                            value={venue}
                            onChangeText={setVenue}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                            <Text style={styles.label}>Date *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="YYYY-MM-DD"
                                placeholderTextColor="#9CA3AF"
                                value={date}
                                onChangeText={setDate}
                            />
                        </View>

                        <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                            <Text style={styles.label}>Time *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="9:00 PM"
                                placeholderTextColor="#9CA3AF"
                                value={time}
                                onChangeText={setTime}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Budget (₹) *</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., 3000"
                            placeholderTextColor="#9CA3AF"
                            value={budget}
                            onChangeText={setBudget}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Tell others about your plan..."
                            placeholderTextColor="#9CA3AF"
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.toggleContainer}
                        onPress={() => setIsPublic(!isPublic)}
                    >
                        <View style={styles.toggleLeft}>
                            <Ionicons
                                name={isPublic ? "globe" : "lock-closed"}
                                size={24}
                                color="#8B5CF6"
                            />
                            <View style={styles.toggleText}>
                                <Text style={styles.toggleTitle}>
                                    {isPublic ? 'Public Plan' : 'Private Plan'}
                                </Text>
                                <Text style={styles.toggleSubtitle}>
                                    {isPublic ? 'Anyone can see and join' : 'Only invited friends can join'}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.toggle, isPublic && styles.toggleActive]}>
                            <View style={[styles.toggleThumb, isPublic && styles.toggleThumbActive]} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.createButton} onPress={handleCreatePlan}>
                        <Text style={styles.createButtonText}>Create Plan</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#374151',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    form: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1F2937',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#374151',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#374151',
    },
    toggleLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    toggleText: {
        marginLeft: 12,
        flex: 1,
    },
    toggleTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    toggleSubtitle: {
        fontSize: 12,
        color: '#9CA3AF',
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
    createButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
