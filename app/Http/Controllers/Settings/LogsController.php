<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Traits\PermissionTrait;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class LogsController extends Controller
{
    use PermissionTrait;

    public function __construct()
    {
        $this->initModule('settings.logs');
    }

    /**
     * Sistem loglarını görüntüle
     */
    public function index()
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        return Inertia::render('settings/logs-view');
    }

    /**
     * Sistem loglarını JSON formatında getir
     */
    public function getLogs()
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return response()->json(['error' => 'Yetkisiz erişim'], 403);
        }

        $logFiles = File::files(storage_path('logs'));
        $logs = [];

        foreach ($logFiles as $file) {
            $filename = pathinfo($file, PATHINFO_BASENAME);
            $logs[$filename] = [];

            // Dosya boyutu kontrolü (çok büyük dosyaları işlememek için)
            if (filesize($file) < 5 * 1024 * 1024) {  // 5MB'dan küçük dosyalar
                $content = File::get($file);
                $pattern = '/\[(?<date>.*?)\]\s(?<env>\w+)\.(?<type>\w+):(?<message>.*?)(?:\{(?<context>[^}]*)})?\s(?:in|\[)(?<extra>.*)/m';

                preg_match_all($pattern, $content, $matches, PREG_SET_ORDER);

                foreach ($matches as $match) {
                    $logs[$filename][] = [
                        'date' => $match['date'] ?? '',
                        'env' => $match['env'] ?? '',
                        'type' => $match['type'] ?? '',
                        'message' => trim($match['message'] ?? ''),
                        'context' => $match['context'] ?? '',
                        'extra' => $match['extra'] ?? ''
                    ];
                }

                // Son 100 log kaydını al
                $logs[$filename] = array_slice($logs[$filename], -100);
            } else {
                $logs[$filename][] = ['message' => 'Dosya çok büyük, işlenemiyor (' . round(filesize($file) / 1024 / 1024, 2) . ' MB)'];
            }
        }

        return response()->json([
            'logs' => $logs
        ]);
    }
}
