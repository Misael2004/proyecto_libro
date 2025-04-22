export const errorResponse = (res, code, message) => {
    res.status(code).send({
        error: true,
        message
    })
}