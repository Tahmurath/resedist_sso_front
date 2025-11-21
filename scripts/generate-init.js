import fs from "fs";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";


// const crypto = require('crypto');

function generateSimulatedInitData(botToken, userData) {
    const params = {
        query_id: 'some_query_id', // Simulate a query ID
        user: JSON.stringify(userData), // User object as JSON string
        auth_date: Math.floor(Date.now() / 1000), // Current timestamp
        // Add other relevant parameters as needed for your simulation
    };

    const sortedKeys = Object.keys(params).sort();
    const dataCheckString = sortedKeys
        .map(key => `${key}=${params[key]}`)
        .join('\n');

    const secretKey = crypto.createHmac('sha256', 'WebAppData')
        .update(botToken)
        .digest();

    const hash = crypto.createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    // Combine all parameters, including the calculated hash, into a URL-encoded string
    const initDataArray = sortedKeys.map(key => `${key}=${encodeURIComponent(params[key])}`);
    initDataArray.push(`hash=${hash}`);

    return initDataArray.join('&');
}

// Example usage:
const myBotToken = '8275723706:AAGbwqB6Bq0lj-0fKulIzDdHVYEz_L3sRCs'; // Replace with your actual bot token
const simulatedUser = {
    id: 123456789,
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    language_code: 'en'
};

const simulatedInitData = generateSimulatedInitData(myBotToken, simulatedUser);
console.log(simulatedInitData);