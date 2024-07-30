const express = require("express");
const itemsRoutes = require("./itemRoutes")
const app = express();

app.use(express.json());
app.use('/items', itemsRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });
  
  module.exports = app;