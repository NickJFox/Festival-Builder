import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, TextInput, Button, View, Text } from 'react-native';

export let selectedFestName: String = "";

export default function Festname() {
    const [festivalName, setFestivalName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    selectedFestName = festivalName;

    const handleModalSubmit = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Choose Festival Name</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setFestivalName(text)}
                            value={festivalName}
                            placeholder="Enter Festival Name"
                        />
                        <Button title="Submit" onPress={handleModalSubmit} />
                    </View>
                </View>
            </Modal>

            {festivalName !== '' && (
                <Text style={styles.festivalText}>Festival Name: {festivalName}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    festivalText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
