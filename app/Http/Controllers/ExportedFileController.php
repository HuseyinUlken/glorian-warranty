<?php

namespace App\Http\Controllers;

use App\Models\ExportedFile;
use App\Models\Rotation;
use App\Traits\DataTableTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ExportedFileController extends Controller
{
    use DataTableTrait;

    /**
     * Sadece giriş yapmış kullanıcılar erişebilir
     */
    public function __construct() {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ExportedFile::with(['user']);

        // Arama yapılabilecek sütunlar
        $searchableColumns = ['filename', 'description', 'type', 'user.name'];

        // Sıralama yapılabilecek sütunlar
        $sortableColumns = ['id', 'filename', 'type', 'download_count', 'created_at'];

        // DataTable verilerini hazırla
        $data = $this->prepareDataTable($query, $request, $searchableColumns, $sortableColumns);

        // Filtreleme için ek veriler
        $types = ExportedFile::select('type')
            ->distinct()
            ->pluck('type');

        $modelTypes = ExportedFile::select('model_type')
            ->whereNotNull('model_type')
            ->distinct()
            ->pluck('model_type');

        return Inertia::render('ExportedFiles/Index', [
            'exportedFiles' => $data['data'],
            'dataTableMeta' => $data['meta'],
            'filters' => $request->only(['type', 'model_type']),
            'types' => $types,
            'modelTypes' => $modelTypes,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ExportedFile $exportedFile)
    {
        $exportedFile->load(['user']);

        return Inertia::render('ExportedFiles/Show', [
            'exportedFile' => $exportedFile,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExportedFile $exportedFile)
    {
        // Dosyayı silme işlemi
        if (Storage::exists($exportedFile->path)) {
            Storage::delete($exportedFile->path);
        }

        $exportedFile->delete();

        return redirect()
            ->route('exported-files.index')
            ->with('success', 'Dosya başarıyla silindi.');
    }

    /**
     * Download the specified file.
     */
    public function download(ExportedFile $exportedFile)
    {
        if (!Storage::disk('public')->exists($exportedFile->path)) {
            return redirect()
                ->route('exported-files.index')
                ->with('error', 'Dosya bulunamadı.');
        }

        $exportedFile->incrementDownloadCount();

        return Storage::disk('public')->download(
            $exportedFile->path,
            $exportedFile->filename
        );
    }

    /**
     * Format file size to human readable format.
     */
    private function formatFileSize($bytes)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];

        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= (1 << (10 * $pow));

        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
