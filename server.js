const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const PORT = 5000;

const lessonRoutes = require('./routes/lessonRoutes');

const userRoutes = require('./routes/userRoutes');

// 미들웨어 설정
app.use(cors()); // 모든 요청 허용
app.use(express.json()); // JSON 파싱

// 정적 이미지 파일 경로 설정
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));


// api로 시작하는 요청을 authRoutes 파일의 라우팅으로 전달
app.use('/api', authRoutes);

// 기본 라우트
app.get('/', (req, res) => {
    res.send('파크골프 레슨 예약 앱 서버 실행 중');
});


// 서버 실행
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});


app.use('/api/lessons', lessonRoutes);

app.use('/api/cart', cartRoutes);


app.use('/api/user', userRoutes);
