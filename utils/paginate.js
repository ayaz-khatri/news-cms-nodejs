const paginate = async (model, query = {}, reqQuery = {}, options = {}) => { 
    const { page = 1, limit = 3, sort = '-timestamps' } = reqQuery;
    const skip = (page - 1) * limit;

    const paginationOptions = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort,
        ...options
    };

    try{
        const results = await model.paginate(query, paginationOptions);
        return {
            data: results.docs,
            totalDocs: results.totalDocs,
            totalPages: results.totalPages,
            page: results.page,
            limit: results.limit,  
            counter: results.pagingCounter,
            hasPrevPage: results.hasPrevPage,
            hasNextPage: results.hasNextPage,
            prevPage: results.prevPage,
            nextPage: results.nextPage,
            lastPage: results.lastPage 
        }
    } catch (error) {
        console.log(error);
    }
};

export default paginate;