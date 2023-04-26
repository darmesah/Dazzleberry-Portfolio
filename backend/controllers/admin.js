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
      userId: admin._id,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getWorkItems = async (req, res, next) => {
  const keyword = req.query.keyword;
  const sort = req.query.sort;
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    if (keyword) {
      if (keyword.length < 3) {
        return res.status(200).json({
          message: "No work item with that keyword found",
          workItems: [],
        });
      } else {
        const workItems = await WorkItem.find({
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { workDesc: { $regex: keyword, $options: "i" } },
            { service: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { industry: { $regex: keyword, $options: "i" } },
          ],
        }).select("-imageUrl -description");

        if (workItems.length === 0) {
          return res.status(200).json({
            message: "No work item with that keyword found",
            workItems: [],
          });
        }

        res.status(200).json({
          message: "Searched work items successfully",
          workItems,
          totalWorkItems: workItems.length,
        });
      }
    } else {
      const totalWorkItems = await WorkItem.find().countDocuments();
      const workItems = await WorkItem.find({})
        .sort(sort === "asc" ? { title: 1 } : { createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage)
        .select("title workDesc createdAt");

      if (workItems.length === 0) {
        return res.status(404).json({ message: "No work item found" });
      }

      res.status(200).json({
        message: "Fetched work items successfully",
        workItems,
        totalWorkItems,
      });
    }
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

exports.getServices = async (req, res, next) => {
  try {
    const services = await WorkItem.find().select("-_id service");
    const servicesList = services.map((service) => service.service).flat();
    const allServices = [...new Set(servicesList)].sort();

    let serviceTitleCount = [];

    for (let i = 0; i < allServices.length; i++) {
      const availableService = await WorkItem.find({
        service: allServices[i],
      }).countDocuments();

      const availableServiceCount = {
        title: allServices[i],
        amount: availableService,
      };

      serviceTitleCount.push(availableServiceCount);
    }

    res.status(200).json({
      message: "Fetched services successfully",
      services: serviceTitleCount,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getIndustries = async (req, res, next) => {
  try {
    const industries = await WorkItem.find().select("-_id industry");
    const industriesList = industries
      .map((industry) => industry.industry)
      .flat();
    const allIndustries = [...new Set(industriesList)].sort();

    let industryTitleCount = [];

    for (let i = 0; i < allIndustries.length; i++) {
      const availableIndustry = await WorkItem.find({
        industry: allIndustries[i],
      }).countDocuments();

      const availableIndustryCount = {
        title: allIndustries[i],
        amount: availableIndustry,
      };

      industryTitleCount.push(availableIndustryCount);
    }

    res.status(200).json({
      message: "Fetched industries successfully",
      industries: industryTitleCount,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getService = async (req, res, next) => {
  const service = req.params.service;
  const sort = req.query.sort;

  try {
    const workItems = await WorkItem.find({
      service: { $regex: service, $options: "i" },
    })
      .sort(sort === "asc" ? { title: 1 } : { createdAt: -1 })
      .select("-imageUrl -description");

    if (workItems < 1) {
      const error = new Error("No workitem found");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ message: "Fetched work items successfully", workItems });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getIndustry = async (req, res, next) => {
  const industry = req.params.industry;
  const sort = req.query.sort;

  try {
    const workItems = await WorkItem.find({
      industry: { $regex: industry, $options: "i" },
    })
      .sort(sort === "asc" ? { title: 1 } : { createdAt: -1 })
      .select("-imageUrl -description");

    if (workItems < 1) {
      const error = new Error("No workitem found");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ message: "Fetched work items successfully", workItems });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getInfo = async (req, res, next) => {
  const id = req.params.userId;

  try {
    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      const error = new Error("Not an admin");
      error.statusCode = 401;
      throw error;
    }

    res.status(201).json({ message: "User Information", admin });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateInfo = async (req, res, next) => {
  const id = req.params.userId;

  const name = req.body.name;
  const work_email = req.body.work_email;
  const personal_email = req.body.personal_email;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      const error = new Error("Not an admin");
      error.statusCode = 401;
      throw error;
    }

    admin.name = name;
    admin.work_email = work_email;
    admin.personal_email = personal_email;

    await admin.save();

    res.status(201).json({ message: "Information Updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updatePassword = async (req, res, next) => {
  const id = req.params.userId;

  const password = req.body.password;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      const error = new Error("Not an admin");
      error.statusCode = 401;
      throw error;
    }

    admin.password = password;

    await admin.save();

    res.status(201).json({ message: "Password Updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
