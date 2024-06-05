const express = require('express');

const fs = require('fs');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

const readData = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading data:', err);
        return [];
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Error writing data:', err);
    }
};

//api endpoint to access data
app.get('/users', (req, res) => {
    const data = readData();
    res.json(data);
});

//api endpoint to add data
app.post('/users', (req, res) => {
    const data = readData();
    const newData = req.body;
    console.log(newData);
    newData.id = data.length ? data[data.length - 1].id + 1 : 1;
    data.push(newData);
    writeData(data);
    res.status(201).json(newData);
});

//api endpoint to delete data based on id passed
app.delete('/users/:id', (req, res) => {
    const data = readData();
    const { id } = req.params;
    const userIndex = data.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    data.splice(userIndex, 1);
    writeData(data);
    res.status(200).json({ message: 'User deleted successfully' });
});

//api endpoint to update data based on id passed
app.put('/users/:id', (req, res) => {
    const data = readData();
    console.log(data)
    const { id } = req.params;
    console.log(id)
    const updatedData = req.body;
    console.log(updatedData)
    const userIndex = data.findIndex(user => user.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    data[userIndex] = { ...data[userIndex], ...updatedData };
    writeData(data);
    res.status(200).json(data[userIndex]);
});
app.listen(3000);
