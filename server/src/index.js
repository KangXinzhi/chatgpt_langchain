// 引入依赖模块
import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import cors from 'cors';

import { chatLangChain } from './utils/index.js';


// 创建 Express 应用程序
const app = express();
app.use(cors());
app.use(bodyParser.json()); // 解析JSON格式的请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析urlencoded格式的请求体

// 配置 Multer 中间件，用于处理文件上传
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/files');
  },
  filename: (req, file, cb) => {
    const filename = `${uuidv4()  }.${  file.originalname.split('.').pop()}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// 定义文件相关接口
// 获取文件列表
app.get('/files', (req, res) => {
  fs.readdir('./src/files', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(files);
    }
  });
});

// 上传文件
app.post('/files', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

// 删除文件
app.delete('/files/:filename', (req, res) => {
  const {filename} = req.params;
  fs.unlink(`./src/files/${filename}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(`File ${filename} deleted successfully`);
    }
  });
});

// 定义聊天相关接口
// 请求数据
app.post('/chat', async (req, res) => {
  const { prompt } = req.body; // 获取请求体中的data字段
  if (!prompt) return;
  const response = await chatLangChain(prompt); // 处理数据
  console.log(response);
  res.send(response); // 返回新数据
});

// 启动应用程序
const port = 8000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
