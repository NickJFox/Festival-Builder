import React, { useState } from 'react';
import { StyleSheet, Pressable, Modal, View, Text, TextInput, ScrollView, Image } from 'react-native';
import { encode } from 'base-64';
import { MaterialIcons } from '@expo/vector-icons';

const clientId = '1a3d3da496d644dcbc9692bdd12edbab';
const clientSecret = 'ab050522e497418ea0c5c33af68385a1';

type ErrorType = any;

const Headliners: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType>(null);
    const [selectedArtists, setSelectedArtists] = useState<any[]>([]);

    const base64Encode = (str: string): string => {
        return encode(str);
    };

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

    const getAccessToken = async () => {
        const authString = `${clientId}:${clientSecret}`;
        const authBase64 = base64Encode(authString);

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authBase64}`
            },
            body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
            throw new Error('Failed to retrieve access token');
        }

        const data = await response.json();
        return data.access_token;
    };

    const fetchArtists = async (query: string, accessToken: string) => {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch artists');
        }

        const data = await response.json();
        return data.artists.items;
    };

    const handleSelectArtist = (artist: any) => {
        if (selectedArtists.length < 2) {
            setSelectedArtists([...selectedArtists, artist]);
            setModalVisible(false); // Close the modal
        }
    };

    const handleDeleteArtist = (index: number) => {
        const updatedArtists = [...selectedArtists];
        updatedArtists.splice(index, 1);
        setSelectedArtists(updatedArtists);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={() => setModalVisible(true)} style={styles.button}>
                <Text style={styles.buttonText}>Choose 2 Headliners</Text>
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
                            <Text style={styles.selectedArtistName}>{artist.name}</Text>
                            <Pressable onPress={() => handleDeleteArtist(index)} style={styles.deleteButton}>
                                <MaterialIcons name="delete" size={24} color="red" />
                            </Pressable>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
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
        maxHeight: 200, // Limit the height of the ScrollView to enable scrolling
    },
});

export default Headliners;
