import express, { Router } from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const defaultPort = 3333;
app.listen(defaultPort, () => {
  console.log(`Server running on http://localhost:${defaultPort}`);
})