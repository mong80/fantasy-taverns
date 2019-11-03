const sql = require('mssql');
const { poolPromise } = require('../data/db');

//#region Taverns
const getTavernsDb = async function(tavernId) {
    const pool = await poolPromise;
    let result;
    let strsql = 'SELECT * FROM dbo.Taverns';
    let filter = [];
    if (tavernId != undefined) {
        filter.push('ID = @ID');
    }
    if (filter.length > 0) {
        strsql += '  WHERE ' + filter.join(' AND ');
    }
    strsql += ' ORDER BY TavernName';
    try {
        result = await pool
            .request()
            .input('ID', sql.Int, tavernId)
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
    return returnSuccessResponse(res, taverns, 200)
};
module.exports.getTaverns = getTaverns;

getTavern = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, tavern;
    [err, tavern] = await executeOrThrow(getTavernsDb(req.user.TavernID));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, tavern, 200)
};
module.exports.getTavern = getTavern;
//#endregion

//#region Rooms
const getRoomsDb = async function(req) {
    const pool = await poolPromise;
    let result;
    let strsql = 'SELECT * FROM dbo.Rooms';
    let filter = [];
    filter.push('TavernID = @TavernID')
    let roomId = 0;
    let name = '';
    if (req.params.id != undefined) {
        roomId = req.params.id;
        filter.push('ID = @ID')
    }
    if (req.query.Name != undefined && req.query.Name != '') {
        name = req.query.Name;
        filter.push(`RoomName LIKE '%' + @Name + '%'`)
    }
    strsql += ' WHERE ' + filter.join(' AND ');
    if (req.query.OrderBy == 'DailyRate') {
        strsql += ' ORDER BY DailyRate DESC, RoomName';
    } else {
        strsql += ' ORDER BY RoomName';
    }
    try {
        result = await pool
            .request()
            .input('TavernID', sql.Int, req.user.TavernID)
            .input('ID', sql.Int, roomId)
            .input('Name', sql.NVarChar, name)
            .query(strsql);
    } catch (e) {
        throwError(e.message);
    }
    if (roomId == 0) {
        return result.recordset;
    } else {
        return result.recordset[0];
    }    
};

getRooms = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, rooms;
    [err, rooms] = await executeOrThrow(getRoomsDb(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, rooms, 200)
};
module.exports.getRooms = getRooms;

getRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, room;
    [err, room] = await executeOrThrow(getRoomsDb(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, room, 200)
};
module.exports.getRoom = getRoom;

const saveRoomDb = async function(req) {
    const pool = await poolPromise;
    let result;
    let strsql = '';
    if (req.body.ID == 0) {
        strsql = 'INSERT INTO dbo.Rooms (RoomName, RoomStatus, TavernID, DailyRate)'
        strsql += ' VALUES (@RoomName, 1, @TavernID, @DailyRate); SELECT SCOPE_IDENTITY() AS ID;'
    } else {
        strsql = 'UPDATE dbo.Rooms SET RoomName = @RoomName, DailyRate = @DailyRate'
        strsql += ' WHERE ID = @ID; SELECT @ID AS ID;'
    }
    try {
        result = await pool
            .request()
            .input('RoomName', sql.NVarChar, req.body.RoomName)
            .input('TavernID', sql.Int, req.user.TavernID)
            .input('DailyRate', sql.NVarChar, req.body.DailyRate)
            .input('ID', sql.Int, req.body.ID)
            .query(strsql);
    } catch (e) {
        throwError(e.message);
    }
    return {id: result.recordset[0].ID};
}

saveRoom = async function(req, res) {
    res.setHeader('ContentType', 'application/json');
    let err, id;
    [err, id] = await executeOrThrow(saveRoomDb(req));
    if (err) {
        return returnError(res, err, 422);
    }
    return returnSuccessResponse(res, id, 201);
}
module.exports.saveRoom = saveRoom;
//#endregion

//#region RoomStays
//#endregion