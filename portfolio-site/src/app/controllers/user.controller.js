const User = require('../models/user.model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.create = async (req, res) => {
    try {
        // Get user input
        const { firstName, lastName, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && firstName && lastName)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          firstName,
          lastName,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }        
}

exports.find = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        });
}

exports.login = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
}

exports.findById = (req, res) => {
    User.findById(req.params.userID)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found. UserID: " + req.params.userID
                });
            }

            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found. UserID: " + req.params.userID
                });
            }

            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        })
}

exports.update = async (req, res) => {
    // Validate Request
    const { firstName, lastName, email, password } = req.body;
    
    // Validate user input
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    User.findByIdAndUpdate(req.params.userID, {
        firstName,
        lastName,
        email: email,
        password: encryptedPassword
    }, {new: true})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found. UserID: " + req.params.userID
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found. UserID: " + req.params.userID
                });
            }

            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        });
}

exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userID)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found. UserID: " + req.params.userID
                    });
                }
                res.send({
                    message: "User Removed"
                });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found. UserID: " + req.params.userID
                    });
                }
    
                res.status(500).send({
                    'message': 'Server Error',
                    'error': err
                });
            })
}
