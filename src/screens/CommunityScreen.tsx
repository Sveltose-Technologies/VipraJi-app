import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import { Post, PostType } from '../types/community';
import { MOCK_POSTS } from '../data/mockCommunity';
import CreatePostModal from '../components/CreatePostModal';
import { RootStackParamList } from '../navigation/AppNavigator';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CommunityScreen = () => {
  const { colors, isDark } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState<PostType | 'all'>('all');

  const handleCreatePost = (title: string, content: string, type: PostType) => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      content,
      type,
      author: { id: 'admin', name: 'You (PanditJi)', verified: true },
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.type === filter);

  const getBadgeColor = (type: PostType) => {
    switch(type) {
      case 'question': return '#F59E0B'; // Orange
      case 'knowledge': return '#16A34A'; // Green
      case 'suggestion': return '#2563EB'; // Blue
    }
  };

  const renderPost = ({ item }: { item: Post }) => (
    <TouchableOpacity 
      style={[styles.postCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    >
      <View style={styles.postHeader}>
        <View style={styles.authorContainer}>
          <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.avatarText, { color: colors.primary }]}>{item.author.name.charAt(0)}</Text>
          </View>
          <View>
            <View style={styles.nameRow}>
              <Text style={[styles.authorName, { color: colors.text }]}>{item.author.name}</Text>
              {item.author.verified && <Icon name="check-circle" size={14} color="#16A34A" style={styles.verified} />}
            </View>
            <Text style={[styles.time, { color: colors.textLight }]}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={[styles.badge, { backgroundColor: getBadgeColor(item.type) + '20' }]}>
          <Text style={[styles.badgeText, { color: getBadgeColor(item.type) }]}>
            {item.type.toUpperCase()}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.postTitle, { color: colors.text }]}>{item.title}</Text>
      <Text style={[styles.postContent, { color: colors.textLight }]} numberOfLines={3}>
        {item.content}
      </Text>
      
      <View style={styles.postFooter}>
        <View style={styles.footerItem}>
          <Icon name="heart" size={18} color={colors.textLight} />
          <Text style={[styles.footerText, { color: colors.textLight }]}>{item.likes}</Text>
        </View>
        <View style={styles.footerItem}>
          <Icon name="message-square" size={18} color={colors.textLight} />
          <Text style={[styles.footerText, { color: colors.textLight }]}>{item.comments.length}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.primaryDark }]}>Community</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textLight }]}>
          Share knowledge and discuss with other Pandits.
        </Text>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {(['all', 'question', 'knowledge', 'suggestion'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterPill,
              filter === f ? { backgroundColor: colors.primary } : { backgroundColor: colors.surface, borderColor: colors.border }
            ]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, { color: filter === f ? '#FFF' : colors.text }]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredPosts}
        keyExtractor={item => item.id}
        renderItem={renderPost}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="edit-2" size={24} color="#FFF" />
      </TouchableOpacity>

      <CreatePostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreatePost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, paddingTop: 30, paddingBottom: 10 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { fontSize: 16 },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 8,
  },
  filterText: { fontSize: 12, fontWeight: 'bold' },
  listContainer: { padding: 16, paddingBottom: 100 },
  postCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: { fontSize: 18, fontWeight: 'bold' },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  authorName: { fontSize: 14, fontWeight: 'bold' },
  verified: { marginLeft: 4 },
  time: { fontSize: 12, marginTop: 2 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { fontSize: 10, fontWeight: 'bold', letterSpacing: 0.5 },
  postTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  postContent: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  postFooter: { flexDirection: 'row' },
  footerItem: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  footerText: { marginLeft: 6, fontSize: 14, fontWeight: '500' },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  }
});

export default CommunityScreen;
