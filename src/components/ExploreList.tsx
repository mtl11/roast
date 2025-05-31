import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import colors from '../theme/colors';

const DATA = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
  { id: '4', title: 'Item 4' },
  { id: '5', title: 'Item 5' },
];

// Row Component
function RowComponent({ title }: { title: string }) {
  const handlePress = () => {
    console.log(`Row clicked: ${title}`);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.row}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.rowText}>{title}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

// ListView Component
export default function ExploreList() {
  return (
    <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <RowComponent title={item.title} />}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
    height: '100%',
  },
  row: {
    width: '90%',
    marginVertical: 5,
    borderRadius: 8,
    alignSelf: 'center',
  },
  rowText: {
    fontSize: 16,
    color: '#000',
  },
  card: {
    backgroundColor: colors.toggleBackground, // Change this to your desired card color
    borderRadius: 8,
  },
});