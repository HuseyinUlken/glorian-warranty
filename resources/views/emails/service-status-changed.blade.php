<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Glorian - Hizmet Durumu Güncellendi</title>
    <style>
        body { 
            font-family: 'Inter', Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            background-color: #f3f4f6; 
            line-height: 1.6;
        }
        .container { 
            max-width: 600px; 
            margin: 0 auto; 
            background-color: #ffffff; 
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .header { 
            background: linear-gradient(135deg, #6A96B4 0%, #5A7A8F 100%); 
            padding: 40px 30px; 
            text-align: center; 
        }

        .subtitle { 
            color: rgba(255,255,255,0.9); 
            font-size: 12px; 
            letter-spacing: 3px; 
            margin: 0; 
            font-weight: 300;
        }
        .content { 
            padding: 40px 30px; 
        }
        .title { 
            color: #1f2937; 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 20px; 
            text-align: center;
        }
        .text { 
            color: #374151; 
            line-height: 1.6; 
            margin-bottom: 30px; 
            font-size: 16px;
        }
        .details { 
            background-color: #f9fafb; 
            padding: 25px; 
            border-radius: 12px; 
            margin-bottom: 30px; 
            border: 1px solid #e5e7eb;
        }
        .details-title {
            color: #1f2937;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }
        .detail-item { 
            margin-bottom: 15px; 
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .detail-item:last-child {
            border-bottom: none;
        }
        .detail-label { 
            color: #6b7280; 
            font-size: 14px; 
            font-weight: 500; 
        }
        .detail-value { 
            color: #1f2937; 
            font-weight: bold; 
            text-align: right;
        }
        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .status-pending { background-color: #fef3c7; color: #92400e; }
        .status-active { background-color: #d1fae5; color: #065f46; }
        .status-expired { background-color: #fee2e2; color: #991b1b; }
        .button { 
            display: inline-block; 
            background: linear-gradient(135deg, #6A96B4 0%, #5A7A8F 100%); 
            color: #ffffff; 
            padding: 15px 30px; 
            text-decoration: none; 
            border-radius: 8px; 
            font-weight: bold; 
            text-align: center;
            transition: all 0.3s ease;
        }
        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(106, 150, 180, 0.3);
        }
        .contact-info {
            background-color: #f9fafb;
            padding: 25px;
            border-radius: 12px;
            margin-top: 30px;
        }
        .contact-title {
            color: #1f2937;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 20px;
        }
        .contact-item {
            text-align: center;
            padding: 15px;
            background-color: #ffffff;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
        }
        .contact-icon {
            color: #6A96B4;
            font-size: 20px;
            margin-bottom: 8px;
        }
        .contact-text {
            color: #374151;
            font-size: 14px;
            font-weight: 500;
        }
        .footer { 
            background-color: #f3f4f6; 
            padding: 30px; 
            text-align: center; 
            color: #6b7280; 
            font-size: 14px; 
        }
        .footer-text {
            margin: 0 0 10px 0;
        }
        .footer-copyright {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }
        @media (max-width: 600px) {
            .container { margin: 10px; }
            .contact-grid { grid-template-columns: 1fr; }
            .detail-item { flex-direction: column; align-items: flex-start; }
            .detail-value { text-align: left; margin-top: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div style="text-align: center;">
                <h1 style="color: #ffffff; font-size: 32px; font-weight: bold; margin: 0 0 5px 0; letter-spacing: 2px;">GLORIAN</h1>
                <p class="subtitle">PPF & WINDOW FILM</p>
            </div>
        </div>
        
        <div class="content">
            <h2 class="title">{{ $title }}</h2>
            <p class="text">{{ $mainText }}</p>
            <p class="text">{{ $content }}</p>

            <div class="details">
                <h3 class="details-title">Hizmet Detayları</h3>
                <div class="detail-item">
                    <span class="detail-label">Hizmet Kodu:</span>
                    <span class="detail-value">{{ $service->service_code }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Araç Plakası:</span>
                    <span class="detail-value">{{ $service->vehicle_plate }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Araç:</span>
                    <span class="detail-value">{{ $service->vehicle_full_name }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Durum:</span>
                    <span class="detail-value">
                        <span class="status-badge status-{{ strtolower($service->status->value) }}">
                            {{ $service->status->label() }}
                        </span>
                    </span>
                </div>
                @if($service->application_date)
                <div class="detail-item">
                    <span class="detail-label">Başvuru Tarihi:</span>
                    <span class="detail-value">{{ $service->application_date->format('d.m.Y') }}</span>
                </div>
                @endif
                @if($service->warranty_start_date)
                <div class="detail-item">
                    <span class="detail-label">Garanti Başlangıcı:</span>
                    <span class="detail-value">{{ $service->warranty_start_date->format('d.m.Y') }}</span>
                </div>
                @endif
                @if($service->warranty_end_date)
                <div class="detail-item">
                    <span class="detail-label">Garanti Bitişi:</span>
                    <span class="detail-value">{{ $service->warranty_end_date->format('d.m.Y') }}</span>
                </div>
                @endif
                @if($service->warranty_days_remaining !== null)
                <div class="detail-item">
                    <span class="detail-label">Kalan Garanti:</span>
                    <span class="detail-value">{{ $service->warranty_days_remaining }} gün</span>
                </div>
                @endif
            </div>

            @if($buttonText && $buttonUrl)
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="{{ $buttonUrl }}" class="button">
                    {{ $buttonText }}
                </a>
            </div>
            @endif

            <div class="contact-info">
                <h4 class="contact-title">İletişim Bilgileri</h4>
                <div class="contact-grid">
                    <div class="contact-item">
                        <div class="contact-icon">📞</div>
                        <div class="contact-text">+90 (212) 123 45 67</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">✉️</div>
                        <div class="contact-text">info@glorian.com.tr</div>
                    </div>
                    <div class="contact-item">
                        <div class="contact-icon">📍</div>
                        <div class="contact-text">İstanbul, Türkiye</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer">
            <p class="footer-text">Bu e-posta size Glorian PPF & Window Film servisi tarafından gönderilmiştir.</p>
            <p class="footer-copyright">© 2025 Glorian. Tüm hakları saklıdır.</p>
        </div>
    </div>
</body>
</html> 