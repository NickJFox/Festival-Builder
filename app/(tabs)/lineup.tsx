import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import Headliners from '@/components/headliners';
import Subheaders from '@/components/subheaders';
import { budgetSpan } from '.';

export let updatedBudget: number = 0;

export default function TabTwoScreen() {
    const navigation = useNavigation();

    const [remainingBudget, setRemainingBudget] = useState(budgetSpan);

    updatedBudget = remainingBudget;

    // Function to update the remaining budget
    const handleSubtractBudget = (artistCost: number) => {
        // Subtract artist cost from the remaining budget
        setRemainingBudget(prevBudget => prevBudget - artistCost);
    };
    

    const formattedBudget = remainingBudget.toLocaleString('en-US', {
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
                <Headliners onSubtractBudget={handleSubtractBudget} />
                <Subheaders onSubtractBudget={handleSubtractBudget}/>
            </View>
                <Link href="/lineup2" asChild>
                    <Pressable style={styles.button2}>
                        <Text style={styles.buttonText}>Choose Support Acts</Text>
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
    button2: {
        backgroundColor: '#008000',
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
