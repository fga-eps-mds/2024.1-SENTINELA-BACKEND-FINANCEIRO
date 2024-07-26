const SupplierForm = require("../Models/supplierFormSchema");
const util = require("../Util/utils");

const createSupplierForm = async (req, res) => {
  try {
    message = util.validator(req.body.supplierData);

    if (message){
      return res.status(404).send({erro:message})
    }

    const supplier = new SupplierForm(req.body.supplierData);

    await supplier.save();
    return res.status(201).send(supplier);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getSupplierForm = async (req, res) => {
  try {
    const supplier = await SupplierForm.find({});
    return res.status(200).send(supplier);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const getSupplierFormById = async (req, res) => {
  try {
    const supplier = await SupplierForm.findById(req.params.id);
    return res.status(200).send(supplier);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const deleteSupplierFormById = async (req, res) => {
  try {
    const deletedSupplier = await SupplierForm.findByIdAndDelete(req.params.id);
    return res.status(200).send(deletedSupplier);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const updateSupplierFormById = async (req, res) => {
  try {
    const updatedSupplier = await SupplierForm.findById(req.params.id);
    if (!updatedSupplier) {
      return res.status(404).send();
    }
    Object.assign(updatedSupplier, req.body.supplierData);
    updatedSupplier.updatedAt = new Date();
    await updatedSupplier.save();
    return res.status(200).send(updatedSupplier);
  } catch (error) {
    return res.status(400).send(error);
  }
};

module.exports = {
  createSupplierForm,
  getSupplierForm,
  getSupplierFormById,
  deleteSupplierFormById,
  updateSupplierFormById,
};
