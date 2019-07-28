from flask import Flask, request, abort
import json


app = Flask(__name__)

@app.route('/record_actions',methods=['POST','GET'])
def savetofile():
    if not request.json:
        abort(400)
    return json.dumps(request.json)

    
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3000, debug=True)