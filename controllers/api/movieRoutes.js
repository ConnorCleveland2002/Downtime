const router = require('express').Router();
const { movies } = require('../../models');
const withAuth = require('../../utils/auth');


    router.get('/', (req, res) => {function getApi() {

      var movieUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=1462aa4c';
    
      fetch(movieUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data)
        })
      };

      movies.findAll({})
        .then(movieData => res.json(movieData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });
    
    router.post('/', async (req, res) => {
        try {
          const movieData = await User.create(req.body);
          // 200 status code means the request is successful
          res.status(200).json(movieData);
        } catch (err) {
          // 400 status code means the server could not understand the request
          res.status(400).json(err);
        }
      });
    
    module.exports = router;