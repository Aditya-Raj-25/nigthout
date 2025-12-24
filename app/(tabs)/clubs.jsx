import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getClubs } from '../../services/api';

export default function ClubsScreen() {
    const [clubs, setClubs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadClubs();
    }, []);

    const loadClubs = async () => {
        const data = await getClubs();
        setClubs(data);
    };

    const filteredClubs = clubs.filter(club =>
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const ClubCard = ({ club }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/club/${club.id}`)}
        >
            <Image source={{ uri: club.image }} style={styles.clubImage} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.clubName}>{club.name}</Text>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={16} color="#F59E0B" />
                        <Text style={styles.ratingText}>{club.rating}</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="location" size={16} color="#9CA3AF" />
                    <Text style={styles.infoText}>{club.location}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="time" size={16} color="#9CA3AF" />
                    <Text style={styles.infoText}>{club.timings}</Text>
                </View>

                <View style={styles.footer}>
                    <View style={styles.priceTag}>
                        <Text style={styles.priceText}>₹{club.entryPrice}</Text>
                    </View>
                    <TouchableOpacity style={styles.detailsButton}>
                        <Text style={styles.detailsButtonText}>View Details</Text>
                        <Ionicons name="arrow-forward" size={16} color="#8B5CF6" />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search clubs..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.title}>Explore Clubs</Text>
                    <Text style={styles.subtitle}>{filteredClubs.length} clubs available</Text>
                </View>

                <View style={styles.clubsList}>
                    {filteredClubs.map((club) => (
                        <ClubCard key={club.id} club={club} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111827',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1F2937',
        margin: 16,
        marginBottom: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#374151',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        padding: 16,
        paddingTop: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    clubsList: {
        padding: 16,
        paddingTop: 0,
    },
    card: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#374151',
    },
    clubImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#374151',
    },
    cardContent: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    clubName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        flex: 1,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#374151',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        color: '#FFFFFF',
        marginLeft: 4,
        fontWeight: '600',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoText: {
        color: '#9CA3AF',
        marginLeft: 8,
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#374151',
    },
    priceTag: {
        backgroundColor: '#8B5CF6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    priceText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    detailsButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailsButtonText: {
        color: '#8B5CF6',
        fontWeight: '600',
        marginRight: 4,
    },
});
