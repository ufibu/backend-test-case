const express = require('express');


const router = express.Router();

const defaultRoutes = [
    {
        path: '/book',
        route: require('./book.route')
    },
    {
        path: '/user',
        route: require('./user.route')
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;