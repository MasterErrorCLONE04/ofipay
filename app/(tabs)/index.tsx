import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  CreditCard, 
  Send, 
  Download, 
  Plus, 
  Eye,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Text style={styles.profileInitial}>JD</Text>
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.balanceCard}
      >
        <View style={styles.balanceHeader}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <TouchableOpacity>
            <Eye size={20} color="rgba(255, 255, 255, 0.8)" />
          </TouchableOpacity>
        </View>
        <Text style={styles.balanceAmount}>$12,450.00</Text>
        <Text style={styles.balanceSubtext}>Available balance</Text>
        
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Send size={20} color="#ffffff" />
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Download size={20} color="#ffffff" />
            <Text style={styles.actionText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Plus size={20} color="#ffffff" />
            <Text style={styles.actionText}>Add Money</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <ArrowUpRight size={20} color="#10B981" />
          </View>
          <Text style={styles.statValue}>$2,340</Text>
          <Text style={styles.statLabel}>Income</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <ArrowDownLeft size={20} color="#EF4444" />
          </View>
          <Text style={styles.statValue}>$1,890</Text>
          <Text style={styles.statLabel}>Expenses</Text>
        </View>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <TrendingUp size={20} color="#667eea" />
          </View>
          <Text style={styles.statValue}>+12%</Text>
          <Text style={styles.statLabel}>Growth</Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {[
            { name: 'Netflix Subscription', amount: '-$15.99', type: 'expense', icon: '🎬' },
            { name: 'Salary Deposit', amount: '+$3,200.00', type: 'income', icon: '💼' },
            { name: 'Coffee Shop', amount: '-$4.50', type: 'expense', icon: '☕' },
            { name: 'Transfer from John', amount: '+$150.00', type: 'income', icon: '👤' },
          ].map((transaction, index) => (
            <TouchableOpacity key={index} style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <Text style={styles.transactionEmoji}>{transaction.icon}</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionName}>{transaction.name}</Text>
                <Text style={styles.transactionDate}>Today, 2:30 PM</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                transaction.type === 'income' ? styles.incomeAmount : styles.expenseAmount
              ]}>
                {transaction.amount}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <CreditCard size={24} color="#667eea" />
            </View>
            <Text style={styles.quickActionText}>Pay Bills</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Send size={24} color="#667eea" />
            </View>
            <Text style={styles.quickActionText}>Transfer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <Plus size={24} color="#667eea" />
            </View>
            <Text style={styles.quickActionText}>Top Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIcon}>
              <TrendingUp size={24} color="#667eea" />
            </View>
            <Text style={styles.quickActionText}>Invest</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginTop: 4,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#ffffff',
  },
  balanceCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  balanceAmount: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 24,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#667eea',
  },
  transactionsList: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 4,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  incomeAmount: {
    color: '#10B981',
  },
  expenseAmount: {
    color: '#EF4444',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  quickActionItem: {
    width: '22%',
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
  },
});