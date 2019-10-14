let routes = [
    { path: '/', redirect: '/home', name: "home" },
    {
        path: '/home', children: [
            { path: 'price' },
            { path: 'all' },
            { path: 'network' },
            { path: 'global' },
            { path: 'downapp' },
            { path: 'orderimport' },
        ],
        name: "home"
    },
    { path: '/courier', name: "courier" },
    { path: '/more', name: "more" },
    { path: '/center', name: 'center' },
]
export default routes