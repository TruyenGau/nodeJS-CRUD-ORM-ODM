const { default: mongoose, model } = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const customerScheme = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: String,
        phone: String,
        email: String,
        image: String,
        description: String
    },
    {
        timestamps: true, // created_at, update_at,
        // statics: {
        //     findByvantruyen(name) {
        //         return this.find({ name: new RegExp(name, 'i') });
        //     }
        // }
    });
customerScheme.plugin(mongoose_delete, { overrideMethods: 'all' });
const Customer = mongoose.model('customer', customerScheme);
module.exports = Customer;

