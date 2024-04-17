import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, View, Text } from 'react-native';

const Headliners: React.FC = () => {
    const [selectedHeadliner, setSelectedHeadliner] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleSelectHeadliner = (headliner: string) => {
        setSelectedHeadliner(headliner);
        setModalVisible(false);
        // Perform any action with the selectedHeadliner state here, such as saving it to a database or displaying it below the button.
    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Choose Headliner</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("Modal Closed");
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Pressable
                            style={[styles.headlinerButton, selectedHeadliner === 'Artist 1' && styles.selectedHeadlinerButton]}
                            onPress={() => handleSelectHeadliner('Artist 1')}
                        >
                            <Text style={styles.headlinerButtonText}>Artist 1</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.headlinerButton, selectedHeadliner === 'Artist 2' && styles.selectedHeadlinerButton]}
                            onPress={() => handleSelectHeadliner('Artist 2')}
                        >
                            <Text style={styles.headlinerButtonText}>Artist 2</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {selectedHeadliner !== '' && (
                <Text style={styles.headlinerText}>Selected Headliner: {selectedHeadliner}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
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
    headlinerButton: {
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        margin: 5,
    },
    selectedHeadlinerButton: {
        backgroundColor: 'green',
    },
    headlinerButtonText: {
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        margin: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    headlinerText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Headliners;
