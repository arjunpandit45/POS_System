require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const config  = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const createHttpError = require("http-errors");
const router = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const tableRouter = require("./routes/tableRoute");
const paymentRouter = require("./routes/paymentRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.set('trust proxy', 1);
const PORT = config.port 

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// app.use(cors({
//     origin : [
//         "https://pos-system-frontend-ne5v.onrender.com",
//         "http://localhost:5173"
//     ],
//     credentials: true
// }));
// app.use(cors({
//     origin: 'https://pos-system-frontend-ne5v.onrender.com', // MUST MATCH EXACTLY
//     credentials: true,
// }));

app.use(cors({
    origin: "https://pos-system-frontend-ne5v.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(cookieParser());

app.get("/" , (req , res) => {
    res.json({message: "Hello from the POS Server!"})
})

// Authentication Routes like Login And Registration -->
app.use("/api/user" , router);
app.use("/api/order" , orderRouter);
app.use("/api/table" , tableRouter)
app.use("/api/payment" , paymentRouter);

// Global Error Handler put only on in the last 
app.use(globalErrorHandler);

connectDB().then(
app.listen(PORT , () => {
    console.log(`POS Server is running on Port ${PORT}`);
}))