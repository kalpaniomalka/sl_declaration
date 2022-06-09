from flask import Flask, request
from flask_cors import CORS
import os
import MySQLdb
from tomlkit import datetime
import dbConnection as db
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from cv2 import cv2
import numpy as np
import shutil
from datetime import date
from PIL import Image 
import PIL 
import qrcode
from random import random
from datetime import date

app  = Flask("__main__")
CORS(app)

current_path =  os.path.abspath(os.path.join(os.path.dirname(__file__)))

UPLOAD_FOLDER = 'uploaded_images'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
UPLOAD_FOLDER_PIC = 'pro_pic'

model = current_path+'\\classification\\items-detection.h5'
outputs = "E:\\2022\\airport\project\Frotend\public\\assets\img\outputs"
qr_output = "E:\\2022\\airport\project\Frotend\public\\assets\img\qrcodes"
pro_pic = "E:\\2022\\airport\project\Frotend\public\\assets\img\pro_pic"

imgSize1 = 240
imgSize2 = 240

#function to register users
@app.route('/addUser', methods=['GET']) 
def addUser():
    uname = request.args.get('uname')
    pwd = request.args.get('pwd')
    age = request.args.get('age')
    email = request.args.get('email')
    passport = request.args.get('pasportNo')

    con = db.connection()
    cursor = con.cursor()
    sql = "INSERT INTO users (name, pwd, email, passport_no,pic) VALUES (%s, %s, %s,%s,%s)" 
    val = [uname,pwd,email,passport,"0"]
    cursor.execute(sql,val)
    con.commit()
    return "success"

#function to update user details
@app.route('/updateUserData', methods=['GET']) 
def updateUserData():
    uname = request.args.get('uname')
    name = request.args.get('name')
    email = request.args.get('email')
    passport = request.args.get('passport')
    pic = request.args.get('pic')
    profession = request.args.get('profession')

    con = db.connection()
    cursor = con.cursor()
    sql = "UPDATE users SET name=%s, email=%s, passport_no=%s,profession=%s, pic=%s where name=%s" 
    val = [name,email,passport,profession,pic,uname]
    print(val)
    cursor.execute(sql,val)
    con.commit()
    return "success"

#function to login
@app.route('/getUser', methods=['GET']) 
def getUser():
    uname = request.args.get('uname')
    pwd = request.args.get('pwd')

    con = db.connection()
    cursor = con.cursor()
    selectData = "select pwd from users where name='%s'"%uname #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    print(result)
    if len(result) == 0:
        return "0"
    elif (result[0][0] == pwd):
        return "1"
    else:
        return "0"

#function to get user data
@app.route('/getData', methods=['GET']) 
def getData():
    uname = request.args.get('uname')
    
    con = db.connection()
    cursor = con.cursor()
    selectData = "select * from users where name='%s'"%uname #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    
    if(len(result) == 0):
        return "0"
    else:
        values = {
            "name":result[0][0],
            "email":result[0][1],
            "passport":result[0][2],
            "profession":result[0][3],
            "pic":result[0][5]
        }
        print(values)
        return values
    

#function to get user data based on passport number
@app.route('/getDataPass', methods=['GET']) 
def getDataPass():
    pid = request.args.get('pid')
    
    con = db.connection()
    cursor = con.cursor()
    selectData = "select * from users where passport_no='%s'"%pid #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    
    if(len(result) == 0):
        return "0"
    else:
        values = {
            "name":result[0][0],
            "email":result[0][1],
            "passport":result[0][2],
            "profession":result[0][3],
            "pic":result[0][5]
        }
        print(values)
        return values

#function to upload pro pic
@app.route('/uploadPic', methods=['POST']) 
def uploadPic():
    uname = request.form.get('uname')
    file = request.files['file'] 

    if not os.path.isdir(UPLOAD_FOLDER_PIC):
        os.mkdir(UPLOAD_FOLDER_PIC)

    filename = secure_filename(file.filename)
    destination="/".join([UPLOAD_FOLDER_PIC, filename])
    file.save(destination)

    im1 = Image.open(destination) 
    im1 = im1.save(pro_pic+"\\"+uname+".png")
    shutil.rmtree(UPLOAD_FOLDER_PIC)
    return "0"

