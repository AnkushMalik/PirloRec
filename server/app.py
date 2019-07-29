# import the nessecary pieces from Flask
##################################################################################################################
###                                                                                                            ###
###                               import the nessecary libraries                                               ###
##################################################################################################################
from flask import (
    Flask,
    request,
    abort,
    session, 
    render_template
)
import json
import os
from os import listdir
from os.path import isfile, join
import time as t
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
##################################################################################################################
##################################################################################################################


# Create the app object that will route our calls
app = Flask(__name__, template_folder="views")
app.secret_key = 'dljsaklqk24e21cjn!Ew@@dsa5'

# run_recorder : 
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

@app.route('/run_selenium',methods=['POST','GET'])
def run_selenium():
    f_ = request.json['file']
    f = open("./recordings/{f_!s}.txt".format(**locals()),"r")
    actions = f.read().split("\n")
    actions.pop()
    chromedriver = "./chromedriver"
    os.environ["webdriver.chrome.driver"] = chromedriver
    browser = webdriver.Chrome(chromedriver)
    browser.set_window_size(900,900)
    browser.get('http://www.google.com') #given in problem statement
    for i in actions:
        j = json.loads(i)
        if j["type"]=="click":
            elm = browser.find_element_by_css_selector(j["path"])
            elm.click()
        elif j["type"]=="input":
            elm = browser.find_element_by_css_selector(j["path"])
            value = j["value"]
            browser.execute_script("arguments[0].value = arguments[1];", elm, value)
    return 'going well'

##################################################################################################################


# Route the user to the homepage
@app.route('/')
def home():
    mypath = './recordings'
    onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath, f))]
    print(onlyfiles)
    return render_template("index.html", files = onlyfiles)
    
if __name__ == '__main__':
    
    app.run(host="0.0.0.0", port=3000, debug=True)