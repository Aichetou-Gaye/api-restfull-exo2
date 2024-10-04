import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cors from 'cors'

const app = express();
const port = 3000;

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "trusted-scripts.com"],
    },
  })
);

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)

app.use(cors({
    origin: 'http://localhost:5173'
  }));

app.listen(port, (req, res) => {
  console.log("Connected on", port);
});

app.get("/", (req, res) => {
  res.send('{"message":"Hello world"}');
});
