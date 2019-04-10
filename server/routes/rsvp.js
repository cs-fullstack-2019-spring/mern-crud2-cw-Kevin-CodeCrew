let express = require('express');
let router = express.Router();
let RSVPCollection = require('../models/RSVPSchema');

/*
    ENDPOINT IMPLEMENTATION OF A SIMPLE RSVP WEB SERVICE
 */
// Return the list of all the current RSVPs
router.get('/', function (req, res, next) {
    console.log(`LIST RSVPS`);
    RSVPCollection.find({}, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    })
});

// Get a specific RSVP
router.get('/:id', function (req, res, next) {
    console.log(`LIST RSVP ${req.params.id}`);
    // FIXME Changed from find() to findOne()
    RSVPCollection.findOne({_id: req.params.id}, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    })

});

// Update an existing RSVP
router.put('/:id', function (req, res, next) {
    console.log(`UPDATE RSVP ${req.body.rsvp_person} ${req.body.rsvp_going}`);
    RSVPCollection.findOneAndUpdate({_id: req.params.id}, req.body, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    });
});

// Delete a specific RSVP -IMPLEMENT YOUR OWN FUNCTION
router.delete('/:id', function (req, res, next) {
    console.log(`DELETE RSVP ${req.params.id}`);
    RSVPCollection.deleteOne({_id: req.params.id}, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    });
});

//Create a new RSVP -IMPLEMENT YOUR OWN FUNCTION
router.post('/', function (req, res, next) {
    console.log(`CREATE NEW RSVP ${req.body.rsvp_person} ${req.body.rsvp_going}`);
    RSVPCollection.create(req.body, (errors, results) => {
        errors ? res.send(errors) : res.send(results);
    })
});

module.exports = router;
