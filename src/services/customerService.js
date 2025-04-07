const Customer = require('../models/customer');
const aqp = require('api-query-params');

const createCustomer = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            address: customerData.address,
            email: customerData.email,
            image: customerData.imageUrl,
            description: customerData.description,
            phone: customerData.phone
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createArrayCustomer = async (arrayCustomer) => {
    try {
        let result = await Customer.insertMany(arrayCustomer);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const getAllCustomersService = async (limit, page, queryString) => {
    try {
        let results = null;
        if (limit && page) {
            let offset = (page - 1) * limit;
            const { filter, skip, } = aqp(queryString);
            delete filter.page;
            console.log('check filter: ', filter);
            results = await Customer.find(filter).skip(offset).limit(limit).exec();
        } else {
            results = await Customer.find({});
        }

        return results;
    } catch (error) {
        console.log(error);
    }
}

const updateCustomerService = async (customerDataUpdate) => {
    try {
        let results = await Customer.updateOne({ _id: customerDataUpdate.customerId },
            { name: customerDataUpdate.name, email: customerDataUpdate.email, address: customerDataUpdate.address });
        return results;
    } catch (error) {
        console.log(error);
    }
}

const deleteACustomerService = async (customerId) => {
    try {
        let results = await Customer.deleteById(customerId);
        return results;
    } catch (error) {
        console.log(error);
    }
}

const deleteArrayCustomerService = async (ids) => {
    try {
        let results = await Customer.delete({ _id: { $in: ids } });
        return results;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createCustomer,
    createArrayCustomer,
    getAllCustomersService,
    updateCustomerService,
    deleteACustomerService,
    deleteArrayCustomerService
}