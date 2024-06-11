import React, { useState } from 'react';
import { StyleSheet, Pressable, ImageBackground, Dimensions, View as RNView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Link } from "expo-router";

const { width, height } = Dimensions.get('window');


interface TabOneScreenProps {
  // Put any props needed here
}

const image = { uri: 'https://blackwhite.pictures/media/t/1204/music-festival-crowd-royalty-free-stock-photo-and-image-2911.jpg' };


export let budgetSpan: number = 0;

const TabOneScreen: React.FC<TabOneScreenProps> = () => {

  const [budget, setBudget] = useState(0);

  budgetSpan = budget;


  return (
    // Thinking to add Festival Background PNG as a background image
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <RNView style={styles.overlay} />
        <Text style={styles.title}>Build Your Own Festival!</Text>

        <Link href="/festinit" asChild>
          <Pressable style={styles.button} onPress={() => { setBudget(1000000) }}>
            <Text style={styles.text}>Small Festival</Text>
          </Pressable>
        </Link>

        <Link href="/festinit" asChild>
          <Pressable style={styles.button2} onPress={() => { setBudget(50000000) }}>
            <Text style={styles.text}>Medium Festival</Text>
          </Pressable>
        </Link>

        <Link href="/festinit" asChild>
          <Pressable style={styles.button3} onPress={() => { setBudget(100000000) }}>
            <Text style={styles.text}>Large Festival</Text>
          </Pressable>
        </Link>
      </ImageBackground>
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
    color: 'white',
    zIndex: 2,
  },
  image: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 1,
  },
  button: {
    backgroundColor: '#008000',
    borderRadius: 50,
    borderWidth: 2,
    width: 200,
    margin: 15,
    padding: 10,
    zIndex: 2,
  },
  button2: {
    backgroundColor: '#0000ff',
    borderRadius: 50,
    borderWidth: 2,
    width: 200,
    margin: 15,
    padding: 10,
    zIndex: 2,
  },
  button3: {
    backgroundColor: '#ff0000',
    borderRadius: 50,
    borderWidth: 2,
    width: 200,
    margin: 15,
    padding: 10,
    zIndex: 2,
  },
  text: {
    textAlign: 'center',
    color: 'white',
    zIndex: 2,
  },
});