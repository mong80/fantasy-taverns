const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getTavernsDb = async function(req) {
    const pool = await poolPromise;
    let result;
    try {
        result = await pool
            .request()
            .query('SELECT * FROM dbo.Taverns ORDER BY TavernName');
    } catch (e) {
        throwError(e.message);
    }
    return result.recordset;
};

getTaverns = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, taverns;
    [err, taverns] = await executeOrThrow(getTavernsDb(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, taverns, 201)
};
module.exports.getTaverns = getTaverns;

const getRoomsDb = async function(req) {
    const pool = await poolPromise;
    let result;
    try {
        result = await pool
            .request()
            .input('TavernId', sql.Int, req.user.TavernID)
            .query('SELECT * FROM dbo.Rooms WHERE TavernID = @TavernId ORDER BY RoomName');
    } catch (e) {
        throwError(e.message);
    }
    return result.recordset;
};

getRooms = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, rooms;
    [err, rooms] = await executeOrThrow(getRoomsDb(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, rooms, 201)
};
module.exports.getRooms = getRooms;