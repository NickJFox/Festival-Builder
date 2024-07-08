import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable, ImageBackground, Dimensions, View as RNView } from 'react-native';
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


const beachImage = { uri: `https://i.pinimg.com/564x/b1/85/35/b18535bad5094bc64601042451bef351.jpg` };
const forestImage = { uri: `https://pics.craiyon.com/2023-12-03/-BjUvyNfQjGS90jA7Rn61g.webp` };
const mtsImage = { uri: `https://assets.wfcdn.com/im/05196426/resize-h445%5Ecompr-r85/2395/239588670/%22+Landscape+Mountain+%22.jpg` };
const desertImage = { uri: `https://static.vecteezy.com/system/resources/previews/000/224/422/large_2x/vector-desert-landscape-illustration.jpg` };
const countryImage = { uri: `https://st5.depositphotos.com/75677278/63450/v/450/depositphotos_634502478-stock-illustration-autumn-sunny-eco-harvesting-farm.jpg` };
const urbanImage = { uri: `https://static.vecteezy.com/system/resources/previews/005/006/728/original/sunset-modern-city-skyline-landscape-with-orange-sky-of-town-buildings-and-cityscape-sky-in-flat-illustration-for-poster-banner-or-background-vector.jpg` };

const getImageByTheme = (theme: string) => {
    switch (theme) {
        case 'Beach':
            return beachImage;
        case 'Forest':
            return forestImage;
        case 'Mountains':
            return mtsImage;
        case 'Desert':
            return desertImage;
        case 'Country':
            return countryImage;
        case 'Urban':
            return urbanImage;
        default:
            return beachImage; // Default image if theme doesn't match
    }
};

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
            <ImageBackground source={getImageByTheme(selectedFestTheme)} resizeMode="cover" style={styles.image}>
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
        backgroundColor: 'black',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    subsContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    supportContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
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
        color: 'white',
        marginRight: 10,
    },
    headliner: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 10,
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginRight: 8,
    },
    support: {
        fontSize: 16,
        color: 'white',
        marginRight: 6,
    },
});
