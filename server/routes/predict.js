import express from 'express';
import * as tf from '@tensorflow/tfjs-node';
import yfinance from 'yahoo-finance';

const router = express.Router();

// Load the model
const loadModel = async () => {
    const model = await tf.loadLayersModel('/Users/arslankamchybekov/Desktop/Machine Learning/Stock Price prediction/Stock Price Prediction Model.keras');
    return model;
};

router.post('/predict', async (req, res) => {
    const { company, start, end } = req.body;

    try {
        // Fetch data from Yahoo Finance
        const data = await yfinance.download({ symbol: company, start: new Date(start), end: new Date(end) });
        const closePrices = data['Close'].values;

        // Prepare data for prediction
        const model = await loadModel();
        const predictionDays = 60;

        const totalDataset = closePrices.slice(-predictionDays);
        const modelInputs = tf.tensor2d(totalDataset, [totalDataset.length, 1]);
        const scaledInputs = tf.div(tf.sub(modelInputs, modelInputs.min()), tf.sub(modelInputs.max(), modelInputs.min()));

        const xTest = [];
        for (let i = predictionDays; i < scaledInputs.shape[0]; i++) {
            xTest.push(scaledInputs.slice([i - predictionDays, 0], [predictionDays, 1]));
        }
        const xTestTensor = tf.stack(xTest);

        const predictedPrices = model.predict(xTestTensor).dataSync();
        const inverseScaledPredictions = tf.add(tf.mul(predictedPrices, tf.sub(modelInputs.max(), modelInputs.min())), modelInputs.min()).arraySync();

        res.json({ actual: closePrices, predicted: inverseScaledPredictions });
    } catch (error) {
        res.status(500).send('Error during prediction: ' + error.message);
    }
});

export default router;
