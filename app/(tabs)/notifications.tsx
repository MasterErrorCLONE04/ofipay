import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { useState, useEffect } from 'react';
import { Bell, Calendar, Heart, MessageCircle, CircleCheck as CheckCircle, Clock, X } from 'lucide-react-native';

interface Notification {
  id: string;
  type: 'appointment' | 'like' | 'comment' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  avatar?: string;
  actionData?: any;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Mock data - replace with actual API calls
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'appointment',
        title: 'Appointment Confirmed',
        message: 'Your appointment with Sofia Martinez has been confirmed for tomorrow at 2:00 PM',
        timestamp: '2h ago',
        isRead: false,
        avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
      {
        id: '2',
        type: 'reminder',
        title: 'Appointment Reminder',
        message: 'Don\'t forget your appointment with Miguel Rodriguez tomorrow at 10:00 AM',
        timestamp: '4h ago',
        isRead: false,
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
      {
        id: '3',
        type: 'like',
        title: 'New Like',
        message: 'Sofia Martinez liked your comment on her post',
        timestamp: '1d ago',
        isRead: true,
        avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
      {
        id: '4',
        type: 'comment',
        title: 'New Reply',
        message: 'Ana Gutierrez replied to your comment: "Thanks for the feedback!"',
        timestamp: '2d ago',
        isRead: true,
        avatar: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
      {
        id: '5',
        type: 'appointment',
        title: 'Appointment Cancelled',
        message: 'Carlos Mendez has cancelled your appointment scheduled for Jan 10',
        timestamp: '3d ago',
        isRead: true,
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      },
    ];
    
    setNotifications(mockNotifications);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId 
        ? { ...notif, isRead: true }
        : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notif => notif.id !== notificationId));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar size={20} color="#667eea" />;
      case 'like':
        return <Heart size={20} color="#EF4444" />;
      case 'comment':
        return <MessageCircle size={20} color="#10B981" />;
      case 'reminder':
        return <Clock size={20} color="#F59E0B" />;
      default:
        return <Bell size={20} color="#6B7280" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return '#EEF2FF';
      case 'like':
        return '#FEE2E2';
      case 'comment':
        return '#D1FAE5';
      case 'reminder':
        return '#FEF3C7';
      default:
        return '#F3F4F6';
    }
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  const renderNotification = (notification: Notification) => (
    <TouchableOpacity
      key={notification.id}
      style={[
        styles.notificationCard,
        !notification.isRead && styles.unreadNotification
      ]}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={styles.notificationContent}>
        <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(notification.type) }]}>
          {getNotificationIcon(notification.type)}
        </View>
        
        <View style={styles.notificationBody}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.timestamp}>{notification.timestamp}</Text>
          </View>
          
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          
          {notification.avatar && (
            <View style={styles.avatarContainer}>
              <Image source={{ uri: notification.avatar }} style={styles.avatar} />
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteNotification(notification.id)}
        >
          <X size={16} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      
      {!notification.isRead && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <CheckCircle size={20} color="#667eea" />
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.notificationsList} showsVerticalScrollIndicator={false}>
        {notifications.length > 0 ? (
          <View style={styles.notificationsContainer}>
            {notifications.map(renderNotification)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Bell size={64} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No notifications</Text>
            <Text style={styles.emptyStateText}>
              You're all caught up! Notifications will appear here when you have updates.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 2,
  },
  unreadCount: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  markAllText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#667eea',
  },
  notificationsList: {
    flex: 1,
  },
  notificationsContainer: {
    padding: 20,
    gap: 12,
  },
  notificationCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBody: {
    flex: 1,
    gap: 6,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
  },
  avatarContainer: {
    marginTop: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  deleteButton: {
    padding: 4,
  },
  unreadDot: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 24,
  },
});