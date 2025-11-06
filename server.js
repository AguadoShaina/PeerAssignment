const express = require("express");
const session = require("express-session");

const { public_users } = require("./general.js");
const regd_users = require("./auth_users.js");

const app = express();
app.use(express.json());
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

app.use("/customer", public_users);
app.use("/customer/auth", regd_users);

app.listen(5000, () => console.log("✅ Server running on port 5000"));
