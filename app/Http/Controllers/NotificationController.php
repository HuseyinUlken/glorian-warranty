<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Traits\DataTableTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NotificationController extends Controller
{
    use DataTableTrait;

    /**
     * Bildirimleri listele
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // Arama yapılabilecek sütunlar
        $searchableColumns = ['title', 'content', 'module', 'event'];

        // Sıralama yapılabilecek sütunlar
        $sortableColumns = ['id', 'title', 'created_at', 'is_read', 'read_at'];

        // Kullanıcının bildirimlerini getir
        $dataTableMeta = $this->prepareDataTable(
            Notification::where('user_id', Auth::id())
                ->select('id', 'title', 'content', 'module', 'event', 'is_read', 'read_at', 'created_at'),
            $request,
            $searchableColumns,
            $sortableColumns
        );

        // Bildirimleri dönüştür
        $notifications = $dataTableMeta['data']->map(function ($notification) {
            $notification->module_text = $this->getModuleText($notification->module);
            $notification->event_text = $this->getEventText($notification->event);
            $notification->created_at_formatted = $notification->created_at->format('d.m.Y H:i');
            $notification->read_at_formatted = $notification->read_at ? $notification->read_at->format('d.m.Y H:i') : null;
            return $notification;
        });

        // Okunmamış bildirim sayısını getir
        $unreadCount = Notification::where('user_id', Auth::id())->unread()->count();

        return Inertia::render('Notifications/Index', [
            'dataTableMeta' => $dataTableMeta,
            'unreadCount' => $unreadCount,
        ]);
    }

    /**
     * Bildirimi okundu olarak işaretle
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function markAsRead(Request $request, $id)
    {
        $notification = Notification::where('user_id', Auth::id())->findOrFail($id);
        $notification->markAsRead();

        return redirect()->back()->with('success', 'Bildirim okundu olarak işaretlendi.');
    }

    /**
     * Tüm bildirimleri okundu olarak işaretle
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function markAllAsRead(Request $request)
    {
        Notification::where('user_id', Auth::id())->unread()->update([
            'is_read' => true,
            'read_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Tüm bildirimler okundu olarak işaretlendi.');
    }

    /**
     * Bildirimi sil
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, $id)
    {
        $notification = Notification::where('user_id', Auth::id())->findOrFail($id);
        $notification->delete();

        return redirect()->back()->with('success', 'Bildirim silindi.');
    }

    /**
     * Tüm bildirimleri sil
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroyAll(Request $request)
    {
        Notification::where('user_id', Auth::id())->delete();

        return redirect()->back()->with('success', 'Tüm bildirimler silindi.');
    }

    /**
     * Modül adını insan tarafından okunabilir formata dönüştür
     *
     * @param string $module
     * @return string
     */
    private function getModuleText($module)
    {
        $modules = [
            'specialization-fields' => 'İhtisas Alanları',
            'instructors' => 'Öğretim Elemanları',
            'students' => 'Öğrenciler',
            'exam-categories' => 'Sınav Kategorileri',
            'exams' => 'Sınavlar',
            'articles' => 'Makaleler',
            'scientific-meetings' => 'Bilimsel Toplantılar',
            'clinical-presentations' => 'Klinik Sunumlar',
            'theses' => 'Tezler',
            'theses.activities' => 'Tez Aktiviteleri',
            'universities' => 'Üniversiteler',
            'rotations' => 'Rotasyonlar',
            'categories' => 'Kategoriler',
            'competencies' => 'Yetkinlikler',
            'curriculum-evaluations' => 'Müfredat Değerlendirmeleri',
            'student-evaluations' => 'Öğrenci Değerlendirmeleri',
            'user' => 'Hesap'
        ];

        return $modules[$module] ?? $module;
    }

    /**
     * Olay adını insan tarafından okunabilir formata dönüştür
     *
     * @param string $event
     * @return string
     */
    private function getEventText($event)
    {
        $events = [
            'created' => 'Oluşturuldu',
            'updated' => 'Güncellendi',
            'deleted' => 'Silindi',
            'password-changed' => 'Parola Değiştirildi'
        ];

        return $events[$event] ?? $event;
    }

    /**
     * Okunmamış bildirim sayısını döndür
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUnreadCount(Request $request)
    {
        $count = Notification::where('user_id', Auth::id())
            ->where('is_read', false)
            ->count();

        return response()->json([
            'count' => $count
        ]);
    }

    /**
     * Bildirim detayını görüntüle
     *
     * @param Request $request
     * @param int $id
     * @return \Inertia\Response|\Illuminate\Http\RedirectResponse
     */
    public function show(Request $request, $id)
    {
        $notification = Notification::where('user_id', Auth::id())->findOrFail($id);

        // Bildirimi okundu olarak işaretle
        if (!$notification->is_read) {
            $notification->markAsRead();
        }

        // Bildirim detaylarını dönüştür
        $notification->module_text = $this->getModuleText($notification->module);
        $notification->event_text = $this->getEventText($notification->event);
        $notification->created_at_formatted = $notification->created_at->format('d.m.Y H:i');
        $notification->read_at_formatted = $notification->read_at ? $notification->read_at->format('d.m.Y H:i') : null;

        return response()->json([
            'notification' => $notification
        ]);
    }
}
