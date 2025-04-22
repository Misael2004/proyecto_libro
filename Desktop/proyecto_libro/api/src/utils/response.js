export const response = (res, code, data) => {
    res.status(code).send({
        error: false,
        data
    })
}