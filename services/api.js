// Mock data for clubs
export const mockClubs = [
    {
        id: '1',
        name: 'Skybar Lounge',
        image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800',
        rating: 4.5,
        entryPrice: 1500,
        entry_price: 1500,
        location: 'Downtown, Mumbai',
        timings: '8 PM - 3 AM',
        phone: '+91 98765 43210',
        whatsapp: '+91 98765 43210',
        website: 'https://skybarlounge.com',
        description: 'Premium rooftop lounge with stunning city views',
        offers: 'Ladies Night on Wednesday - Free entry for ladies',
    },
    {
        id: '2',
        name: 'Neon Nights',
        image: 'https://images.unsplash.com/photo-1571266028243-d220c6e2e5e4?w=800',
        rating: 4.7,
        entryPrice: 2000,
        entry_price: 2000,
        location: 'Bandra West, Mumbai',
        timings: '9 PM - 4 AM',
        phone: '+91 98765 43211',
        whatsapp: '+91 98765 43211',
        website: 'https://neonnights.com',
        description: 'EDM and House music paradise',
        offers: 'Happy Hours: 9-11 PM - 50% off on drinks',
    },
    {
        id: '3',
        name: 'The Velvet Room',
        image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
        rating: 4.3,
        entryPrice: 1200,
        entry_price: 1200,
        location: 'Andheri, Mumbai',
        timings: '7 PM - 2 AM',
        phone: '+91 98765 43212',
        whatsapp: '+91 98765 43212',
        website: 'https://velvetroom.com',
        description: 'Elegant lounge with live music',
        offers: 'Couples Entry: ₹2000 for two with complimentary drinks',
    },
    {
        id: '4',
        name: 'Bass Factory',
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        rating: 4.8,
        entryPrice: 2500,
        entry_price: 2500,
        location: 'Lower Parel, Mumbai',
        timings: '10 PM - 5 AM',
        phone: '+91 98765 43213',
        whatsapp: '+91 98765 43213',
        website: 'https://bassfactory.com',
        description: 'Underground techno and bass music club',
        offers: 'Early Bird: Entry before 11 PM - ₹1500',
    },
];

// Mock data for nightout plans
export const mockPlans = [
    {
        id: '1',
        title: 'Saturday Night at Skybar',
        venue: 'Skybar Lounge',
        date: '2025-12-01',
        time: '9:00 PM',
        budget: 3000,
        creator: {
            id: '1',
            name: 'Rahul Sharma',
            avatar: 'https://i.pravatar.cc/150?img=12',
        },
        participants: [
            { id: '2', name: 'Priya', avatar: 'https://i.pravatar.cc/150?img=5' },
            { id: '3', name: 'Arjun', avatar: 'https://i.pravatar.cc/150?img=13' },
        ],
        description: 'Rooftop party with amazing views!',
        isPublic: true,
    },
    {
        id: '2',
        title: 'EDM Night - Neon Nights',
        venue: 'Neon Nights',
        date: '2025-12-02',
        time: '10:00 PM',
        budget: 4000,
        creator: {
            id: '4',
            name: 'Sneha Patel',
            avatar: 'https://i.pravatar.cc/150?img=9',
        },
        participants: [
            { id: '5', name: 'Vikram', avatar: 'https://i.pravatar.cc/150?img=15' },
            { id: '6', name: 'Neha', avatar: 'https://i.pravatar.cc/150?img=20' },
            { id: '7', name: 'Karan', avatar: 'https://i.pravatar.cc/150?img=33' },
        ],
        description: 'Best EDM night in town! Join us!',
        isPublic: true,
    },
    {
        id: '3',
        title: 'Chill Friday at Velvet',
        venue: 'The Velvet Room',
        date: '2025-11-30',
        time: '8:00 PM',
        budget: 2500,
        creator: {
            id: '8',
            name: 'Amit Kumar',
            avatar: 'https://i.pravatar.cc/150?img=51',
        },
        participants: [
            { id: '9', name: 'Riya', avatar: 'https://i.pravatar.cc/150?img=16' },
        ],
        description: 'Live music and good vibes',
        isPublic: true,
    },
];

// Mock messages storage
const mockMessagesStore = {};

// Mock user settings storage
const mockUserSettings = {};

// API functions with mock data
export const getClubs = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockClubs), 300);
    });
};

export const getClubById = async (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const club = mockClubs.find(c => c.id === id);
            resolve(club);
        }, 200);
    });
};

export const getPlans = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockPlans), 300);
    });
};

export const createPlan = async (planData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newPlan = {
                id: Date.now().toString(),
                ...planData,
                participants: [],
                creator: {
                    id: planData.creatorId || '1',
                    name: planData.creator?.name || 'You',
                    avatar: planData.creator?.avatar || 'https://i.pravatar.cc/150?img=1',
                },
            };
            mockPlans.unshift(newPlan);
            resolve({ success: true, planId: newPlan.id });
        }, 300);
    });
};

export const getChatMessages = async (chatId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const messages = mockMessagesStore[chatId] || [];
            resolve(messages);
        }, 200);
    });
};

export const sendMessage = async (chatId, senderId, message) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!mockMessagesStore[chatId]) {
                mockMessagesStore[chatId] = [];
            }
            const newMessage = {
                id: Date.now().toString(),
                chatId,
                message,
                senderId: senderId.toString(),
                senderName: 'You',
                senderAvatar: 'https://i.pravatar.cc/150?img=1',
                createdAt: new Date(),
            };
            mockMessagesStore[chatId].push(newMessage);
            resolve({ success: true, messageId: newMessage.id });
        }, 200);
    });
};

export const getUserSettings = async (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const settings = mockUserSettings[userId] || {
                dark_mode: true,
                language: 'en',
                notifications: true,
                privacy_level: 'public',
            };
            resolve(settings);
        }, 200);
    });
};

export const updateUserSettings = async (userId, settings) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            mockUserSettings[userId] = settings;
            resolve({ success: true });
        }, 200);
    });
};

export const updateUserProfile = async (userId, data) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // In a real app, this would update the user in database
            resolve({ success: true });
        }, 200);
    });
};

export const login = async (email, password) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (email && password) {
                const mockUser = {
                    id: '1',
                    email: email,
                    name: email.split('@')[0],
                    avatar: 'https://i.pravatar.cc/150?img=1',
                };
                resolve({ success: true, user: mockUser });
            } else {
                resolve({ success: false, error: 'Invalid credentials' });
            }
        }, 500);
    });
};

export const signup = async (name, email, password) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (name && email && password) {
                const mockUser = {
                    id: Date.now().toString(),
                    email: email,
                    name: name,
                    avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70),
                };
                resolve({ success: true, user: mockUser });
            } else {
                resolve({ success: false, error: 'Invalid input' });
            }
        }, 500);
    });
};
