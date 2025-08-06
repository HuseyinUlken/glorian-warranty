<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yeni Başarı Kazandınız!</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8f9fa;
        }
        .container {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .achievement-card {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            margin: 20px 0;
        }
        .achievement-icon {
            font-size: 48px;
            margin-bottom: 15px;
        }
        .achievement-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .achievement-description {
            font-size: 16px;
            opacity: 0.9;
        }
        .rarity-badge {
            display: inline-block;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            margin-top: 10px;
        }
        .rarity-common { background-color: #6c757d; }
        .rarity-uncommon { background-color: #28a745; }
        .rarity-rare { background-color: #007bff; }
        .rarity-epic { background-color: #6f42c1; }
        .rarity-legendary { background-color: #fd7e14; }
        .rarity-mythic { background-color: #e83e8c; }
        .stats {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .stat-item {
            text-align: center;
        }
        .stat-value {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
        }
        .stat-label {
            font-size: 12px;
            color: #6c757d;
            text-transform: uppercase;
        }
        .cta-button {
            display: inline-block;
            background-color: #007bff;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
            font-size: 14px;
        }
        .social-links {
            margin-top: 15px;
        }
        .social-links a {
            color: #007bff;
            text-decoration: none;
            margin: 0 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="color: #007bff; margin-bottom: 10px;">🎉 Tebrikler!</h1>
            <p style="font-size: 18px; color: #6c757d;">Yeni bir başarı kazandınız!</p>
        </div>

        <div class="achievement-card">
            <div class="achievement-icon">
                @switch($achievement->icon)
                    @case('Film') 🎬 @break
                    @case('Play') ▶️ @break
                    @case('Video') 📹 @break
                    @case('FileText') 📄 @break
                    @case('Star') ⭐ @break
                    @case('CheckSquare') ✅ @break
                    @case('Flame') 🔥 @break
                    @case('Zap') ⚡ @break
                    @case('Trophy') 🏆 @break
                    @case('Target') 🎯 @break
                    @case('Brain') 🧠 @break
                    @case('Clock') ⏰ @break
                    @default 🏅
                @endswitch
            </div>
            <div class="achievement-name">{{ $achievement->name }}</div>
            <div class="achievement-description">{{ $achievement->description }}</div>
            <div class="rarity-badge rarity-{{ $achievement->rarity->value }}">
                {{ $achievement->rarity_label }}
            </div>
        </div>

        <div class="stats">
            <h3 style="margin-top: 0; color: #495057;">Başarı İstatistikleriniz</h3>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-value">{{ $user->completedAchievements()->count() }}</div>
                    <div class="stat-label">Kazanılan Başarı</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{{ $user->completedVideos()->count() }}</div>
                    <div class="stat-label">Tamamlanan Video</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{{ $user->testAttempts()->completed()->count() }}</div>
                    <div class="stat-label">Tamamlanan Test</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">{{ round($user->total_watched_time / 3600, 1) }}</div>
                    <div class="stat-label">İzleme Saati</div>
                </div>
            </div>
        </div>

        <div style="text-align: center;">
            <a href="{{ route('achievements.index') }}" class="cta-button">
                Tüm Başarılarımı Görüntüle
            </a>
        </div>

        <div class="footer">
            <p>Bu e-posta {{ config('app.name') }} tarafından gönderilmiştir.</p>
            <p>Başarılarınızı takip etmeye devam edin ve yeni hedefler belirleyin!</p>
            
            <div class="social-links">
                <a href="{{ route('achievements.statistics') }}">📊 İstatistikler</a>
                <a href="{{ route('dashboard') }}">🏠 Ana Sayfa</a>
            </div>
        </div>
    </div>
</body>
</html> 