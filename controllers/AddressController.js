import AddressService from '../services/AddressService.js';
const addressService = new AddressService();

const createAddress = async (req, res) => {
    try {
        const address = await addressService.createAddress({
            ...req.body,
            userId: req.user._id
        });
        res.status(201).json(address);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getAddresses = async (req, res) => {
    try {
        const addresses = await addressService.getAddressesByUser(req.user._id);
        res.status(200).json(addresses);
    } catch (err) {
        res.status(400).json(err);
    }
};

const getAddress = async (req, res) => {
    try {
        const address = await addressService.getAddressById(
            req.params.id,
            req.user._id
        );
        res.status(200).json(address);
    } catch (err) {
        res.status(400).json(err);
    }
};

const updateAddress = async (req, res) => {
    try {
        const address = await addressService.updateAddress(
            req.params.id,
            req.body,
            req.user._id
        );
        res.status(201).json(address);
    } catch (err) {
        res.status(400).json(err);
    }
};

const deleteAddress = async (req, res) => {
    try {
        const result = await addressService.deleteAddress(
            req.params.id,
            req.user._id
        );
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json(err);
    }
};

export {
    createAddress,
    getAddresses,
    getAddress,
    updateAddress,
    deleteAddress
};