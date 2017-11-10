import express from 'express';
import bodyParser from 'body-parser';
import consign from 'consign';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))

consign()
    .include("routes")
    .then("services")
    .into(app)

app.listen(8080, () => {
    console.log('Server listen on 8080');
})