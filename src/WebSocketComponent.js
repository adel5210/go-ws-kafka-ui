import React from "react";


const WebSocketComponent = (props) => {
    const {userId} = props
    const [socket, setSocket] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        const newSocket = new WebSocket('ws://go-ws-kafka-service:8090/ws')

        newSocket.addEventListener('open', (event) => {
            console.log('WS connection opened')
        })

        newSocket.addEventListener('message', (event)=> {
            const receivedMsg = JSON.parse(event.data)
            setMessages((prvMessages) => [...prvMessages, receivedMsg])
        })

        newSocket.addEventListener('close', (event) => {
            console.log('WS connection closed')
        })

        setSocket(newSocket)

        return () => newSocket.close()
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