import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getPlans } from '../../services/api';

export default function HomeScreen() {
    const [plans, setPlans] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { user } = useAuth();

    const loadPlans = async () => {
        const data = await getPlans();
        setPlans(data);
    };

    useEffect(() => {
        loadPlans();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadPlans();
        setRefreshing(false);
    };

    const PlanCard = ({ plan }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.creatorInfo}>
                    <Image source={{ uri: plan.creator.avatar }} style={styles.avatar} />
                    <View>
                        <Text style={styles.creatorName}>{plan.creator.name}</Text>
                        <Text style={styles.venue}>{plan.venue}</Text>
                    </View>
                </View>
                <View style={styles.badge}>
                    <Ionicons name="people" size={16} color="#8B5CF6" />
                    <Text style={styles.badgeText}>{plan.participants.length + 1}</Text>
                </View>
            </View>

            <Text style={styles.planTitle}>{plan.title}</Text>
            <Text style={styles.description}>{plan.description}</Text>

            <View style={styles.planDetails}>
                <View style={styles.detailItem}>
                    <Ionicons name="calendar" size={16} color="#9CA3AF" />
                    <Text style={styles.detailText}>{plan.date}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="time" size={16} color="#9CA3AF" />
                    <Text style={styles.detailText}>{plan.time}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Ionicons name="cash" size={16} color="#9CA3AF" />
                    <Text style={styles.detailText}>₹{plan.budget}</Text>
                </View>
            </View>

            <View style={styles.participants}>
                {plan.participants.slice(0, 3).map((participant, index) => (
                    <Image
                        key={participant.id}
                        source={{ uri: participant.avatar }}
                        style={[styles.participantAvatar, { marginLeft: index > 0 ? -8 : 0 }]}
                    />
                ))}
                {plan.participants.length > 3 && (
                    <View style={[styles.participantAvatar, styles.moreParticipants]}>
                        <Text style={styles.moreText}>+{plan.participants.length - 3}</Text>
                    </View>
                )}
            </View>

            <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join Plan</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollView}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" />
                }
            >
                <View style={styles.header}>
                    <Text style={styles.greeting}>Hey, {user?.name || 'NightOwl'}! 🦉</Text>
                    <Text style={styles.subtitle}>Ready for tonight?</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Upcoming Nightouts</Text>
                    {plans.map((plan) => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push('/create-plan')}
            >
                <Ionicons name="add" size={28} color="#FFFFFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 20,
        paddingTop: 10,
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    section: {
        padding: 20,
        paddingTop: 0,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#374151',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    creatorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    creatorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    venue: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeText: {
        color: '#FFFFFF',
        marginLeft: 4,
        fontWeight: '600',
    },
    planTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 12,
    },
    planDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        color: '#9CA3AF',
        marginLeft: 6,
        fontSize: 14,
    },
    participants: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    participantAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#1F2937',
    },
    moreParticipants: {
        backgroundColor: '#374151',
        justifyContent: 'center',
        alignItems: 'center',
    },
    moreText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    joinButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    joinButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});
