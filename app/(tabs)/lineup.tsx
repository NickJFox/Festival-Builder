import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { budgetSpan } from '.';

export default function TabTwoScreen() {

    const formattedBudget = budgetSpan.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });


  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the screen to build your own lineup</Text>
      <Text>Budget: {formattedBudget}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
