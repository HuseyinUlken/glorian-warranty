<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test E-postası</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #4f46e5;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 5px 5px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Glorian</h1>
    </div>
    
    <div class="content">
        <h2>Test E-postası</h2>
        <p>Merhaba,</p>
        <p>Bu bir test e-postasıdır. E-posta ayarlarınız başarıyla yapılandırılmıştır.</p>
        <p>Bu e-postayı aldıysanız, mail sunucu ayarlarınız doğru çalışıyor demektir.</p>
        <p>Saygılarımızla,<br>Glorian Ekibi</p>
    </div>
    
    <div class="footer">
        <p>Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.</p>
        <p>&copy; {{ date('Y') }} Glorian. Tüm hakları saklıdır.</p>
    </div>
</body>
</html>
