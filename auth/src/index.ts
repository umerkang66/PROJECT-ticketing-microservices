import express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!!!!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
