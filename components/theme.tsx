import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, View, Text } from 'react-native';

const Theme: React.FC = () => {
    const [selectedTheme, setSelectedTheme] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleSelectTheme = (theme: string) => {
        if (selectedTheme === theme) {
            setSelectedTheme('');
        } else {
            setSelectedTheme(theme);
        }
    };

    const handleModalSubmit = () => {
        setModalVisible(false);
        // Perform any action with the selectedTheme state here, such as saving it to a database or displaying it below the button.
    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Choose Festival Theme</Text>
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
                            style={[styles.themeButton, selectedTheme === 'Beach' && styles.selectedThemeButton]}
                            onPress={() => handleSelectTheme('Beach')}
                        >
                            <Text style={styles.themeButtonText}>Beach</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.themeButton, selectedTheme === 'Forest' && styles.selectedThemeButton]}
                            onPress={() => handleSelectTheme('Forest')}
                        >
                            <Text style={styles.themeButtonText}>Forest</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.themeButton, selectedTheme === 'Desert' && styles.selectedThemeButton]}
                            onPress={() => handleSelectTheme('Desert')}
                        >
                            <Text style={styles.themeButtonText}>Desert</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.themeButton, selectedTheme === 'Country' && styles.selectedThemeButton]}
                            onPress={() => handleSelectTheme('Country')}
                        >
                            <Text style={styles.themeButtonText}>Country</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.themeButton, selectedTheme === 'Urban' && styles.selectedThemeButton]}
                            onPress={() => handleSelectTheme('Urban')}
                        >
                            <Text style={styles.themeButtonText}>Urban</Text>
                        </Pressable>
                        {/* Add more theme options as needed */}
                        <Pressable onPress={handleModalSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {selectedTheme !== '' && (
                <Text style={styles.themeText}>Selected Theme: {selectedTheme}</Text>
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
    themeButton: {
        backgroundColor: 'lightgray',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        margin: 5,
    },
    selectedThemeButton: {
        backgroundColor: 'green',
    },
    themeButtonText: {
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    themeText: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Theme;
