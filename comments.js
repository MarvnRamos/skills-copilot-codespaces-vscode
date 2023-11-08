
// Create web server
const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const comments = require('./routes/comments');
app.use('/comments', comments);

// Start server
app.listen(3000, () => console.log('Server is listening on port 3000...'));
```
routes/comments.js:
```
// Path: routes/comments.js

const express = require('express');
const router = express.Router();

const comments = [
  { id: 1, name: 'John Doe', comment: 'Hello, World!' },
  { id: 2, name: 'Jane Doe', comment: 'Hi, there!' },
];

router.get('/', (req, res) => {
  res.send(comments);
});

router.get('/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).send('The comment with the given ID was not found.');
  res.send(comment);
});

router.post('/', (req, res) => {
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    comment: req.body.comment
  };
  comments.push(comment);
  res.send(comment);
});

module.exports = router;
// ```
// Now, if you run the server and send a GET request to `http://localhost:3000/comments`, you will get the following result:
// ```
// [
//   {
//     "id": 1,
//     "name": "John Doe",
//     "comment": "Hello, World!"
//   },
//   {
//     "id": 2,
//     "name": "Jane Doe",
//     "comment": "Hi, there!"
//   }
// ]
// ```
// If you send a POST request to `http://localhost:3000/comments` with the following JSON data:
// ```
// {
//   "name": "John Smith",
//   "comment": "Nice to meet you!"
// }
// ```
// You will get the following result:
// ```
// {
//   "id": 3,
//   "name": "John Smith",
//   "comment": "Nice to meet you!"
// }
// ```
// And if you send a GET request to `http://localhost:3000/comments/3`, you will get the following result:
// ```
// {
//   "id": 3,
//   "name": "John Smith",
