const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getGuestsDb = async function(req) {
    const pool = await poolPromise;
    let result;
    let strsql = 'SELECT * FROM dbo.Guests';
    strsql += ' ORDER BY GuestName';
    try {
        result = await pool
            .request()
            .query(strsql);
    } catch (e) {
        throwError(e.message);
    }
    return result.recordset;
};

getGuests = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, guests;
    [err, guests] = await executeOrThrow(getGuestsDb(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, guests, 200)
};
module.exports.getGuests = getGuests;