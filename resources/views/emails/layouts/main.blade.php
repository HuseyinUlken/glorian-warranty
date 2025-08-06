<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Glorian' }}</title>
    <style>
        :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --popover: 0 0% 100%;
            --popover-foreground: 222.2 84% 4.9%;
            --primary: 221.2 83.2% 53.3%;
            --primary-foreground: 210 40% 98%;
            --secondary: 210 40% 96.1%;
            --secondary-foreground: 222.2 47.4% 11.2%;
            --muted: 210 40% 96.1%;
            --muted-foreground: 215.4 16.3% 46.9%;
            --accent: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
            --destructive: 0 84.2% 60.2%;
            --destructive-foreground: 210 40% 98%;
            --border: 214.3 31.8% 91.4%;
            --input: 214.3 31.8% 91.4%;
            --ring: 221.2 83.2% 53.3%;
            --radius: 0.5rem;
        }
        
        .dark {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --popover: 222.2 84% 4.9%;
            --popover-foreground: 210 40% 98%;
            --primary: 217.2 91.2% 59.8%;
            --primary-foreground: 222.2 47.4% 11.2%;
            --secondary: 217.2 32.6% 17.5%;
            --secondary-foreground: 210 40% 98%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
            --input: 217.2 32.6% 17.5%;
            --ring: 224.3 76.3% 48%;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            background-color: hsl(var(--background));
            color: hsl(var(--foreground));
            line-height: 1.5;
            padding: 1rem;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: hsl(var(--card));
            border-radius: var(--radius);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            overflow: hidden;
        }
        
        .header {
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 1.5rem;
            text-align: center;
        }
        
        .content {
            padding: 1.5rem;
        }
        
        .footer {
            background-color: hsl(var(--muted));
            color: hsl(var(--muted-foreground));
            padding: 1rem;
            text-align: center;
            font-size: 0.875rem;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: hsl(var(--foreground));
            margin-bottom: 0.5rem;
        }
        
        p {
            margin-bottom: 1rem;
        }
        
        .btn {
            display: inline-block;
            background-color: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
            text-decoration: none;
            font-weight: 500;
            margin-top: 1rem;
        }
        
        .btn:hover {
            opacity: 0.9;
        }
        
        .alert {
            padding: 1rem;
            border-radius: var(--radius);
            margin-bottom: 1rem;
        }
        
        .alert-info {
            background-color: hsl(var(--secondary));
            color: hsl(var(--secondary-foreground));
        }
        
        .alert-success {
            background-color: hsl(142.1, 76.2%, 36.3%);
            color: hsl(var(--primary-foreground));
        }
        
        .alert-warning {
            background-color: hsl(47.9, 95.8%, 53.1%);
            color: hsl(var(--foreground));
        }
        
        .alert-error {
            background-color: hsl(var(--destructive));
            color: hsl(var(--destructive-foreground));
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ $title ?? 'Glorian' }}</h1>
        </div>
        
        <div class="content">
            @yield('content')
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} Glorian. Tüm hakları saklıdır.</p>
        </div>
    </div>
</body>
</html>
