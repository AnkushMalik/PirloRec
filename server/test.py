from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from time import sleep
import os

chromedriver = "./chromedriver"
os.environ["webdriver.chrome.driver"] = chromedriver
browser = webdriver.Chrome(chromedriver)
browser.set_window_size(900,900)