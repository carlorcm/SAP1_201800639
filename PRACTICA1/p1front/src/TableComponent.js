import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TableComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [currentItems, setCurrentItems] = useState([]);
    const [jsonData, setjsonData] = useState([]);

    const API_URL = 'https://reqres.in/api/users?page=1&per_page=18';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(API_URL);
                const data = response.data.data;
                console.log();
                setjsonData(data);
            } catch (error) {
                console.error('Error al obtener los resultados:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setCurrentItems(jsonData.slice(0, itemsPerPage));
    }, [jsonData, itemsPerPage]);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentItems(jsonData.slice(startIndex, endIndex));
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Previous
                </button>
                <button
                    type="button"
                    className="btn btn-light"
                    disabled={currentItems.length < itemsPerPage}
                    onClick={() => paginate(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TableComponent;
