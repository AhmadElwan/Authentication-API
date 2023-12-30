import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
const port = 3000;

// In-memory
const users = [];

app.use(express.json());

//Register function
app.post('/register', async (req,res) => {
    try{
        const {email, password} = req.body;
        //Find user
        const findUser = users.find((data) => email == data.email)
        if(findUser) {
            res.status(400).send("Wrong email or password !");
        }
        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({email, password: hashedPassword});
        res.status(201).send("Registered successfully !");
    } catch(error) {
        res.status(500).send({message: error.message});
    }
})

//Login function
app.post('/login', async (req,res) => {
    try{
        const {email, password} = req.body;
        //Find user
        const findUser = users.find((data) => email == data.email)
        if(!findUser) {
            res.status(400).send("Wrong email or password !");
        }
        const passwordMatch = await bcrypt.compare(password, findUser.password);
        if(passwordMatch){
            res.status(200).send("Logged in successfully !");
        }else{
            res.status(400).send("Wrong email or password !");
        }
    } catch (error) {
        res.status(500).send({message: error.message});
    }
})

app.listen(port, () => {
    console.log("Server started on port 3000");
})