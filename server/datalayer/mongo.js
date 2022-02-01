class DataLayer {
    constructor(model) {
        // Set the collections model to use.
        this.model = model;
    }

    /**
     * Find all records in the database.
     */
    async findAllAndPopulate(filter, populateFilter) {
        console.log("DATA LAYER")
        return this.model.find(JSON.parse(JSON.stringify(filter)))
          .limit(filter.limit)
          .skip(filter.offset * filter.limit)
          .populate(JSON.parse(JSON.stringify(populateFilter)))
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
        return this.model.findByIdAndUpdate(recordId, recordToUpdate)
          .orFail(new Error("Bill can't be found in the database."))
          .catch(error => {throw new Error(error.message)});

    }
}

module.exports = DataLayer;
