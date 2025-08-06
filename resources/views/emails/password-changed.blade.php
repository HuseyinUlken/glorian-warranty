<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Şifre Değişikliği Bildirimi</title>
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
        .alert {
            background-color: #fff8f8;
            border-left: 4px solid #f56565;
            padding: 15px;
            margin-bottom: 20px;
        }
        .details {
            background-color: #f7fafc;
            padding: 15px;
            margin-top: 20px;
            border-radius: 5px;
        }
        .details p {
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Şifre Değişikliği Bildirimi</h1>
    </div>
    
    <div class="content">
        <h2>{{ $title }}</h2>
        
        <p>{{ $description }}</p>
        
        <div class="alert">
            <p><strong>Not:</strong> Eğer bu değişikliği siz yapmadıysanız, lütfen hemen sistem yöneticinizle iletişime geçin.</p>
        </div>
        
        <div class="details">
            <h3>Değişiklik Detayları</h3>
            <p><strong>Tarih ve Saat:</strong> {{ $changedAt }}</p>
            @if($ipAddress)
            <p><strong>IP Adresi:</strong> {{ $ipAddress }}</p>
            @endif
        </div>
        
        <p>Güvenliğiniz için düzenli olarak şifrenizi değiştirmenizi ve güçlü şifreler kullanmanızı öneririz.</p>
    </div>
    
    <div class="footer">
        <p>Bu e-posta Glorian sistemi tarafından otomatik olarak gönderilmiştir.</p>
        <p>&copy; {{ date('Y') }} Glorian. Tüm hakları saklıdır.</p>
    </div>
</body>
</html>