#function to label items
@app.route('/checkItem', methods=['POST']) 
def checkItem():
    uname = request.form.get('uname')
    
    if not os.path.isdir(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)

    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([UPLOAD_FOLDER, filename])
    file.save(destination)

    loaded_model = load_model(model)

    img = cv2.imread(destination,cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img,(imgSize1,imgSize2))
    newImg = np.array(img).reshape(-1,imgSize1,imgSize2,1)
    predection = loaded_model.predict(newImg)
    status = '{}'.format(np.argmax(predection))
    
    if status == "0":
        name = uname + "_phone_" + str(date.today()) 
        im1 = Image.open(destination) 
        im1 = im1.save(outputs+"\\"+name+".png")
        shutil.rmtree(UPLOAD_FOLDER)
        print(name)
        return name
    elif status == '1':
        name = uname + "_laptop_" +  str(date.today()) 
        im1 = Image.open(destination) 
        im1 = im1.save(outputs+"\\"+name+".png")
        shutil.rmtree(UPLOAD_FOLDER)
        print(name)
        return name
    else:
        name = uname + "_flask_" + str(date.today()) 
        im1 = Image.open(destination) 
        im1 = im1.save(outputs+"\\"+name+".png")
        shutil.rmtree(UPLOAD_FOLDER)
        print(name)
        return name

#function to insert data
@app.route('/submitData', methods=['GET']) 
def submitData():
    uname = request.args.get('uname')
    airport = request.args.get('airport')
    region = request.args.get('region')
    illegal = request.args.get('illegal')
    firesrms = request.args.get('firesrms')
    commercial = request.args.get('commercial')
    unprocessed = request.args.get('unprocessed')
    purpose = request.args.get('purpose')
    images = request.args.get('images')

    id = str(random())
    id = id.split(".")
    id = id[1][:6]

    con = db.connection()
    cursor = con.cursor()
    sql = "INSERT INTO declaration_details (id,name, airport, region, illegal_items, firesrms, commercial_goods, unprocessed, images, verification,purpose) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s,%s,%s)" 
    val = [id,uname,airport,region,illegal,firesrms,commercial, unprocessed, images, 0,purpose]
    print(val)
    cursor.execute(sql,val)
    con.commit()

    values = {
        'status' : "success",
        'id' : id
    }
    return values

#function to generate QR code
@app.route('/generateQR', methods=['GET']) 
def generateQR():
    qr = qrcode.QRCode(
        version=1,
        box_size=15,
        border=5
    )

    qr.add_data("Declaration ID : ")
    qr.add_data(request.args.get('id'))
    
    qr.add_data("\nName : ")
    qr.add_data(request.args.get('uname'))

    qr.add_data("\nPurpose : ")
    qr.add_data(request.args.get('purpose'))

    qr.add_data("\nAirport : ")
    qr.add_data(request.args.get('airport'))

    qr.add_data("\nRegion : ")
    qr.add_data(request.args.get('region'))

    qr.add_data("\nIllegal Items : ")
    qr.add_data(request.args.get('illegal'))

    qr.add_data("\nFiresarms : ")
    qr.add_data(request.args.get('firesrms'))

    qr.add_data("\nCommercial Product : ")
    qr.add_data(request.args.get('commercial'))

    qr.add_data("\nUnprocessed Items : ")
    qr.add_data(request.args.get('unprocessed'))

    print(request.args.get('images'))
    img = (request.args.get('images')).split("|")
    values = ""
    for val in img:
        if(val != ""):
            v = val.split("_")
            values += v[1] + "\n"

    qr.add_data("\nItems : ")
    qr.add_data(values)

    qr.add_data("\nTotal Amount($)) : ")
    qr.add_data(request.args.get('total'))

    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')
    img.save(qr_output+"\\"+request.args.get('uname')+"_"+str(date.today())+".png")

    today = date.today()

    con = db.connection()
    cursor = con.cursor()
    sql = "INSERT INTO qr_codes (id, name, qrcode, total,approved,paid,uploaded_date) VALUES (%s,%s, %s,%s, %s,%s,%s)" 
    val = [request.args.get('id'),request.args.get('uname'),""+(request.args.get('uname')+"_"+str(date.today())+".png"),request.args.get('total'),0,0,today]
    cursor.execute(sql,val)
    con.commit()

    return "success"

