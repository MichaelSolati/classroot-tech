from flask import Flask, request, redirect
from twilio.twiml.messaging_response import MessagingResponse, Message

app = Flask(__name__)

@app.route("/sms", methods=['get', 'POST'])
def sms_reply():
    resp = MessagingResponse()
    message = Message()
    message.body('Classroot: Sister Mary Kenneth Keller, along with Irving Tang, was one of the first to earn a doctorate in computer science. Thank you for trying our demo again! Hope you have a wonderful day :)')
    message.media('https://i.redd.it/nxbi642zmqlx.jpg')
    resp.append(message)
    print("bye")
    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)
