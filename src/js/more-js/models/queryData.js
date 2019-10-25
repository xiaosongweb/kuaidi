module.exports = {
    getQueryData({ val }) {
        return $.ajax({
            url: "/fuzzyQuery",
            type: 'GET',
            data: {
                val
            },
        })
    },
    getHistroy({ username }) {
        return $.ajax({
            url: "/history",
            type: 'GET',
            data: {
                username
            },
        })
    },
    getOnOreder({ username,orderId }) {
        return $.ajax({
            url: '/findMeOrder',
            type:'GET',
            data: {
                username,
                orderId
            }
        })
    }
}