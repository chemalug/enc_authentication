const School = require("../models/enc_school");

const schoolCtrl = {};

schoolCtrl.findAll = (req, res, next) => {
  console.log(req.headers);

  School.find()
    .then((schools) => {
      res.send(schools);
    })
    .catch((err) => res.status(500).json(err));
};

schoolCtrl.findById = (req, res, next) => {
  School.findById(req.params.id)
    .then((school) => {
      if (!school) {
        return res.status(400).json({
          messaje: "School not found with id " + req.params.id,
        });
      } else {
        res.status(400).send(school);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "School not found with id " + req.params.id,
      });
    });
};

schoolCtrl.create = (req, res, next) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({ messaje: "Content can not be empty" });
  }
  /**
   * ! Verificar email correcto
   * ! Verificar # telefono sea numerico
   * ! Verificar la existencia del email antes de insertarlo
   */
  const school = new School();
  school.name = req.body.name;
  school.email = req.body.email;
  school.telephone = req.body.telephone;
  school.website = req.body.website;
  school
    .save()
    .then((school) => res.status(400).json(school))
    .catch((err) => res.status(500).json(err));
};

schoolCtrl.update = async (req, res, next) => {};

schoolCtrl.delete = async (req, res, next) => {};

module.exports = schoolCtrl;
