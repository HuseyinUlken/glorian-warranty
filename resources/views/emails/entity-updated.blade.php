@extends('emails.layouts.main')

@section('content')
    <h2>{{ $title }}</h2>
    
    <p>{{ $description }}</p>
    
    @if(isset($changes) && count($changes) > 0)
        <div class="alert alert-info">
            <p><strong>Yapılan değişiklikler:</strong></p>
            <ul>
                @foreach($changes as $field => $values)
                    <li>
                        <strong>{{ $field }}:</strong> 
                        @if(is_array($values))
                            {{ $values['old'] }} → {{ $values['new'] }}
                        @else
                            {{ $values }}
                        @endif
                    </li>
                @endforeach
            </ul>
        </div>
    @endif
    
    @if(isset($url))
        <p>Aşağıdaki bağlantıyı kullanarak güncellenmiş içeriği görüntüleyebilirsiniz:</p>
        <a href="{{ $url }}" class="btn">Görüntüle</a>
    @endif
@endsection
