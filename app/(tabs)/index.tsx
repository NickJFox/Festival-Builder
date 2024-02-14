import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Link } from "expo-router";


interface TabOneScreenProps {
  // Put any props needed here
}

const TabOneScreen: React.FC<TabOneScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Build Your Own Festival</Text>

    <Link href="/lineup" asChild>
      <Pressable style={styles.button}>
        <Text style={styles.text}>Small Festival</Text>
      </Pressable>
    </Link>

    <Link href="/lineup" asChild>
      <Pressable style={styles.button2}>
        <Text style={styles.text}>Medium Festival</Text>
      </Pressable>
    </Link>

    <Link href="/lineup" asChild>
      <Pressable style={styles.button3}>
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
