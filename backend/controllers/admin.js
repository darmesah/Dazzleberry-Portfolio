const fs = require("fs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const Admin = require("../models/admin");
const WorkItem = require("../models/workItem");

const adminCheck = async (req) => {
  const isAdmin = await Admin.findOne({
    _id: req.adminId,
    name: req.adminName,
    role: req.role,
  });

  if (!isAdmin) {
    const error = new Error("Not an admin!");
    error.statusCode = 401;
    throw error;
  }
};

exports.login = async (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  try {
    const admin = await Admin.findOne({ name });

    if (!admin) {
      const error = new Error("Invalid login credentials");
      error.statusCode = 404;
      throw error;
    }

    if (admin.password !== password) {
      const error = new Error("Invalid login credentials");
      error.statusCode = 404;
      throw error;
    }

    const token = jwt.sign(
      {
        adminId: admin._id.toString(),
        name: admin.name,
        role: admin.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1 week" }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addWorkItem = async (req, res, next) => {
  try {
    await adminCheck(req);

    const error = validationResult(req);

    if (!error.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const workDesc = req.body.workDesc;
    const imageUrl = req.files.map((img) => img.path);
    // const imageUrl = req.files.map((file) => file.path.replace('\\', '/'));
    const service = req.body.service;
    const description = req.body.description;
    const industry = req.body.industry;

    const workItem = new WorkItem({
      title,
      workDesc,
      imageUrl: imageUrl,
      service: service,
      industry: industry,
      description: description,
    });

    await workItem.save();

    res.status(201).json({
      message: "Work item added successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateWorkItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    await adminCheck(req);

    const error = validationResult(req);

    if (!error.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect.");
      error.statusCode = 422;
      throw error;
    }

    const title = req.body.title;
    const workDesc = req.body.workDesc;
    const description = req.body.description;

    const workItem = await WorkItem.findById(id);

    if (!workItem) {
      const error = new Error("Work item not found");
      error.statusCode = 404;
      throw error;
    }

    workItem.title = title;
    workItem.workDesc = workDesc;
    workItem.description = description;

    await workItem.save();

    res.status(201).json({
      message: "Work item updated successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteWorkItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const workItem = await WorkItem.findById(id);

    if (!workItem) {
      const error = new Error("Work item not found");
      error.statusCode = 404;
      throw error;
    }

    await WorkItem.findByIdAndRemove(workItem._id);

    const imagePaths = workItem.imageUrl;

    imagePaths.map((imagePath) => fs.unlink(imagePath, (err) => {}));

    res.status(200).json({ message: "Deleted Successfully", workItem });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