#function to get QR code
@app.route('/getQR', methods=['GET']) 
def getQR():
    con = db.connection()
    cursor = con.cursor()
    selectData = "select id,qrcode from qr_codes where name='%s' ORDER BY uploaded_date DESC"%(request.args.get('uname')) #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    print(result)
 
    data = []
    if(len(result) == 0):
        return "0"
    else:
        for val in result:
            data.append((val))
        values = {
            "arr":data
        }
        return values

#function to get QR code
@app.route('/getApprovedQR', methods=['GET']) 
def getApprovedQR():
    con = db.connection()
    cursor = con.cursor()
    selectData = "select id,qrcode from qr_codes where approved=1 and paid=0 and name='%s'"%(request.args.get('uname')) #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    print(result)
 
    data = []
    if(len(result) == 0):
        return "0"
    else:
        for val in result:
            data.append((val))
        values = {
            "arr":data
        }
        return values

#function to get user data for officer
@app.route('/getDeclarationData', methods=['GET']) 
def getDeclarationData():
   # uname = request.args.get('uname')
    
    con = db.connection()
    cursor = con.cursor()
    selectData = "select id,name from qr_codes where approved=0" #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    
    data = []
    if(len(result) == 0):
        return "0"
    else:
        for val in result:
            data.append((val))
        values = {
            "arr":data
        }
        return values

#function to get search value
@app.route('/getSearchValue', methods=['GET']) 
def getSearchValue():
    con = db.connection()
    cursor = con.cursor()
    selectData = "select * from qr_codes where id='%s'"%(request.args.get('id')) #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    print(result)
 
    data = []
    if(len(result) == 0):
        return "0"
    else:
        for val in result:
            data.append((val))
        values = {
            "arr":data
        }
        return values

#function to approve declaration
@app.route('/approve', methods=['GET']) 
def approve():
    id = request.args.get('id')

    con = db.connection()
    cursor = con.cursor()
    sql = "UPDATE qr_codes SET approved=1 where id=%s" 
    val = [id]
    cursor.execute(sql,val)
    con.commit()
    return "success"

#function to get user data for officer
@app.route('/getApprovedDeclaration', methods=['GET']) 
def getApprovedDeclaration():
   # uname = request.args.get('uname')
    
    con = db.connection()
    cursor = con.cursor()
    selectData = "select id,name,qrcode,total from qr_codes where id='%s'"%(request.args.get('id')) #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    
    items = (result[0][2]).split("|")
    data = []
    if(len(result) == 0):
        return "0"
    else:
        data.append(result[0][0])
        data.append(result[0][1])
        data.append(len(items))
        data.append(result[0][3])
        values = {
            "arr":data
        }
        return values


#function to get Approved Declaration Details
@app.route('/getApprovedDeclarationDetails', methods=['GET']) 
def getApprovedDeclarationDetails():
   # uname = request.args.get('uname')
    
    con = db.connection()
    cursor = con.cursor()
    selectData = "select id,name,qrcode,total from qr_codes where id='%s'"%(request.args.get('id')) #retrieve data from mysql db
    cursor.execute(selectData)   
    result = cursor.fetchall()
    
    items = (result[0][2]).split("|")
    data = []
    if(len(result) == 0):
        return "0"
    else:
        data.append(result[0][0])
        data.append(result[0][1])
        data.append(len(items))
        data.append(result[0][3])
        values = {
            "arr":data
        }
        return values

#function to pay
@app.route('/pay', methods=['GET']) 
def pay():
    id = request.args.get('id')

    con = db.connection()
    cursor = con.cursor()
    sql = "UPDATE qr_codes SET paid=1 where id=%s" 
    val = [id]
    cursor.execute(sql,val)
    con.commit()
    return "success"

#getDeclarationData()