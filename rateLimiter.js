const express = require("express");
const app = express();


let numberOfRequestForUser = {};
setInterval(() => {
  numberOfRequestForUser = {};
}, 15000);

function middlewareRateLimiter(req, res, next) {
  const usrId = req.headers["user-id"];

  if (!usrId) {
    return res.status(400).json({ msg: "Missing user-id in headers" });
  }

  if (!numberOfRequestForUser[usrId]) {
    numberOfRequestForUser[usrId] = 1;
  } else {
    numberOfRequestForUser[usrId]++;
  }

  const requestCnt = numberOfRequestForUser[usrId];

  if (requestCnt > 5) {
    return res
      .status(429)
      .json({ msg: "Too many requests. Try again after 15 seconds." });
  }

  next();
}

function middlewareCheckAge(req, res, next) {
  const age = parseInt(req.query.age);

  if (age > 16) {
    next();
  } else {
    res
      .status(403)
      .json({ msg: "You must be older than 16 to go on the ride." });
  }
}

function middlewareCheckTicket(req, res, next) {
  const ticketType = parseInt(req.query.type);
  if (ticketType === 3) {
    next();
  } else {
    res.status(403).json({ msg: "Your ticket is not valid for this ride." });
  }
}

app.use(middlewareRateLimiter,middlewareCheckAge);

// Routes
app.get("/ride1", (req, res) => {
  res.status(200).json({ ride: "You are on ride 1" });
});

app.get("/ride2", (req, res) => {
  res.status(200).json({ ride: "You are on ride 2" });
});

app.get("/ride3", middlewareCheckTicket, (req, res) => {
  res.status(200).json({ ride: "You are on ride 3" });
});

app.listen(3000, () => {
  console.log("🎢 Server running at http://localhost:3000");
});
