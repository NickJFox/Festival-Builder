import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, View, Text } from 'react-native';

const Subheaders: React.FC = () => {
    const [selectedSubheader, setSelectedSubheader] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleSelectSubheader = (subheader: string) => {
        setSelectedSubheader(subheader);
        setModalVisible(false);
        // Perform any action with the selectedSubheader state here, such as saving it to a database or displaying it below the button.
    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Choose Subheader</Text>
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
                            style={[styles.subheaderButton, selectedSubheader === 'Subheader 1' && styles.selectedSubheaderButton]}
                            onPress={() => handleSelectSubheader('Subheader 1')}
                        >
                            <Text style={styles.subheaderButtonText}>Subheader 1</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.subheaderButton, selectedSubheader === 'Subheader 2' && styles.selectedSubheaderButton]}
                            onPress={() => handleSelectSubheader('Subheader 2')}
                        >
                            <Text style={styles.subheaderButtonText}>Subheader 2</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {selectedSubheader !== '' && (
                <Text style={styles.subheaderText}>Selected Subheader: {selectedSubheader}</Text>
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
    subheaderButton: {
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        margin: 5,
    },
    selectedSubheaderButton: {
        backgroundColor: 'green',
    },
    subheaderButtonText: {
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
    subheaderText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Subheaders;
