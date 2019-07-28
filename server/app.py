from flask import (
    Flask,
    request,
    abort,
    session, 
    render_template
)
import json
from os import listdir
from os.path import isfile, join
import time as t

app = Flask(__name__, template_folder="views")
app.secret_key = 'dljsaklqk24e21cjn!Ew@@dsa5'

@app.route('/run_recorder', methods=['POST','GET'])
def create_recordingtxt():
    f_name = str(t.time()).split('.')[0]
    f = open("./recordings/{f_name!s}.txt".format(**locals()),"w+")
    session["current_recording"] = str(f_name)
    f.close
    print('file created:',f_name)
    return f_name

@app.route('/record_actions',methods=['POST','GET'])
def savetofile():
    current_recording = session.get("current_recording",None)
    file = open("./recordings/{current_recording!s}.txt".format(**locals()),"a+")
    file.write(str(request.json))
    file.write("\n")
    file.close
    return json.dumps(request.json)

@app.route('/')
def home():
    mypath = './recordings'
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    print(onlyfiles)
    return render_template("index.html", files = onlyfiles)
    
if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port=3000, debug=True)