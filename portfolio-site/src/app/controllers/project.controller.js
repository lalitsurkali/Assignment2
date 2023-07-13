const Project = require('../models/project.model')

exports.create = (req, res) => {
    // Validate Request
    if (!req.body.title || !req.body.projectType) {
        return res.status(400).send({
            message: "Please fill all the details."
        });
    }

    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
        projectType: req.body.projectType
    });

    project.save()
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
    Project.find()
        .then(projects => {
            res.send(projects);
        }).catch(err => {
            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        });
}

exports.findById = (req, res) => {
    Project.findById(req.params.projectID)
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "Project not found. ProjectID: " + req.params.projectID
                });
            }

            res.send(project);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Project not found. ProjectID: " + req.params.projectID
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
    if (!req.body.title || !req.body.projectType) {
        return res.status(400).send({
            message: "Please fill all the details."
        });
    }

    Project.findByIdAndUpdate(req.params.projectID, {
        title: req.body.title,
        description: req.body.description,
        projectType: req.body.projectType
    }, {new: true})
        .then(project => {
            if (!project) {
                return res.status(404).send({
                    message: "Project not found. ProjectID: " + req.params.projectID
                });
            }
            res.send(project);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Project not found. ProjectID: " + req.params.projectID
                });
            }

            res.status(500).send({
                'message': 'Server Error',
                'error': err
            });
        });
}

exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.projectID)
            .then(project => {
                if (!project) {
                    return res.status(404).send({
                        message: "Project not found. ProjectID: " + req.params.projectID
                    });
                }
                res.send({
                    message: "Project Removed"
                });
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Project not found. ProjectID: " + req.params.projectID
                    });
                }
    
                res.status(500).send({
                    'message': 'Server Error',
                    'error': err
                });
            })
}