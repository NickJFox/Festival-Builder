import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { budgetSpan } from '.';
import { selectedHeadliners } from "@/components/headliners";
import { selectedSubHeaders } from '@/components/subheaders';
import { selectedSupportActs } from '@/components/supportacts';
import { selectedFestName } from '@/components/festname';
import { selectedFestTheme } from '@/components/theme';

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
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{selectedFestName}</Text>
            </View>
            <View>
                <View style={styles.headlinersContainer}>
                    {renderArtistsWithSeparator(selectedHeadliners, styles.headliner)}
                </View>
            </View>
            <View>
                <View style={styles.subsContainer}>
                    {renderArtistsWithSeparator(selectedSubHeaders, styles.subHeader)}
                </View>
            </View>
            <View>
                <View style={styles.supportContainer}>
                    {renderArtistsWithSeparator(selectedSupportActs, styles.support)}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    supportContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    headerContainer: {
        position: 'absolute',
        top: 180,
        width: '100%',
        alignItems: 'center',
        zIndex: 1,
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
