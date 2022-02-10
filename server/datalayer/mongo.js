class DataLayer {
    constructor(model) {
        // Set the collections model to use.
        this.model = model;
    }

    /**
     * Find all records in the database.
     */
    async findAllAndPopulate(filter, populateFilter) {
        return this.model
            .find(JSON.parse(JSON.stringify(filter)))
            .limit(filter.limit)
            .skip(filter.offset * filter.limit)
            .populate(JSON.parse(JSON.stringify(populateFilter)))
            .then((bills) => {
                return this.model.countDocuments().then((count) => {
                    return { bills: bills, count: count };
                });
            });
    }
    /**
     * Find all users in the database.
     */
    async findAll(filter) {
        return this.model
            .find(JSON.parse(JSON.stringify(filter)))
            .limit(filter.limit)
            .skip(filter.offset * filter.limit)
            .then((users) => {
                return this.model.countDocuments().then((count) => {
                    return { users: users, count: count };
                });
            });
    }

    /**
     * Find all records in the database.
     */
    async findByPropertyAndPopulate(id, populateFilter) {
        return this.model
            .findById(id)
            .orFail(new Error("Record can't be found in the database."))
            .populate(JSON.parse(JSON.stringify(populateFilter)));
    }

    /**
     * Find a record by property in the database.
     */
    async findByProperty(propertyToFind) {
        return this.model.find(propertyToFind);
    }

    /**
     * Create and save the record to the database.
     */
    async create(recordToCreate) {
        return this.model.create(recordToCreate);
    }

    /**
     *  Update and save the record to the database.
     */
    async update(recordId, recordToUpdate) {
        return this.model
            .findByIdAndUpdate(recordId, recordToUpdate)
            .orFail(new Error("Bill can't be found in the database."))
            .catch((error) => {
                throw new Error(error.message);
            });
    }
}

module.exports = DataLayer;
