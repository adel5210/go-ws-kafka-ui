import React from "react";
import socketIOClient from 'socket.io-client';

const WebSocketComponent = (props) => {
    const {userId} = props
    const [socket, setSocket] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        // const newSocket = socketIOClient('ws://go-ws-kafka-service:8090/ws')
        const newSocket = socketIOClient('ws://192.168.49.2:31000/ws')

        newSocket.on('message', (event)=> {
            const receivedMsg = JSON.parse(event.data)
            setMessages((prvMessages) => [...prvMessages, receivedMsg])
        })

        setSocket(newSocket)

        return () => newSocket.disconnect()
    }, [])

    const sendMessage = () => {
        if (socket && message.trim() !== ''){
            const newMsg = {
                id: userId,
                data: message,
            }

            socket.send(JSON.stringify(newMsg))

            setMessage('')
        }
    }

    return (
        <div>
            <div>
                <input
                    type='text'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    onClick={sendMessage}>Send</button>
            </div>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.id}>{msg.data}</li>
                ))}
            </ul>
        </div>
    )
}

export default WebSocketComponent