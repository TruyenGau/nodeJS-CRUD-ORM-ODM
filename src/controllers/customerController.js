const { createCustomer, createArrayCustomer, getAllCustomersService, updateCustomerService, deleteACustomerService, deleteArrayCustomerService } = require("../services/customerService");
const { uploadSingleFile } = require("../services/fileServie");
const aqp = require('api-query-params');

module.exports = {
    postCreateCustomer: async (req, res) => {
        let { name, address, phone, email, description } = req.body;
        let imageUrl = "";
        if (!req.files || Object.keys(req.files).length === 0) {
            // nguooi dung khong  upload file, khong lam gi
        }
        else {
            let result = await uploadSingleFile(req.files.image);
            imageUrl = result.path;
            console.log("imageUrl: ", imageUrl);

        }
        let customerData = {
            name: name,
            address: address,
            phone: phone,
            email: email,
            description: description,
            imageUrl: imageUrl
        }
        let customer = await createCustomer(customerData)
        return res.status(200).json({
            EC: 0,
            data: customer
        });
    },

    postCreateArrayCustomer: async (req, res) => {
        console.log("array customer: ", req.body.customers)
        let customers = await createArrayCustomer(req.body.customers);
        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: customers
            })
        }
    },

    getAllCustomers: async (req, res) => {
        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;
        let customers = null
        if (limit && page) {
            customers = await getAllCustomersService(limit, page, req.query);
        } else {
            customers = await getAllCustomersService();
        }

        if (customers) {
            return res.status(200).json({
                EC: 0,
                data: customers
            })
        } else {
            return res.status(200).json({
                EC: -1,
                data: customers
            })
        }
    },
    putUpdateCustomer: async (req, res) => {
        let { name, email, address, customerId } = req.body;
        let customerDataUpdate = {
            name,
            email,
            address,
            customerId
        };

        let customer = await updateCustomerService(customerDataUpdate);
        return res.status(200).json({
            EC: 0,
            data: customer
        })

    },

    deleteACustomer: async (req, res) => {
        let id = req.body.id;
        let result = await deleteACustomerService(id);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },

    deleteManyCustomer: async (req, res) => {
        let ids = req.body.customersID;
        let result = await deleteArrayCustomerService(ids);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    }
}