# تطبيق ويب متصل بـ Discord 🎮

تطبيق ويب يتيح تسجيل الدخول عبر Discord والوصول إلى بيانات المستخدم.

## المتطلبات

- Node.js (الإصدار 14 أو أعلى)
- npm أو yarn
- حساب Discord Developer

## التثبيت

### 1. استنساخ المستودع
\`\`\`bash
git clone https://github.com/nsem3341-star/X.git
cd X
\`\`\`

### 2. تثبيت المكتبات
\`\`\`bash
npm install
\`\`\`

### 3. إعداد متغيرات البيئة

انسخ ملف \`.env.example\` إلى \`.env\`:
\`\`\`bash
cp .env.example .env
\`\`\`

ثم أضف بيانات Discord الخاصة بك:
- \`DISCORD_CLIENT_ID\`: من Discord Developer Portal
- \`DISCORD_CLIENT_SECRET\`: من Discord Developer Portal
- \`DISCORD_REDIRECT_URI\`: عادة \`http://localhost:5000/api/auth/callback\`

### 4. تشغيل السيرفر
\`\`\`bash
npm start
\`\`\`

السيرفر سيعمل على \`http://localhost:5000\`

## كيفية الاستخدام

### تسجيل الدخول

زيارة:
\`\`\`
http://localhost:5000/api/auth/login
\`\`\`

### الحصول على بيانات المستخدم

\`\`\`bash
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/user
\`\`\`

## الميزات

✅ تسجيل دخول آمن عبر Discord OAuth2
✅ الحصول على بيانات المستخدم من Discord
✅ دعم اللغة العربية
✅ سهل التوسع

## الخطوات القادمة

- [ ] إضافة واجهة مستخدم (React)
- [ ] حفظ البيانات في قاعدة بيانات
- [ ] إضافة ميزات إضافية

## الترخيص

MIT
