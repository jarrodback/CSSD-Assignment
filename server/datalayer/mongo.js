class DataLayer {
    constructor(model) {
        // Set the collections model to use.
        this.model = model;
    }

    /**
     * Create and save the record to the database.
     */
    async create(recordToCreate) {
        return this.model.create(recordToCreate);
    }

    /**
     * Find a record by property in the database.
     */
    async findByProperty(propertyToFind) {
        return this.model.find(propertyToFind);
    }
}

module.exports = DataLayer;
