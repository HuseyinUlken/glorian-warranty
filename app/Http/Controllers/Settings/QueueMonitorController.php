<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Traits\DataTableTrait;
use App\Traits\PermissionTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QueueMonitorController extends Controller
{
    use DataTableTrait, PermissionTrait;

    public function __construct()
    {
        $this->initModule('settings.queue-monitor');
    }

    /**
     * Kuyruk yönetim sayfasını göster
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $authResult = $this->authorize('view');
        if ($authResult !== true) {
            return $authResult;
        }

        // Kuyruktaki işler için arama yapılabilecek sütunlar
        $jobsSearchableColumns = ['id', 'queue', 'payload'];

        // Kuyruktaki işler için sıralama yapılabilecek sütunlar
        $jobsSortableColumns = ['id', 'queue', 'attempts', 'created_at'];

        // Kuyruktaki işler için DataTable meta verisi
        $jobsDataTableMeta = $this->prepareDataTable(
            DB::table('jobs')
                ->select('id', 'queue', 'payload', 'attempts', 'reserved_at', 'available_at', 'created_at'),
            $request,
            $jobsSearchableColumns,
            $jobsSortableColumns,
            'jobs_',
            100,
            'created_at'
        );

        // Başarısız işler için arama yapılabilecek sütunlar
        $failedJobsSearchableColumns = ['id', 'uuid', 'connection', 'queue', 'payload', 'exception'];

        // Başarısız işler için sıralama yapılabilecek sütunlar
        $failedJobsSortableColumns = ['id', 'connection', 'queue', 'failed_at'];

        // Başarısız işler için DataTable meta verisi
        $failedJobsDataTableMeta = $this->prepareDataTable(
            DB::table('failed_jobs')
                ->select('id', 'uuid', 'connection', 'queue', 'payload', 'exception', 'failed_at'),
            $request,
            $failedJobsSearchableColumns,
            $failedJobsSortableColumns,
            'failed_jobs_',
            100,
            'failed_at'
        );

        // İşleri daha okunabilir hale getir
        $jobsDataTableMeta['data']->getCollection()->transform(function ($job) {
            $payload = json_decode($job->payload);
            $job->job_name = $payload->displayName ?? $payload->job ?? 'Bilinmeyen İş';
            $job->reserved = $job->reserved_at ? 'Evet' : 'Hayır';
            $job->available_at = $job->available_at ? date('d.m.Y H:i', $job->available_at) : '-';
            $job->created_at = $job->created_at ? date('d.m.Y H:i', $job->created_at) : '-';
            return $job;
        });

        $failedJobsDataTableMeta['data']->getCollection()->transform(function ($job) {
            $payload = json_decode($job->payload);
            $job->job_name = $payload->displayName ?? $payload->job ?? 'Bilinmeyen İş';
            $job->failed_at = $job->failed_at ? date('d.m.Y H:i', strtotime($job->failed_at)) : '-';
            return $job;
        });

        // Mail log gösterimini kaldırdık

        return Inertia::render('settings/queue-monitor', [
            'jobsDataTableMeta' => $jobsDataTableMeta,
            'failedJobsDataTableMeta' => $failedJobsDataTableMeta,
            'queueStats' => [
                'pending' => DB::table('jobs')->count(),
                'failed' => DB::table('failed_jobs')->count(),
            ]
        ]);
    }

    /**
     * Başarısız bir işi yeniden dene
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function retryFailedJob(Request $request)
    {
        $authResult = $this->authorize('run');
        if ($authResult !== true) {
            return $authResult;
        }
        $id = $request->input('id');
        Artisan::call('queue:retry', ['id' => [$id]]);

        return redirect()->route('queue-monitor.index')->with('success', 'Başarısız iş yeniden kuyruğa eklendi.');
    }

    /**
     * Bekleyen bir işi hemen çalıştır
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function runJob(Request $request)
    {
        $authResult = $this->authorize('run');
        if ($authResult !== true) {
            return $authResult;
        }
        $id = $request->input('id');

        // İşi veritabanından al
        $job = DB::table('jobs')->where('id', $id)->first();

        if (!$job) {
            return redirect()->route('queue-monitor.index')->with('error', 'İş bulunamadı.');
        }

        try {
            // İşi hemen çalıştırmak için queue:work komutunu bir kez çalıştır
            Artisan::call('queue:work', [
                '--once' => true,
                '--queue' => $job->queue
            ]);

            return redirect()->route('queue-monitor.index')->with('success', 'İş başarıyla çalıştırıldı.');
        } catch (\Exception $e) {
            return redirect()->route('queue-monitor.index')->with('error', 'İş çalıştırılırken hata oluştu: ' . $e->getMessage());
        }
    }

    /**
     * Tüm başarısız işleri yeniden dene
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function retryAllFailedJobs()
    {
        $authResult = $this->authorize('run');
        if ($authResult !== true) {
            return $authResult;
        }
        Artisan::call('queue:retry', ['id' => ['all']]);

        return redirect()->route('queue-monitor.index')->with('success', 'Tüm başarısız işler yeniden kuyruğa eklendi.');
    }

    /**
     * Başarısız bir işi sil
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function deleteFailedJob(Request $request)
    {
        $authResult = $this->authorize('run');
        if ($authResult !== true) {
            return $authResult;
        }
        $id = $request->input('id');
        Artisan::call('queue:forget', ['id' => $id]);

        return redirect()->route('queue-monitor.index')->with('success', 'Başarısız iş silindi.');
    }

    /**
     * Tüm başarısız işleri temizle
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function clearAllFailedJobs()
    {
        $authResult = $this->authorize('run');
        if ($authResult !== true) {
            return $authResult;
        }
        Artisan::call('queue:flush');

        return redirect()->route('queue-monitor.index')->with('success', 'Tüm başarısız işler temizlendi.');
    }

    // Mail log gösterimini kaldırdık
}
