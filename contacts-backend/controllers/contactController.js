const asyncHandler = require("express-async-handler");
const Contact = require("./../models/contactModal");
// desc Get all contacts
// route GET /api/contacts
// access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    res.status(400);
    throw new Error("All field are mandatory");
  }
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
});

const getSingleContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("Contact not found");
  }
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  if (!deletedContact) {
    res.status(400);
    throw new Error("Contact not found ");
  }
  res.status(200).json(deletedContact);
});

module.exports = {
  getContact,
  createContact,
  getSingleContact,
  updateContact,
  deleteContact,
};
