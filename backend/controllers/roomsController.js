const RoomDto = require("../dtos/room.dto");
const roomService = require("../services/room-service");

class RoomsController{
    async create(req,res){
        //logic for room creation
        const {topic,roomType}=req.body;
        if(!topic||!roomType) return res.status(400).json({message: "Missing fields"});

        const room=await roomService.create({topic,roomType,ownerId:req.user._id});

        // return res.json(room);
        return res.json(new RoomDto(room));
    }
    async index(req,res){
        const rooms=await roomService.getAllRooms(['Open to everyone 🪄']);
        const allRooms=rooms.map(room =>new RoomDto(room));
        res.json(allRooms);
    }
    async show(req,res){
        const room=await roomService.getRoom(req.params.roomId);
        return res.json(room);
    }
}
module.exports = new RoomsController();