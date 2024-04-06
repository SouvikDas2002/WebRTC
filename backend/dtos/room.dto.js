class RoomDto{
    id;
    topic;
    roomType;
    speakers;
    ownerId;
    createdAt;

    constructor(room){
        this.id = room.id;
        this.topic = room.topic;
        this.roomType = room.roomType;
        this.ownerId=room.ownerId;
        this.speakers=room.speakers;
        this.createdAt=this.createdAt;
    }
}
module.exports=RoomDto;