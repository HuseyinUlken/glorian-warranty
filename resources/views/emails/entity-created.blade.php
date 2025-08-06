@extends('emails.layouts.main')

@section('content')
    <h2>{{ $title }}</h2>
    
    <p>{{ $description }}</p>
    
    @if(isset($details) && count($details) > 0)
        <div class="alert alert-info">
            <ul>
                @foreach($details as $key => $value)
                    <li><strong>{{ $key }}:</strong> {{ $value }}</li>
                @endforeach
            </ul>
        </div>
    @endif
    
    @if(isset($url))
        <p>Aşağıdaki bağlantıyı kullanarak ilgili içeriği görüntüleyebilirsiniz:</p>
        <a href="{{ $url }}" class="btn">Görüntüle</a>
    @endif
@endsection
