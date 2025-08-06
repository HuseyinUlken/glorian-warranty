<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>E-posta Adresinizi Doğrulayın</title>
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
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-bottom: 3px solid #4a5568;
        }
        .content {
            padding: 20px;
            background-color: #fff;
            border: 1px solid #e2e8f0;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #718096;
        }
        .button {
            display: inline-block;
            background-color: #4a5568;
            color: #ffffff !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
        }
        .details {
            background-color: #f7fafc;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>E-posta Adresinizi Doğrulayın</h1>
    </div>
    
    <div class="content">
        <h2>Merhaba!</h2>
        
        <p>Glorian sistemine kaydolduğunuz için teşekkür ederiz. E-posta adresinizi doğrulamak için aşağıdaki butona tıklayın:</p>
        
        <div style="text-align: center;">
            <a href="{{ $url }}" class="button">E-posta Adresimi Doğrula</a>
        </div>
        
        <p>Bu e-posta doğrulama bağlantısı {{ config('auth.passwords.users.expire', 60) }} dakika içinde geçerliliğini yitirecektir.</p>
        
        <p>Eğer hesap oluşturma talebinde bulunmadıysanız, başka bir işlem yapmanıza gerek yoktur.</p>
        
        <div class="details">
            <p>Eğer butona tıklamakta sorun yaşıyorsanız, aşağıdaki URL'yi tarayıcınızın adres çubuğuna kopyalayıp yapıştırabilirsiniz:</p>
            <p style="word-break: break-all;">{{ $url }}</p>
        </div>
    </div>
    
    <div class="footer">
        <p>Bu e-posta Glorian sistemi tarafından otomatik olarak gönderilmiştir.</p>
        <p>&copy; {{ date('Y') }} Glorian. Tüm hakları saklıdır.</p>
    </div>
</body>
</html>
