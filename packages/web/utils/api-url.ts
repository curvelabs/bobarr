// Dynamic API URL configuration based on environment
const determineApiHost = () => {
    // Check for explicit environment variable first
    if (process.env.WEB_UI_API_URL) {
        return process.env.WEB_UI_API_URL;
    }

    // For server-side rendering
    if (typeof window === 'undefined') {
        return process.env.NODE_ENV === 'production' ? 'http://api:4000' : 'http://localhost:4000';
    }

    // For client-side rendering
    return process.env.NODE_ENV === 'production'
        ? `http://${window.location.hostname}:4000`
        : 'http://localhost:4000';
};

// Export the full API URL
export const apiURL = determineApiHost();
