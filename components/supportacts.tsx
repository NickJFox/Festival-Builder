import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, View, Text } from 'react-native';

const SupportActs: React.FC = () => {
    const [selectedSupportAct, setSelectedSupportAct] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleSelectSupportAct = (supportAct: string) => {
        setSelectedSupportAct(supportAct);
        setModalVisible(false);
        // Perform any action with the selectedSupportAct state here, such as saving it to a database or displaying it below the button.
    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Choose Support Act</Text>
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
                            style={[styles.supportActButton, selectedSupportAct === 'Support Act 1' && styles.selectedSupportActButton]}
                            onPress={() => handleSelectSupportAct('Support Act 1')}
                        >
                            <Text style={styles.supportActButtonText}>Support Act 1</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.supportActButton, selectedSupportAct === 'Support Act 2' && styles.selectedSupportActButton]}
                            onPress={() => handleSelectSupportAct('Support Act 2')}
                        >
                            <Text style={styles.supportActButtonText}>Support Act 2</Text>
                        </Pressable>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {selectedSupportAct !== '' && (
                <Text style={styles.supportActText}>Selected Support Act: {selectedSupportAct}</Text>
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
    supportActButton: {
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        margin: 5,
    },
    selectedSupportActButton: {
        backgroundColor: 'green',
    },
    supportActButtonText: {
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
    supportActText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default SupportActs;
