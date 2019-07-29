#Pirlo.io Behaviour tracking Chrome Extention:

DIR Structure
```
|
\_extension
|          \_third_party    :third party libs
|          \_background.js  :background script for chrome
|          \_content.js     :content(dom) script for chrome
|
\_server
        \_recordings
        |            \_various.txt : recordings txt files
        \_ views                   : front end
        |
        \_app.py                   : runs flask server
        |
        \_chromedrive              : selenium chrome driver
```

## Setup
- Open Google chrome and goto ``` chrome://extensions ```
- Enable Developer mode > Load unpacked packages
- give path of ./extension

### run flask

> cd server

- download selenium chrome webdriver

> wget https://chromedriver.storage.googleapis.com/75.0.3770.140/chromedriver_mac64.zip 
>
> unzip chromedriver_mac64.zip 
>
> python app.py
