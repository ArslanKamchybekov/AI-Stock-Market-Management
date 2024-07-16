import DashboardBox from "@/components/DashboardBox"
import { Box, Input, TextField, Typography } from "@mui/material"
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Stocks = () => {
    const columns: GridColDef[] = [
        { field: 'open', headerName: 'Open', width: 100 },
        { field: 'high', headerName: 'High', width: 100 },
        { field: 'low', headerName: 'Low', width: 100 },
        { field: 'close', headerName: 'Close', width: 100 },
        { field: 'adjClose', headerName: 'Adj Close', width: 100 },
        { field: 'volume', headerName: 'Volume', width: 150 },
    ];

    const rows = [
        { id: 1, open: 100, high: 110, low: 95, close: 105, adjClose: 104, volume: 2000 },
        { id: 2, open: 90, high: 120, low: 90, close: 90, adjClose: 102, volume: 1900 },
        { id: 3, open: 95, high: 120, low: 90, close: 90, adjClose: 102, volume: 1800 },
        { id: 4, open: 110, high: 115, low: 92, close: 102, adjClose: 102, volume: 2020 },
        { id: 5, open: 85, high: 120, low: 90, close: 90, adjClose: 102, volume: 1500 },
        { id: 6, open: 80, high: 120, low: 90, close: 90, adjClose: 102, volume: 1200 }
    ];

    const sampleData = [
        { month: 'January', original: 65, predicted: 60 },
        { month: 'February', original: 59, predicted: 55 },
        { month: 'March', original: 80, predicted: 75 },
        { month: 'April', original: 81, predicted: 70 },
        { month: 'May', original: 56, predicted: 50 },
        { month: 'June', original: 60, predicted: 80 },
        { month: 'July', original: 55, predicted: 90 },
        { month: 'August', original: 70, predicted: 75 },
        { month: 'September', original: 75, predicted: 61 },
        { month: 'October', original: 45, predicted: 54 },
        { month: 'November', original: 50, predicted: 59 },
        { month: 'December', original: 54, predicted: 69 }
    ];

    return (
        <>
            <Typography variant="h4" gutterBottom>
                Stock Price Predictor
            </Typography>
            <TextField 
                label="Predictor" 
                variant="outlined" 
                fullWidth
                sx={{
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
            <Typography variant="h4" gutterBottom>Stock Name</Typography>
            <Input 
                aria-label="Stock Name Input"
                placeholder="Stock Name"
                sx={{
                    color: 'white',
                    '&:before': {
                        borderColor: 'white',
                    },
                    '&:hover:not(.Mui-disabled):before': {
                        borderColor: 'white',
                    },
                    '&.Mui-focused:before': {
                        borderColor: 'white',
                    },
                    '& input': {
                        color: 'white',
                    },
                }}
            />
            <br />
            <br />
            <Box marginY={2} sx={{ color: 'white' }}>
                <Typography variant="h5" gutterBottom>
                    Stock Data
                </Typography>
                <div style={{ height: 400, width: '100%', color: 'white' }}>
                    <DataGrid rows={rows} columns={columns} sx={{ color: 'white' }} />
                </div>
            </Box>
            <br />
            <br />
            <Typography variant="h5" gutterBottom>
                Original vs Predicated Data
            </Typography>
            <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="original" stroke="rgb(75, 192, 192)" strokeWidth={2} dot={{ fill: 'rgb(75, 192, 192)' }} />
                        <Line type="monotone" dataKey="predicted" stroke="rgb(153, 102, 255)" strokeWidth={2} dot={{ fill: 'rgb(153, 102, 255)' }} />
                    </LineChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default Stocks