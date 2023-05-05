const express = require('express');

// app use express
const app = express();

// i dont fully know what the process.env does, but as far as i can tell, it checks if the port is available, and if not, it uses 3001
const PORT = process.env.PORT || 3001;


// uses the public folder
app.use(express.static('public'));

// uses the middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//uses the routes from the routes folder
require('./routes/notes.js')(app);
require('./routes/default.js')(app);


// listens for the port
app.listen(PORT, () => {
  console.log(`Server available at http://localhost:${PORT}`);
});


