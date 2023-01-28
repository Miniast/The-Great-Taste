import sqlite3

conn = sqlite3.connect('data.db')
cur = conn.cursor()

if __name__ == '__main__':
    with conn:
        cur.execute('''drop table user''')
        cur.execute('''drop table requests''')
        cur.execute('''drop table reply''')

    with conn:
        cur.execute('''create table if not exists requests
    (
        req_id      text,
        userid      text,
        state       text,
        type        text,
        topic       text,
        description text,
        price       integer,
        start_date  text,
        end_date    text,
        photo       text,
        modify_date text
    )''')

    with conn:
        cur.execute('''create table if not exists user
    (
        userid       text,
        username     text,
        password     text,
        user_role    text,
        name         text,
        license_type text,
        license_code text,
        mobile       integer,
        user_level   text,
        user_info    text,
        province     text,
        city         text,
        reg_date     text,
        modify_date  text,
        description  text
    )''')

    with conn:
        cur.execute('''create table if not exists reply
    (
        rep_id      text,
        req_id      text,
        userid      text,
        description text,
        start_date  text,
        modify_date text,
        state       integer
    )''')
    # users
    with conn:
        cur.execute('''insert into user (userid, username, password, user_role, province, city, mobile)
values ("10001", "admin", "administrator", "admin", "Beijing",
        "Beijing", 12345678910)''')

    with conn:
        cur.execute('''insert into user (userid, username, password, user_role, province, city, mobile)
values ("10002", "user1", "123456789", "user", "Beijing",
        "Beijing", 18801056201)''')
    with conn:
        cur.execute('''insert into user (userid, username, password, user_role, province, city, mobile)
values ("10003", "user2", "123456789", "user", "Beijing",
        "Beijing", 18801056202)''')
    with conn:
        cur.execute('''insert into user (userid, username, password, user_role, province, city, mobile)
values ("10004", "user3", "111111111", "user", "Shanxi",
        "HeJin", 18801056203)''')

    # requests
    with conn:
        cur.execute('''insert into requests (req_id, userid, state, description, price)
values ("A10001", "10001", "1", "寻味道请求1号", 100)
''')
    with conn:
        cur.execute('''insert into requests (req_id, userid, state, description, price)
    values ("A10002", "10002", "1", "寻味道请求2号", 80)
    ''')

    with conn:
        cur.execute('''insert into requests (req_id, userid, state, description, price)
    values ("A10003", "10002", "0", "寻味道请求3号", 50)
    ''')
    with conn:
        cur.execute('''insert into requests (req_id, userid, state, description, price)
    values ("A10004", "10004", "0", "寻味道请求4号", 30)
    ''')

    # replies

    with conn:
        cur.execute('''insert into reply(rep_id, req_id, userid, description, state)
values ("B10001", "A10001", "10001", "请品鉴响应1号", 0)
    ''')

    with conn:
        cur.execute('''insert into reply(rep_id, req_id, userid, description, state)
    values ("B10002", "A10002", "10001", "请品鉴响应2号", 0)
    ''')

# print(cur.fetchall())
