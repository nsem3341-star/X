const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DISCORD_API = 'https://discord.com/api/v10';
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

// تسجيل الدخول عبر Discord
app.get('/api/auth/login', (req, res) => {
  const authURL = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20email`;
  res.redirect(authURL);
});

// استقبال الكود من Discord
app.get('/api/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    return res.status(400).json({ error: 'لم يتم توفير الكود' });
  }

  try {
    // تبديل الكود بـ Token
    const tokenResponse = await axios.post(`${DISCORD_API}/oauth2/token`, null, {
      params: {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI,
        scope: 'identify email'
      }
    });

    const { access_token } = tokenResponse.data;

    // الحصول على بيانات المستخدم
    const userResponse = await axios.get(`${DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const user = userResponse.data;

    // إرسال البيانات للعميل
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      },
      token: access_token
    });
  } catch (error) {
    console.error('خطأ في المصادقة:', error.response?.data || error.message);
    res.status(400).json({ error: 'فشلت المصادقة' });
  }
});

// الحصول على بيانات المستخدم
app.get('/api/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'لا توجد توكن' });
  }

  try {
    const userResponse = await axios.get(`${DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    res.json(userResponse.data);
  } catch (error) {
    res.status(401).json({ error: 'توكن غير صحيح' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 السيرفر يعمل على http://localhost:${PORT}`);
});
