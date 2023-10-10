import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { addHouseRoute, houseDetailsRoute, updateHouseRoute, getToken, refreshToken, getinvoicesHealth, getinvoiceNumber, getAuthorizationCode } from './routes.js';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = 8080;

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});

app.post('/api/houses', addHouseRoute);

app.get('/api/houses/:id', houseDetailsRoute);

app.put('/api/houses/:id', updateHouseRoute);

app.get('/api/getToken', getToken);
app.get('/api/refreshToken', refreshToken);
app.post('/api/invoicesHealth', getinvoicesHealth);
app.post('/api/invoicesHealth', getinvoiceNumber);
app.post('/api/authorizationCode', getAuthorizationCode);

