"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const itemsPerPage = 10;
// Assuming items is an array of all items
const allItems = [...]; // fill this in with your actual data
function displayItemsPage(req, res) {
    const currentPage = req.query.page || 1;
    const offset = (currentPage - 1) * itemsPerPage;
    const itemsToDisplay = allItems.slice(offset, offset + itemsPerPage);
    res.render('itemsPage', { items: itemsToDisplay, currentPage });
}
function displayPagination(req, res) {
    const currentPage = req.query.page || 1;
    const totalPages = Math.ceil(allItems.length / itemsPerPage);
    const previousPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    res.render('pagination', { previousPage, nextPage, totalPages, currentPage });
}
// set up your routes
app.get('/items', displayItemsPage);
app.get('/pagination', displayPagination);
