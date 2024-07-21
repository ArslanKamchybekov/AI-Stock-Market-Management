import React, { useState } from "react";
import axios from "axios";
import DashboardBox from "@/components/DashboardBox";
import { Box, TextField, Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Stocks = () => {
    const [company, setCompany] = useState("AAPL");
    const [startDate, setStartDate] = useState("2020-01-01");
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
    const [stockData, setStockData] = useState([]);

    const fetchPredictions = async () => {
        try {
            const response = await axios.post('http://localhost:5000/predict', {
                company: company,
                start: startDate,
                end: endDate
            });

            const actualPrices = response.data.actual;
            const predictedPrices = response.data.predicted;

            const combinedData = actualPrices.map((price, index) => ({
                date: `Day ${index + 1}`,
                actual: price,
                predicted: predictedPrices[index] ? predictedPrices[index][0] : null
            }));
            setStockData(combinedData);
        } catch (error) {
            console.error('Error fetching predictions:', error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'actual', headerName: 'Actual Price', width: 150 },
        { field: 'predicted', headerName: 'Predicted Price', width: 150 },
    ];

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Stock Price Predictor
            </Typography>
            <TextField 
                label="Company"
                variant="outlined"
                fullWidth
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                sx={{
                    marginTop: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '& input': {
                            color: 'white',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                    }
                }}
            />
            <TextField
                label="Start Date"
                variant="outlined"
                fullWidth
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                sx={{
                    marginTop: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '& input': {
                            color: 'white',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                    }
                }}
            />
            <TextField
                label="End Date"
                variant="outlined"
                fullWidth
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                sx={{
                    marginTop: 2,
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white',
                        },
                        '& input': {
                            color: 'white',
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'white',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: 'white',
                    }
                }}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={fetchPredictions}>
                Fetch Predictions
            </Button>
            <Box marginY={2} sx={{ color: 'white' }}>
                <Typography variant="h5" gutterBottom>
                    Stock Data
                </Typography>
                <div style={{ height: 400, width: '100%', color: 'white' }}>
                    <DataGrid rows={stockData} columns={columns} sx={{ color: 'white' }} />
                </div>
            </Box>
            <br />
            <br />
            <Typography variant="h5" gutterBottom>
                Original vs Predicted Data
            </Typography>
            <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="actual" stroke="rgb(75, 192, 192)" strokeWidth={2} dot={{ fill: 'rgb(75, 192, 192)' }} />
                        <Line type="monotone" dataKey="predicted" stroke="rgb(153, 102, 255)" strokeWidth={2} dot={{ fill: 'rgb(153, 102, 255)' }} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
            <br />
        </>
    );
}

export default Stocks;
