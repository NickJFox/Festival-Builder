import { encode } from 'base-64';
import { CLIENT_ID, CLIENT_SECRET } from '@env';

const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;

type ErrorType = any;

const base64Encode = (str: string): string => {
    return encode(str);
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

export { base64Encode, getAccessToken, fetchArtists };
