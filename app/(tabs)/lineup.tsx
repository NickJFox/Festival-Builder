import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { budgetSpan } from '.';
import { useNavigation } from '@react-navigation/native';
import Festname from '@/components/festname';

export default function TabTwoScreen() {
    const navigation = useNavigation();

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
            <View style={styles.budgetContainer}>
                <Text style={styles.budgetText}>Budget: {formattedBudget}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Choose Festival Name</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Choose Festival Theme</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Choose 2 Headliners</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Choose 4 Sub-headers</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Choose 8 Support Acts</Text>
                </Pressable>
            </View>
            <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>Generate</Text>
                </Pressable>
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
        top: 60,
        left: 20,
        padding: 15,
    },
    backButtonText: {
        fontSize: 35,
    },
    budgetContainer: {
        position: 'absolute',
        top: 140,
        left: 20,
    },
    budgetText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 40,
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 50,
    },
    button: {
        backgroundColor: 'blue',
        marginVertical: 20, // Added marginVertical to space out buttons
        padding: 15,
        borderRadius: 10,
        minWidth: 200,
        alignItems: 'center', 
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
