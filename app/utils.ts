interface RequestDetails {
    method: string;
    url: string;
    headers: Record<string, string>;
    data: any;
}

export function curlToJson(curlCommand: string): RequestDetails {
    const json: RequestDetails = {
        method: 'GET', // Default method
        url: '',
        headers: {},
        data: null
    };

    // Split the curl command into parts, respecting quoted strings
    const parts = curlCommand.split(/\s+(?=(?:[^'"]*['"][^'"]*['"])*[^'"]*$)/g);

    let i = 0;
    while (i < parts.length) {
        switch (parts[i]) {
            case 'curl':
                i++;
                break;
            case '-X':
                json.method = parts[i + 1];
                i += 2;
                break;
            case '-H':
                const header = parts[i + 1].split(':');
                json.headers[header[0].trim()] = header.slice(1).join(':').trim();
                i += 2;
                break;
            case '-d':
                const dataString = parts[i + 1].replace(/(^'|'$)/g, '');
                try {
                    json.data = JSON.parse(dataString); // Parse if it's JSON data
                } catch (e) {
                    json.data = dataString; // Leave as a string if not JSON
                }
                i += 2;
                break;
            default:
                if (!json.url) {
                    json.url = parts[i].replace(/(^'|"$)/g, ''); // Remove surrounding quotes
                }
                i++;
                break;
        }
    }

    return json;
}

    export const extractCurl = (curl: string) => {
        try {
            const parsedCurl = curlToJson(curl);
            return parsedCurl;
        } catch (error) {
            throw error;
        }
    };