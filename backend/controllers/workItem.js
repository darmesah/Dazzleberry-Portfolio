const WorkItem = require("../models/workItem");

exports.getWorkItems = async (req, res, next) => {
  const keyword = req.query.keyword;
  const sort = req.query.sort;
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    if (keyword) {
      console.log(keyword);

      const workItems = await WorkItem.find({
        $or: [
          { title: { $regex: keyword, $options: "i" } },
          { workDesc: { $regex: keyword, $options: "i" } },
          { service: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { industry: { $regex: keyword, $options: "i" } },
        ],
      });

      if (workItems.length === 0) {
        return res
          .status(404)
          .json({ message: "No work item with that keyword found" });
      }

      res
        .status(200)
        .json({ message: "Searched work items successfully", workItems });
    } else {
      const totalWorkItems = await WorkItem.find().countDocuments();
      const workItems = await WorkItem.find({})
        .sort(sort === "asc" ? { title: 1 } : "")
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      if (workItems.length === 0) {
        return res.status(404).json({ message: "No work item found" });
      }

      setTimeout(() => {
        return res.status(200).json({
          message: "Fetched work items successfully",
          workItems,
          totalWorkItems,
        });
      }, 2000);
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getWorkItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const workItem = await WorkItem.findById(id);

    if (!workItem) {
      const error = new Error("Could not find work item.");
      error.statusCode = 404;
      throw error;
    }

    const allWorkItem = await WorkItem.find().select("-imageUrl -description");
    const workItemId = allWorkItem.findIndex((item) => item.id == workItem.id);
    const nextWorkItemId =
      allWorkItem.length - 1 === workItemId ? 0 : workItemId + 1;
    const nextWorkItem = allWorkItem[nextWorkItemId];

    res.status(200).json({
      message: "Fetched work item successfully",
      workItem,
      nextWorkItem,
    });
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
    console.log(services);
    const servicesList = services.map((service) => service.service).flat();
    const allServices = [...new Set(servicesList)].sort();

    let imgServices = [];

    for (let i = 0; i < allServices.length; i++) {
      const availableService = await WorkItem.find({
        service: allServices[i],
      });
      const gottenService = availableService.map(
        (gottenServiceImg) => gottenServiceImg.imageUrl[0]
      );
      const availableServiceImg = {
        title: allServices[i],
        image:
          gottenService[Math.floor(Math.random() * availableService.length)],
      };

      imgServices.push(availableServiceImg);
    }

    res.status(200).json({
      message: "Fetched services successfully",
      services: imgServices,
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

    let imgIndustries = [];

    for (let i = 0; i < allIndustries.length; i++) {
      const availableIndustry = await WorkItem.find({
        industry: allIndustries[i],
      });
      const gottenIndustry = availableIndustry.map(
        (gottenIndustryImg) => gottenIndustryImg.imageUrl[0]
      );
      const availableIndustryImg = {
        title: allIndustries[i],
        image:
          gottenIndustry[Math.floor(Math.random() * availableIndustry.length)],
      };

      imgIndustries.push(availableIndustryImg);
    }

    res.status(200).json({
      message: "Fetched industries successfully",
      industries: imgIndustries,
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

  try {
    const workItems = await WorkItem.find({
      service: { $regex: service, $options: "i" },
    });

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

  try {
    const workItems = await WorkItem.find({
      industry: { $regex: industry, $options: "i" },
    });

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
