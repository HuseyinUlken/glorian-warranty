@extends('emails.layouts.main')

@section('content')
    <h2>Hoş Geldiniz, {{ $user->name }}!</h2>
    
    <p>Glorian sistemine hoş geldiniz. Hesabınız başarıyla oluşturuldu.</p>
    
    <div class="alert alert-info">
        <p>Hesabınız aşağıdaki rollerle oluşturuldu:</p>
        <ul>
            @foreach($user->getRoleNames() as $role)
                <li>{{ $role }}</li>
            @endforeach
        </ul>
    </div>
    
    <p>Sisteme giriş yaparak profilinizi güncelleyebilir ve size atanan görevleri görüntüleyebilirsiniz.</p>
    
    <a href="{{ url('/') }}" class="btn">Sisteme Giriş Yap</a>
@endsection
