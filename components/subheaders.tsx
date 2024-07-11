import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, View, Text, TextInput, ScrollView, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAccessToken, fetchArtists } from './spotify';
import { updatedBudget } from '@/app/(tabs)/festinit';


interface Props {
    onSubtractBudget: (number: number) => void;
}

export let selectedSubHeaders: Array<any> = [];

const Subheaders: React.FC<Props> = ({ onSubtractBudget }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [selectedArtists, setSelectedArtists] = useState<any[]>([]);
    const [remainingBudget, setRemainingBudget] = useState<number>(updatedBudget); // Initialize with the updated budget


    selectedSubHeaders = selectedArtists;

    const searchArtists = async () => {
        const query = searchTerm.trim();
        if (query === '') {
            return;
        }

        try {
            const accessToken = await getAccessToken();
            const artists = await fetchArtists(query, accessToken);
            setSearchResults(artists);
        } catch (error) {
            setError(error);
        }
    };

    const handleSelectArtist = (artist: any) => {
        if (selectedArtists.length < 4) {
            const artistCost = Math.round(0.20 * artist.followers.total);
            if (handleSubtractBudget(artistCost)) {
                setSelectedArtists([...selectedArtists, artist]);
                setModalVisible(false);
                onSubtractBudget(artistCost);
            }
        } else {
            Alert.alert('Cannot add more sub-headliners. Limit reached.');
        }
    };

    const handleDeleteArtist = (index: number) => {
        const deletedArtist = selectedArtists[index];
        const artistCost = Math.round(0.20 * deletedArtist.followers.total);
        setSelectedArtists((prevArtists) => {
            const updatedArtists = [...prevArtists];
            updatedArtists.splice(index, 1);
            return updatedArtists;
        });
        onSubtractBudget(-artistCost);
    };

    const handleSubtractBudget = (artistCost: number) => {
        const newBudget = remainingBudget - artistCost;
        if (newBudget < 0) {
            Alert.alert('Cannot add more artists. Budget exceeded.');
            return false;
        }
        setRemainingBudget(newBudget);
        return true;
    };

    return (
        <View>
            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Choose 4 Sub-Headliners</Text>
            </Pressable>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                    setSearchResults([]);
                    setSearchTerm('');
                    setError(null);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Search for an artist"
                            onChangeText={setSearchTerm}
                            onSubmitEditing={searchArtists}
                        />
                        <Pressable onPress={searchArtists} style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>Search</Text>
                        </Pressable>
                        {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
                        <ScrollView style={styles.scrollView}>
                            {searchResults.map((item) => {
                                const artistCost = Math.round(0.20 * item.followers.total).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                });

                                return (
                                    <Pressable key={item.id} onPress={() => handleSelectArtist(item)} style={styles.artistContainer}>
                                        <Image
                                            style={styles.artistImage}
                                            source={{ uri: item.images.length > 0 ? item.images[0].url : 'placeholder.png' }}
                                        />
                                        <View>
                                            <Text style={styles.artistName}>{item.name}</Text>
                                            <Text style={styles.artistFollowers}>Artist Cost: {artistCost}</Text>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>
                        <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            {selectedArtists.length > 0 && (
                <View style={styles.selectedArtistsContainer}>
                    <Text style={styles.selectedArtistsText}>Selected Artists:</Text>
                    {selectedArtists.map((artist, index) => (
                        <View key={index} style={styles.selectedArtistContainer}>
                            <Text style={styles.selectedArtistName}>
                                {artist.name} - {Math.round(0.20 * artist.followers.total).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}
                            </Text>
                            <Pressable onPress={() => handleDeleteArtist(index)} style={styles.deleteButton}>
                                <MaterialIcons name="delete" size={24} color="red" />
                            </Pressable>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

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
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    searchButton: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    artistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    artistImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    artistInfo: {
        flex: 1,
    },
    artistName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    artistFollowers: {
        fontSize: 14,
        color: 'gray',
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    selectedArtistsContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    selectedArtistsText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    selectedArtistContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    selectedArtistName: {
        marginLeft: 10,
    },
    deleteButton: {
        marginLeft: 'auto',
    },
    scrollView: {
        maxHeight: 200,
    },
});

export default Subheaders;
