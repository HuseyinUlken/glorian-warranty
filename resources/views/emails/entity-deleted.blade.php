@extends('emails.layouts.main')

@section('content')
    <h2>{{ $title }}</h2>
    
    <p>{{ $description }}</p>
    
    @if(isset($details) && count($details) > 0)
        <div class="alert alert-warning">
            <p><strong>Silinen içerik bilgileri:</strong></p>
            <ul>
                @foreach($details as $key => $value)
                    <li><strong>{{ $key }}:</strong> {{ $value }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    
    <div class="alert alert-info">
        <p>Bu işlem geri alınamaz. Eğer bu işlemin hatalı olduğunu düşünüyorsanız, lütfen sistem yöneticisi ile iletişime geçiniz.</p>
    </div>
@endsection
