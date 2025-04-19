import { useEffect, useState } from 'react';

function DataFetcher() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=100&type=boolean')
            .then(response => {
                // if (!response.ok) throw new Error('Network response was not ok');
                // TODO: response.json().response_code?
                return response.json();
            })
            .then(jsonData => {
                setData(jsonData);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    );
}

export default DataFetcher;