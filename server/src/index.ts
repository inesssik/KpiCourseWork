import 'dotenv/config';
import sequelize from './db.js';
import express from 'express';
import cors from 'cors';
import router from './routes/ApiRouter.js';
import errorHandler from './middleware/errorHandlingMiddleware.js';
import fileUpload from 'express-fileupload';
import path from 'path';

const __dirname = import.meta.dirname;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload());
app.use('/api', router);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => { console.log(`Server started on PORT: ${PORT}`); });
} catch (error) {
    console.log(error);
}