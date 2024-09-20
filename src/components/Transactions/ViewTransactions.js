import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ViewTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL || 'http://localhost:5001';

    // Fetch transactions data from the server
    const fetchTransactions = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${serverBaseUrl}/GetTransactions`);
            setTransactions(response.data);
            setFilteredTransactions(response.data);  // Initialize with all transactions
            setError(null);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError('Failed to fetch transactions');
        } finally {
            setIsLoading(false);
        }
    }, [serverBaseUrl]);

    // Fetch transactions on component mount
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Filter transactions by user name
    useEffect(() => {
        setFilteredTransactions(
            transactions.filter(transaction =>
                transaction.user_name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, transactions]);

    return (
        <div className="px-4 py-2">
            <h2 className="text-2xl font-bold mb-4">Transactions</h2>
            <input
                type="text"
                placeholder="Search by user name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full px-4 py-2 border rounded-lg shadow-sm"
            />
            {error && <p className="text-red-500">{error}</p>}
            {isLoading ? <p>Loading...</p> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTransactions.map(transaction => (
                        <div key={transaction.id} className="p-4 border rounded-lg shadow-lg bg-white">
                            <h3 className="text-lg font-semibold">{transaction.user_name}</h3>
                            <p className="text-gray-600">Email: {transaction.email}</p>
                            <p className="text-gray-600">Tour Title: {transaction.tour_title}</p>
                            <p className="text-gray-600">
                                Amount: $
                                {isNaN(Number(transaction.amount)) ? 'N/A' : Number(transaction.amount).toFixed(2)}
                            </p>
                            <p className="text-green-500 font-bold">Paid</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewTransactions;
