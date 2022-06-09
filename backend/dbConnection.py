import MySQLdb

host = "localhost"
user = "root"
pwd = ""
db = "sl_customs"
port = 3306

def connection(): 
    try: 
        conn = MySQLdb.connect(host=host, user=user, password=pwd, db=db)
        return conn
    except Exception as error:
        print('MYSQL DB connection failed '+str(error))