const sql = require('mssql');
const { poolPromise } = require('../data/db');

const getTavernsDb = async function(tavernId) {
    const pool = await poolPromise;
    let result;
    let strsql = 'SELECT * FROM dbo.Taverns';
    if (tavernId != undefined) {
        strsql += '  WHERE ID = @TavernID';
    }
    strsql += ' ORDER BY TavernName';
    try {
        result = await pool
            .request()
            .input('TavernId', sql.Int, tavernId)
            .query(strsql);
    } catch (e) {
        throwError(e.message);
    }
    if (tavernId != undefined) {
        return result.recordset[0];
    } else {
        return result.recordset;
    }
};

getTaverns = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, taverns;
    [err, taverns] = await executeOrThrow(getTavernsDb());
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, taverns, 201)
};
module.exports.getTaverns = getTaverns;

getTavern = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, tavern;
    [err, tavern] = await executeOrThrow(getTavernsDb(req.user.TavernID));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, tavern, 201)
};
module.exports.getTavern = getTavern;

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