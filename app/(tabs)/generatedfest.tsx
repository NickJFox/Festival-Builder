import React, { useEffect, useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import Festname from '@/components/festname';
import Theme from '@/components/theme';
import { Link } from 'expo-router';
import { budgetSpan } from '.';
import { selectedHeadliners } from "@/components/headliners";

export let updatedBudget: number = 0;

export default function GeneratedFest() { // Renamed function name to follow convention
    const navigation = useNavigation();

    updatedBudget = budgetSpan;

    const formattedBudget = budgetSpan.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    });

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>{'<'}</Text>
            </Pressable>
            <View>
                <Text>Selected Artists:</Text>
                {selectedHeadliners.map((artist: any, index: number) => ( // Ensure correct type for artist and index
                    <Text key={index}>{artist.name}</Text>
                ))}
            </View>
            <Link href="/lineup" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Fest Generated</Text>
                </Pressable>
            </Link>
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
});
