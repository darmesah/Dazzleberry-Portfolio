const WorkItem = require('../models/workItem');

exports.getWorkItems = async (req, res, next) => {
  const keyword = req.query.keyword;
  const currentPage = req.query.page || 1;
  const perPage = 2;

  try {
    if (keyword) {
      console.log(keyword);

      const workItems = await WorkItem.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } },
          { workDesc: { $regex: keyword, $options: 'i' } },
          { service: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
          { industry: { $regex: keyword, $options: 'i' } },
        ],
      });

      if (workItems.length === 0) {
        return res
          .status(404)
          .json({ message: 'No work item with that keyword found' });
      }

      res
        .status(200)
        .json({ message: 'Searched work items successfully', workItems });
    } else {
      const totalWorkItems = await WorkItem.find().countDocuments();
      const workItems = await WorkItem.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);

      if (workItems.length === 0) {
        return res.status(404).json({ message: 'No work item found' });
      }

      res
        .status(200)
        .json({
          message: 'Fetched work items successfully',
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

exports.getWorkItem = async (req, res, next) => {
  const id = req.params.id;

  try {
    const workItem = await WorkItem.findById(id);

    if (!workItem) {
      const error = new Error('Could not find work item.');
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ message: 'Fetched work item successfully', workItem });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
