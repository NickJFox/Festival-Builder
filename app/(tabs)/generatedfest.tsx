import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, ImageBackground, Dimensions, View as RNView  } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { budgetSpan } from '.';
import { selectedHeadliners } from "@/components/headliners";
import { selectedSubHeaders } from '@/components/subheaders';
import { selectedSupportActs } from '@/components/supportacts';
import { selectedFestName } from '@/components/festname';
import { selectedFestTheme } from '@/components/theme';


const { width, height } = Dimensions.get('window');

const beachImage = { uri: `https://i.pinimg.com/564x/b1/85/35/b18535bad5094bc64601042451bef351.jpg`};


export let updatedBudget: number = 0;

export default function GeneratedFest() { // Renamed function name to follow convention
    const navigation = useNavigation();

    updatedBudget = budgetSpan;

    const formattedBudget = budgetSpan.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    const renderArtistsWithSeparator = (artists: any, style: any) => (
        artists.map((artist: any, index: any) => (
            <Text key={index} style={style}>
                {artist.name}{index < artists.length - 1 && ' •'}
            </Text>
        ))
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={beachImage} resizeMode="cover" style={styles.image}>
            <RNView style={styles.overlay} />
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{selectedFestName}</Text>
            </View>
                <View style={styles.headlinersContainer}>
                    {renderArtistsWithSeparator(selectedHeadliners, styles.headliner)}
                </View>
                <View style={styles.subsContainer}>
                    {renderArtistsWithSeparator(selectedSubHeaders, styles.subHeader)}
                </View>
                <View style={styles.supportContainer}>
                    {renderArtistsWithSeparator(selectedSupportActs, styles.support)}
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        backgroundColor: 'white',
        opacity: 0.5,
        zIndex: 0,
      },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        padding: 15,
    },
    backButtonText: {
        fontSize: 35,
    },
    budgetContainer: {
        position: 'absolute',
        top: 100,
        left: 20,
        zIndex: 2,
    },
    budgetText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 50,
    },
    button: {
        backgroundColor: 'blue',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 200,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    headlinersContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subsContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    supportContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    headerContainer: {
        position: 'absolute',
        top: 180,
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
        backgroundColor: 'transparent',
      },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        marginRight: 10,
    },
    headliner: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 8,
    },
    support: {
        fontSize: 16,
        marginRight: 6,
    },
});
