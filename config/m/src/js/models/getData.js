module.exports = {
    get({ pageNo = 1, pageSize = 15 }) {
        return $.ajax({
            url: "/lg",
            data: {
                pageNo:pageNo,
                pageSize:pageSize
            },
        })
    }
}