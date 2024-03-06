from flask import Flask,request
import mysql.connector
# from flask_cors import CORS, cross_origin
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="leave_m_s"
)

# mycursor = mydb.cursor()
mycursor = mydb.cursor()


@app.route('/')
def root():
    return "ruuunig python ka server running"

@app.route('/admin/login',methods=["POST"])
# @cross_origin()
def verifyAdminLogin():
     if request.method == 'POST':
        data = request.json
        email = data.get("email")
        password = data.get("password")
        # print(email,password)
        query = f"SELECT * FROM admin WHERE admin_email='{email}' AND admin_password='{password}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
    # print(myresult)
        return myresult

@app.route('/employee/login',methods=["POST"])
def verifyEmployeeLogin():
     if request.method == 'POST':
        data = request.json
        email = data.get("email")
        password = data.get("password")
        # print(email,password)
        query = f"SELECT * FROM employee WHERE emp_email='{email}' AND emp_password='{password}';"
        data = mycursor.execute(query)
        myresult = mycursor.fetchall()
        # listData = [email,password]
        # listData = [myresult,email,password]
        # print(myresult)
        return myresult

@app.route("/department",methods=["GET"])
def getAllDept():
    query = "SELECT * FROM department"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    return data

@app.route("/employees",methods=["GET"])
def getAllEmployee():
    query = "SELECT * FROM employee;"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    return data

@app.route("/employees/<id>",methods=["GET"])
def getEmployeeByID(id):
    query = f"SELECT * FROM employee WHERE emp_id='{id}';"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    return data

@app.route("/employees/leaves/<id>",methods=["GET"])
def getEmployeeLeaves(id):
    query = f"SELECT * FROM employee_request_leave WHERE emp_id='{id}';"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    return data

@app.route("/employees/leaves/request/accept/<id>",methods=["GET"])
def setEmployeeLeavesRequestAccept(id):
    query = f"UPDATE employee_request_leave SET leav_status='accept' WHERE leav_id='{id}';"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    mydb.commit()
    return "ACCEPTED"

@app.route("/employees/leaves/request/reject/<id>",methods=["GET"])
def setEmployeeLeavesRequestReject(id):
    query = f"UPDATE employee_request_leave SET leav_status='reject' WHERE leav_id='{id}';"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    mydb.commit()
    return "REJECTED"

@app.route("/employees/leaves/request",methods=["GET"])
def getEmployeeLeavesRequest():
    query = f"SELECT * FROM employee_request_leave WHERE leav_status='request';"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    return data

@app.route("/role",methods=["GET"])
def getAllRole():
    query = "SELECT * FROM employee_role"
    datax = mycursor.execute(query)
    data = mycursor.fetchall()
    return data

@app.route("/admin/create/amployee",methods=["POST"])
def AdminCreateEmployee():
    if request.method == 'POST':
        data = request.json
        name = data.get("name")
        dept = data.get("dept")
        role = data.get("role")
        email = data.get("email")
        password = data.get("password")
        # print(email,password)
        query = f"INSERT INTO employee(emp_name,emp_email,emp_password,emp_work_dept,emp_work_role) VALUES(%s,%s,%s,%s,%s)"
        val = (name,email,password,dept,role)
        data = mycursor.execute(query,val)
        myresult = mycursor.fetchall()
        eid = mycursor.lastrowid
        mydb.commit()
    # print(myresult)
        finalDtaa = [data,myresult,eid]
        return finalDtaa

@app.route("/employee/make/request/leave",methods=["POST"])
def employeeMakeLeaveRequest():
    if request.method == 'POST':
        data = request.json
        eid = data.get("eid")
        reason = data.get("reason")
        sdate = data.get("sdate")
        edate = data.get("edate")
        status = data.get("status")
        ename = data.get("ename")
        # print(email,password)
        query = f"INSERT INTO employee_request_leave(leav_reason,leav_sdate,leav_edate,emp_id,leav_status,emp_name) VALUES(%s,%s,%s,%s,%s,%s)"
        val = (reason,sdate,edate,eid,status,ename)
        data = mycursor.execute(query,val)
        myresult = mycursor.fetchall()
        lid = mycursor.lastrowid
        mydb.commit()
    # print(myresult)
        finalDtaa = [data,myresult,lid]
        return finalDtaa

if __name__ == '__main__':
   app.run(debug=True)
