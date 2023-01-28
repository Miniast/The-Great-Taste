# 服务器端sever.py

import socket
import threading
from flask import Flask, jsonify, request
from flask_cors import CORS
import time
from random import randint
import sqlite3
import database

app = Flask(__name__)
CORS(app)

server_ip = "127.0.0.1"
server_port = "5000"

user = {
    "username": '',
    "password": '',
    "name": '',
    "mobile": '',
    "province": '',
    "city": ''
}

myrequests = []
myreplies = []

conn = sqlite3.connect('data.db')
cur = conn.cursor()


def get_rand_id(idtype=''):
    return idtype + str(randint(20000, 99999))


def exec_sql(sql):
    with conn:
        cur.execute(sql)


def result_process(data):
    return jsonify({'code': 200, 'result': data, 'message': 'ok', 'type': 'success'})


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def connect():
    # 建立和数据库sample.db的连接
    conn = sqlite3.connect('data.db')
    # 使得查询结果以字典形式返回
    conn.row_factory = dict_factory
    # 创建游标以用于执行sql
    cursor = conn.cursor()
    return conn, cursor


#
# @app.route("/")
# def run():
#     return "Hello World!"


@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    conn, cur = connect()
    with conn:
        cur.execute(f'''select *
    from user where username = "{data["username"]}"''')
    res = cur.fetchone()
    if res is not None:
        res = {'code': 1}
    else:
        with conn:
            cur.execute(f'''insert into user (userid, username, password, user_role, province, city)
        values ("10005", "{data["username"]}", "{data["password"]}", "user", "{data["province"]}","{data["city"]}")''')
        res = {'code': 0}
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


@app.route("/login", methods=['POST'])
def login():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''select *
from user where username = "{data["username"]}"''')
    res = cur.fetchone()
    if res is not None and res['password'] == data['password']:
        res['code'] = 0
    else:
        res = {'code': 1}
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


@app.route("/modifyUserInfo", methods=['POST'])
def modify_user_info():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''select *
        from user where username = "{data["username"]}"''')
    res = cur.fetchone()
    if res is not None:
        with conn:
            cur.execute(f'''update user
set password    = "{data['newpassword']}",
    mobile      = "{data['mobile']}",
    description = "{data['description']}"
where username = "{data['username']}"''')
        res = {'code': 0}
    else:
        res = {'code': 1}
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


@app.route("/getRequestsInfo", methods=['POST'])
def get_requests_info():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''select *
            from user where username = "{data["username"]}"''')
    userdata = cur.fetchone()
    with conn:
        cur.execute(f'''select *
from requests
         join user u on requests.userid = u.userid
where province = "{userdata['province']}" and city = "{userdata['city']}"''')
    res = cur.fetchall()
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


@app.route("/getMyReqInfo", methods=['POST'])
def get_my_req_info():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''select *
            from user where username = "{data["username"]}"''')
    userdata = cur.fetchone()
    with conn:
        cur.execute(f'''select *
from requests where requests.userid = "{userdata['userid']}"''')
    res = cur.fetchall()
    for item in res:
        item['province'] = userdata['province']
        item['city'] = userdata['city']
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


@app.route("/addRequest", methods=['POST'])
def add_request():
    data = request.get_json()
    conn, cur = connect()
    while True:
        newId = get_rand_id('A')
        with conn:
            cur.execute(f'''select *
            from requests
            where req_id = "{newId}"''')
        res = cur.fetchall()
        if not res:
            break
    with conn:
        cur.execute(f'''select * from user where username = "{data['username']}"''')
    persondata = cur.fetchone()
    with conn:
        cur.execute(f'''insert into requests (req_id, userid, state, description, price)
    values ("{newId}", "{persondata['userid']}", "0", "{data['description']}", {data['price']})
    ''')
    conn.close()
    return jsonify({'code': 200, 'result': "Yes", 'message': 'ok', 'type': 'success'})


@app.route("/deleteRequest", methods=['POST'])
def delete_request():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''delete from requests where req_id = "{data['req_id']}"
    ''')
    conn.close()
    return jsonify({'code': 200, 'result': "Yes", 'message': 'ok', 'type': 'success'})


@app.route("/modifyRequest", methods=['POST'])
def modify_Reply():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''update requests
set description = "{data['description']}",
    price = "{data['price']}"
        where req_id = "{data['req_id']}"
    ''')
    conn.close()
    return jsonify({'code': 200, 'result': "Yes", 'message': 'ok', 'type': 'success'})


@app.route("/checkReply", methods=['POST'])
def check_reply():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''select *
            from requests where req_id = "{data["req_id"]}"''')
    userdata = cur.fetchone()
    if userdata['state'] == 0:
        res = {"code": 0}
    else:
        with conn:
            cur.execute(f'''select *
        from reply where req_id = "{data['req_id']}"''')
        res = cur.fetchone()
        res['code'] = 1
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


@app.route("/acceptReply", methods=['POST'])
def accept_reply():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''update requests set state = "2" where req_id = "{data["req_id"]}"''')
    conn.close()
    return jsonify({'code': 200, 'result': "yes", 'message': 'ok', 'type': 'success'})


@app.route("/getReplyInfo", methods=['POST'])
def get_reply_info():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''select *
            from user where username = "{data["username"]}"''')
    userdata = cur.fetchone()
    with conn:
        cur.execute(f'''select *
    from reply where userid = "{userdata['userid']}"''')
    res = cur.fetchall()
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


@app.route("/addReply", methods=['POST'])
def add_reply():
    data = request.get_json()
    conn, cur = connect()
    while True:
        newId = get_rand_id('B')
        with conn:
            cur.execute(f'''select *
            from reply
            where rep_id = "{newId}"''')
        res = cur.fetchall()
        if not res:
            break
    with conn:
        cur.execute(f'''select * from user where username = "{data['username']}"''')
    persondata = cur.fetchone()
    with conn:
        cur.execute(f'''select * from reply where req_id = "{data['req_id']}"''')
    res = cur.fetchall()
    if not res:
        with conn:
            cur.execute(f'''insert into reply (rep_id, req_id, userid, description, state)
        values ("{newId}", "{data['req_id']}", "{persondata['userid']}", "{data['description']}","0")
        ''')
    conn.close()
    return jsonify({'code': 200, 'result': "Yes", 'message': 'ok', 'type': 'success'})


@app.route("/deleteReply", methods=['POST'])
def delete_reply():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''delete from reply where rep_id = "{data['rep_id']}"
    ''')
    conn.close()
    return jsonify({'code': 200, 'result': "Yes", 'message': 'ok', 'type': 'success'})


@app.route("/modifyReply", methods=['POST'])
def modify_reply():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''update reply
set description = "{data['description']}"
        where rep_id = "{data['rep_id']}"
    ''')
    conn.close()
    return jsonify({'code': 200, 'result': "Yes", 'message': 'ok', 'type': 'success'})


@app.route("/getAllUserInfo", methods=['POST'])
def get_all_user_info():
    data = request.get_json()
    conn, cur = connect()
    with conn:
        cur.execute(f'''select * from user''')
    res = cur.fetchall()
    conn.close()
    return jsonify({'code': 200, 'result': res, 'message': 'ok', 'type': 'success'})


if __name__ == '__main__':
    app.run()
