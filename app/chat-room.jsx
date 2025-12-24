import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getChatMessages, sendMessage } from '../services/api';

export default function ChatRoomScreen() {
    const { chatId, chatName } = useLocalSearchParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        loadMessages();
    }, [chatId]);

    const loadMessages = async () => {
        const data = await getChatMessages(chatId);
        setMessages(data);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        try {
            await sendMessage(chatId, user.id, newMessage);

            // Add message to local state immediately
            const tempMessage = {
                id: Date.now().toString(),
                chatId,
                message: newMessage,
                senderId: user.id,
                senderName: user.name,
                senderAvatar: user.avatar,
                createdAt: new Date()
            };

            setMessages([...messages, tempMessage]);
            setNewMessage('');

            // Reload messages from server
            setTimeout(loadMessages, 500);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const MessageBubble = ({ message }) => {
        const isMyMessage = message.senderId.toString() === user.id.toString();

        return (
            <View style={[styles.messageBubbleContainer, isMyMessage && styles.myMessageContainer]}>
                {!isMyMessage && (
                    <Image source={{ uri: message.senderAvatar }} style={styles.messageAvatar} />
                )}
                <View style={[styles.messageBubble, isMyMessage && styles.myMessageBubble]}>
                    {!isMyMessage && (
                        <Text style={styles.senderName}>{message.senderName}</Text>
                    )}
                    <Text style={[styles.messageText, isMyMessage && styles.myMessageText]}>
                        {message.message}
                    </Text>
                </View>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{chatName}</Text>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-vertical" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesContainer}>
                {messages.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="chatbubbles-outline" size={64} color="#374151" />
                        <Text style={styles.emptyText}>No messages yet</Text>
                        <Text style={styles.emptySubtext}>Start the conversation!</Text>
                    </View>
                ) : (
                    messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                    ))
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#9CA3AF"
                    value={newMessage}
                    onChangeText={setNewMessage}
                    multiline
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                    disabled={!newMessage.trim()}
                >
                    <Ionicons
                        name="send"
                        size={24}
                        color={newMessage.trim() ? '#FFFFFF' : '#6B7280'}
                    />
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#1F2937',
        borderBottomWidth: 1,
        borderBottomColor: '#374151',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    messagesContainer: {
        flex: 1,
        padding: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#9CA3AF',
        marginTop: 16,
    },
    emptySubtext: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 4,
    },
    messageBubbleContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    myMessageContainer: {
        justifyContent: 'flex-end',
    },
    messageAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    messageBubble: {
        backgroundColor: '#1F2937',
        borderRadius: 16,
        padding: 12,
        maxWidth: '75%',
    },
    myMessageBubble: {
        backgroundColor: '#8B5CF6',
    },
    senderName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#8B5CF6',
        marginBottom: 4,
    },
    messageText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    myMessageText: {
        color: '#FFFFFF',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#1F2937',
        borderTopWidth: 1,
        borderTopColor: '#374151',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#111827',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        color: '#FFFFFF',
        maxHeight: 100,
        marginRight: 12,
    },
    sendButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
