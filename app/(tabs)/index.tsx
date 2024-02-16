import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from "expo-router";


interface TabOneScreenProps {
  // Put any props needed here
}

export let budgetSpan: number = 0;

const TabOneScreen: React.FC<TabOneScreenProps> = () => {

  const [budget, setBudget] = useState(0);

  budgetSpan = budget;


  return (
    // Thinking to add Festival Background PNG as a background image
    <View style={styles.container}>
      <Text style={styles.title}>Build Your Own Festival</Text>

    <Link href="/lineup" asChild>
      <Pressable style={styles.button} onPress={() => { setBudget(1000000)}}>
        <Text style={styles.text}>Small Festival</Text>
      </Pressable>
    </Link>

    <Link href="/lineup" asChild>
      <Pressable style={styles.button2} onPress={() => { setBudget(50000000)}}>
        <Text style={styles.text}>Medium Festival</Text>
      </Pressable>
    </Link>

    <Link href="/lineup" asChild>
      <Pressable style={styles.button3} onPress={() => { setBudget(100000000)}}>
        <Text style={styles.text}>Large Festival</Text>
      </Pressable>
    </Link>

    </View>
  );
}

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    backgroundColor: '#008000',
    borderRadius: 50,
    borderWidth: 2,
    width: '10%',
    margin: 15,
    padding: 10,
  },
  button2: {
    backgroundColor: '#0000ff',
    borderRadius: 50,
    borderWidth: 2,
    width: '10%',
    margin: 15,
    padding: 10,
  },
  button3: {
    backgroundColor: '#ff0000',
    borderRadius: 50,
    borderWidth: 2,
    width: '10%',
    margin: 15,
    padding: 10,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  }
});
