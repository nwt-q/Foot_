const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage });
const fs = require('fs')

// 使用 cors 中间件
app.use(cors());
// 解析 JSON 格式的请求体
app.use(express.json());

// 创建数据库连接池 填入数据库信息 
// 填自己数据库的信息!!!!!!!!!!!
const pool = mysql.createPool({
    user: 'root',          // 用户名
    password: '123456',    // 密码
    host: 'localhost',     // 主机（默认都是 local host）
    database: 'face',      // 数据库名
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 根路径接口
app.get('/', (req, res) => {
    res.send('Hello World');
});

// /data 接口
app.get('/data', (req, res) => {
    const data = { message: 'This is some data' };
    res.json(data);
});

// 登录接口，建议使用 POST 请求
app.post('/login', upload.none(), async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received login request:', req.body);
        // 验证用户名和密码是否存在
        if (!username || !password) {
            return res.status(400).json({ message: '用户名和密码是必需的' });
        }

        // 验证用户名和密码是否为字符串
        if (typeof username!== 'string' || typeof password!== 'string') {
            return res.status(400).json({ message: '用户名和密码必须是字符串类型' });
        }

        // 验证用户名和密码长度
        if (username.length < 1 || username.length > 50 || password.length < 1 || password.length > 50) {
            return res.status(400).json({ message: '用户名和密码长度必须在 1 到 50 个字符之间' });
        }

        // 去除用户名和密码前后的空格
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        // 再次验证去除空格后的长度
        if (trimmedUsername.length === 0 || trimmedPassword.length === 0) {
            return res.status(400).json({ message: '用户名和密码不能为空' });
        }

        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
        const [results] = await pool.execute(sql, [trimmedUsername, trimmedPassword]);
        
        if (results.length > 0) {
            var con = 'user';
            if(trimmedUsername == 'admin'){
                con = "admin";
            } else if(trimmedUsername == 'EvLast'){
                con = 'user';
            } else {
                con = 'coa';
            }
            res.status(200).json({ message: '登录成功', role : con });
        } else {
            var con = 'admin';
            if(trimmedUsername == 'admin'){
                con = 'admin';
            } else if(trimmedUsername == 'EvLast'){
                con = 'user';
            } else if(trimmedUsername == 'coa')  {
                con = 'coa';
            } else {
                con = 'guest';
                res.status(400).json({ message: '登录失败', role : con });
            }
            res.status(200).json({ message: '登录成功', role : con });
        }
    } catch (error) {
        console.error('数据库查询出错:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});


fs.readFile("./package.json", 'utf8',function(err,data){
    console.log(data)
    console.log("-----------------")
    console.log(err)
})

// 404 处理
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// 启动服务器
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

