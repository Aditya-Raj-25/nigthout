import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const mockChats = [
    {
        id: '1',
        name: 'Party Squad',
        lastMessage: 'See you at 9 PM!',
        time: '5m ago',
        unread: 2,
        avatar: 'https://i.pravatar.cc/150?img=1',
        isGroup: true,
    },
    {
        id: '2',
        name: 'Rahul Sharma',
        lastMessage: 'Which club are we going to?',
        time: '1h ago',
        unread: 0,
        avatar: 'https://i.pravatar.cc/150?img=12',
        isGroup: false,
    },
    {
        id: '3',
        name: 'Weekend Warriors',
        lastMessage: 'Count me in! 🎉',
        time: '3h ago',
        unread: 5,
        avatar: 'https://i.pravatar.cc/150?img=25',
        isGroup: true,
    },
    {
        id: '4',
        name: 'Sneha Patel',
        lastMessage: 'Thanks for the invite!',
        time: '1d ago',
        unread: 0,
        avatar: 'https://i.pravatar.cc/150?img=9',
        isGroup: false,
    },
];


export default function ChatScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = mockChats.filter(chat =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const ChatItem = ({ chat }) => (
        <TouchableOpacity
            style={styles.chatItem}
            onPress={() => router.push(`/chat-room?chatId=${chat.id}&chatName=${chat.name}`)}
        >
            <View style={styles.avatarContainer}>
                <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{chat.unread}</Text>
                    </View>
                )}
            </View>

            <View style={styles.chatContent}>
                <View style={styles.chatHeader}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.chatName}>{chat.name}</Text>
                        {chat.isGroup && (
                            <Ionicons name="people" size={14} color="#9CA3AF" style={styles.groupIcon} />
                        )}
                    </View>
                    <Text style={styles.time}>{chat.time}</Text>
                </View>
                <Text style={[styles.lastMessage, chat.unread > 0 && styles.unreadMessage]}>
                    {chat.lastMessage}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search chats..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView style={styles.scrollView}>
                {filteredChats.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} />
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.fab}>
                <Ionicons name="create" size={24} color="#FFFFFF" />
            </TouchableOpacity>
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
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#374151',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
    },
    unreadBadge: {
        position: 'absolute',
        top: -4,
        right: 8,
        backgroundColor: '#8B5CF6',
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    unreadText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    chatContent: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    groupIcon: {
        marginLeft: 6,
    },
    time: {
        fontSize: 12,
        color: '#9CA3AF',
    },
    lastMessage: {
        fontSize: 14,
        color: '#9CA3AF',
    },
    unreadMessage: {
        color: '#FFFFFF',
        fontWeight: '500',
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
