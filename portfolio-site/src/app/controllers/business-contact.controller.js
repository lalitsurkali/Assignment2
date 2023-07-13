const BusinessContact = require('../models/business-contact.model')

exports.create = (req, res) => {
    // Validate Request
    if (!req.body.contactName || !req.body.contactNumber || !req.body.emailAddress) {
        return res.status(400).send({
            message: "Please fill all the details."
        });
    }

    const businessContact = new BusinessContact({
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        emailAddress: req.body.emailAddress,
    });

    businessContact.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                'message': 'Server Error',
                'error': err
            })
        });
}

exports.find = (req, res) => {
    BusinessContact.find()
        .then(businessContacts => {
            res.send(businessContacts);
        }).catch(err => {
            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        });
}

exports.findById = (req, res) => {
    BusinessContact.findById(req.params.businessContactID)
        .then(businessContact => {
            if (!businessContact) {
                return res.status(404).send({
                    message: "Business Contact not found. BusinessContactID: " + req.params.businessContactID
                });
            }

            res.send(businessContact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Business Contact not found. BusinessContactID: " + req.params.businessContactID
                });
            }

            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        })
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.contactName || !req.body.contactNumber || !req.body.emailAddress) {
        return res.status(400).send({
            message: "Please fill all the details."
        });
    }

    BusinessContact.findByIdAndUpdate(req.params.businessContactID, {
        contactName: req.body.contactName,
        contactNumber: req.body.contactNumber,
        businessContactType: req.body.businessContactType
    }, {new: true})
        .then(businessContact => {
            if (!businessContact) {
                return res.status(404).send({
                    message: "Business Contact not found. BusinessContactID: " + req.params.businessContactID
                });
            }
            res.send(businessContact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Business Contact not found. BusinessContactID: " + req.params.businessContactID
                });
            }

            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        });
}

exports.delete = (req, res) => {
    BusinessContact.findByIdAndRemove(req.params.businessContactID)
            .then(businessContact => {
                if (!businessContact) {
                    return res.status(404).send({
                        message: "Business Contact not found. BusinessContactID: " + req.params.businessContactID
                    });
                }
                res.send({
                    message: "Business Contact Removed"
                });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Business Contact not found. BusinessContactID: " + req.params.businessContactID
                    });
                }
    
                res.status(500).send({
                    'message': 'Server Error',
                    'error': err
                });
            })
}