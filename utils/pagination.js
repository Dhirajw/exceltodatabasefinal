exports.paginateAndSort = async (model, page, size, sort, query) => {
    const limit = size ? +size : 10;
    const offset = page ? (page - 1) * limit : 0;
    const order = sort ? [[sort.split(":")[0], sort.split(":")[1]]] : [["createdAt", "DESC"]];
  
    const { count, rows } = await model.findAndCountAll({ ...query, limit, offset, order });
    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page ? +page : 1,
      data: rows,
    };
  };