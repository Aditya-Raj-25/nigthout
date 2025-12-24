import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getClubById } from '../../services/api';

export default function ClubDetailScreen() {
    const { id } = useLocalSearchParams();
    const [club, setClub] = useState(null);

    useEffect(() => {
        loadClub();
    }, [id]);

    const loadClub = async () => {
        const data = await getClubById(id);
        setClub(data);
    };

    const handleCall = () => {
        if (club?.phone) {
            Linking.openURL(`tel:${club.phone}`);
        }
    };

    const handleWhatsApp = () => {
        if (club?.whatsapp) {
            Linking.openURL(`whatsapp://send?phone=${club.whatsapp}`);
        }
    };

    const handleWebsite = () => {
        if (club?.website) {
            Linking.openURL(club.website);
        }
    };

    if (!club) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Image source={{ uri: club.image }} style={styles.headerImage} />

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{club.name}</Text>
                            <View style={styles.rating}>
                                <Ionicons name="star" size={20} color="#F59E0B" />
                                <Text style={styles.ratingText}>{club.rating}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoSection}>
                        <View style={styles.infoItem}>
                            <Ionicons name="location" size={24} color="#8B5CF6" />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Location</Text>
                                <Text style={styles.infoValue}>{club.location}</Text>
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <Ionicons name="time" size={24} color="#8B5CF6" />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Timings</Text>
                                <Text style={styles.infoValue}>{club.timings}</Text>
                            </View>
                        </View>

                        <View style={styles.infoItem}>
                            <Ionicons name="cash" size={24} color="#8B5CF6" />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.infoLabel}>Entry Price</Text>
                                <Text style={styles.infoValue}>₹{club.entryPrice}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About</Text>
                        <Text style={styles.description}>{club.description}</Text>
                    </View>

                    {club.offers && (
                        <View style={styles.offersCard}>
                            <Ionicons name="gift" size={24} color="#8B5CF6" />
                            <View style={styles.offersContent}>
                                <Text style={styles.offersTitle}>Special Offers</Text>
                                <Text style={styles.offersText}>{club.offers}</Text>
                            </View>
                        </View>
                    )}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact</Text>
                        <View style={styles.contactButtons}>
                            <TouchableOpacity style={styles.contactButton} onPress={handleCall}>
                                <Ionicons name="call" size={24} color="#FFFFFF" />
                                <Text style={styles.contactButtonText}>Call</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.contactButton} onPress={handleWhatsApp}>
                                <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
                                <Text style={styles.contactButtonText}>WhatsApp</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.contactButton} onPress={handleWebsite}>
                                <Ionicons name="globe" size={24} color="#FFFFFF" />
                                <Text style={styles.contactButtonText}>Website</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.planButton}
                    onPress={() => router.push(`/create-plan?venue=${club.name}`)}
                >
                    <Text style={styles.planButtonText}>Create Plan Here</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    headerImage: {
        width: '100%',
        height: 300,
        backgroundColor: '#374151',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 24,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        flex: 1,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    ratingText: {
        color: '#FFFFFF',
        marginLeft: 6,
        fontSize: 16,
        fontWeight: '600',
    },
    infoSection: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#374151',
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    infoTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#9CA3AF',
        lineHeight: 24,
    },
    offersCard: {
        flexDirection: 'row',
        backgroundColor: '#1F2937',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        borderWidth: 2,
        borderColor: '#8B5CF6',
    },
    offersContent: {
        marginLeft: 12,
        flex: 1,
    },
    offersTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8B5CF6',
        marginBottom: 4,
    },
    offersText: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    contactButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contactButton: {
        flex: 1,
        backgroundColor: '#1F2937',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#374151',
    },
    contactButtonText: {
        color: '#FFFFFF',
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
    },
    footer: {
        padding: 16,
        backgroundColor: '#1F2937',
        borderTopWidth: 1,
        borderTopColor: '#374151',
    },
    planButton: {
        backgroundColor: '#8B5CF6',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    planButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
});
