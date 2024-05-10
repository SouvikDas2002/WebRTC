import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useWebRtc } from '../../Hooks/useWebRtc';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom } from '../../http';

import styles from './Room.module.css';

const Room = () => {
    const user = useSelector((state) => state.auth.user);
    const { id: roomId } = useParams();
    const [room, setRoom] = useState(null);

    const { clients, provideRef, handleMute } = useWebRtc(roomId, user);

    const navigate = useNavigate();

    const [isMute, setMuted] = useState(true);

    useEffect(() => {
        const fetchRoom = async () => {
            const { data } = await getRoom(roomId);
            setRoom((prev) => data);
        };

        fetchRoom();
    }, [roomId]);

    useEffect(() => {
      handleMute(isMute, user.id);
    }, [isMute]);

    const handManualLeave = () => {
        navigate('/rooms');
    };

    const handleMuteClick = (clientId) => {
        if (clientId !== user.id) {
            return;
        }
        setMuted((prev) => !prev);
    };

    return (
        <div>
            <div className="container">
                <button onClick={handManualLeave} className={styles.goBack}>
                    <span>All voice rooms</span>
                </button>
            </div>
            <div className={styles.clientsWrap}>
                <div className={styles.header}>
                    {room && <h2 className={styles.topic}>{room?.topic}</h2>}
                    <div className={styles.actions}>
                        <button className={styles.actionBtn}>
                            <span>🤚</span>
                        </button>
                        <button
                            onClick={handManualLeave}
                            className={styles.actionBtn}
                        >
                            <span style={{color:'red',letterSpacing:'1px'}}>Leave quietly</span>
                        </button>
                    </div>
                </div>
                <div className={styles.clientsList}>
                    {clients.map((client) => {
                        return (
                            <div className={styles.client} key={client.id}>
                                <div className={styles.userHead}>
                                    <img
                                        className={styles.userAvatar}
                                        src={client.avatar}
                                        alt=""
                                    />
                                    <audio
                                        autoPlay
                                        ref={(instance) => {
                                            provideRef(instance, client.id);
                                        }}
                                    />
                                    <button
                                        onClick={() =>
                                            handleMuteClick(client.id)
                                        }
                                        className={styles.micBtn}
                                    >
                                        {client.muted ? (
                                          <span className={styles.mic}>🎙️</span>
                                        ) : (
                                          <span className={styles.mic}>🔇</span>
                                        )}
                                    </button>
                                </div>
                                <h4>{client.name}</h4>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Room;