<?php

namespace App\Http\Controllers;

use App\Models\ExportedFile;
use App\Models\Notification;
use App\Models\User;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Kullanıcının rolüne göre uygun dashboard'a yönlendirme yapar.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('dashboard');
    }
}
